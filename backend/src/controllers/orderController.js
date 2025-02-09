import sequelize from "../models/connect.js";
import { responseSend } from "../config/response.js";
import initModels from "../models/init-models.js";
import order from "../models/order.js";
import { startOfWeek,endOfWeek } from "date-fns";
import { col, fn, literal, Op, Sequelize } from "sequelize";
import { sendMail } from "../config/mail.js";
import { io } from "../socker/socker.js";

let models = initModels(sequelize); 
let orders = models.order; 

const getorder = async (req, res) => {
    try {
        let data = await order.findAll({
            include: [
                {
                    model: models.order_status,
                    as: "order_statuses",
                    where: {
                        order_status_id: sequelize.literal(`(
                          SELECT MAX(order_status_id) FROM order_status os WHERE os.order_id = order.order_id
                        )`),
                      },
                },
                {
                    model: models.discount,
                    as: "discount_discount",
                },
            ],
        });
        responseSend(res, data, "Thành công!", 200);
    } catch (error) {
        responseSend(res, "", "Có lỗi xảy ra!", 500);
    }
};



const getRevenueBetweenDates = async (req, res) => {
  try {
    const { startDate, endDate, period } = req.query;

    if (!startDate || !endDate || !period) {
      return res.status(400).json({
        success: false,
        message: 'Cần truyền đủ ngày bắt đầu, ngày kết thúc và loại thời gian (days, week, month).',
      });
    }

    const start = new Date(startDate);
    const end = new Date(endDate);
    end.setHours(23, 59, 59, 999); // Đảm bảo ngày kết thúc là 23:59:59

    let groupBy = [];
    let dateAlias = "";

    // Xác định nhóm theo `period`
    switch (period) {
      case 'days':
        groupBy = [fn('DATE', col('order_date'))];
        dateAlias = 'date';
        break;
      case 'week':
        groupBy = [fn('YEARWEEK', col('order_date'))];
        dateAlias = 'week';
        break;
      case 'month':
        groupBy = [fn('MONTH', col('order_date'))];
        dateAlias = 'month';
        break;
      default:
        return res.status(400).json({
          success: false,
          message: 'Tham số period không hợp lệ. Hãy chọn "days", "week", hoặc "month".',
        });
    }

    // Query dữ liệu từ database
    const results = await models.order.findAll({
      attributes: [
        [fn('SUM', col('order_total')), 'total_revenue'],
        [fn('DATE', col('order_date')), 'date'],
        [fn('YEARWEEK', col('order_date')), 'week'],
        [fn('MONTH', col('order_date')), 'month'],
      ],
      where: {
        order_date: {
          [Op.between]: [start, end],
        },
        order_status: 6, // Thêm điều kiện order_status == 6
      },
      group: groupBy,
    });

    // Xử lý kết quả dựa trên `period`
    const formattedResults = results.map((result) => {
      const totalRevenue = result.dataValues.total_revenue || 0;
      const dateValue = result.dataValues[dateAlias];

      // Nếu group theo ngày
      if (period === 'days') {
        return {
          date: dateValue || 'Invalid Date',
          totalRevenue,
        };
      }

      // Nếu group theo tuần
      if (period === 'week') {
        const startOfWeek = new Date(startDate);
        const daysInWeek = [];

        // Fetch daily revenue for each day in the week
        for (let i = 0; i < 7; i++) {
          const day = new Date(startOfWeek);
          day.setDate(day.getDate() + i);

          const dayRevenue = results.find((res) => {
            const resultDate = new Date(res.dataValues.date);
            return resultDate.toISOString().split('T')[0] === day.toISOString().split('T')[0];
          })?.dataValues.total_revenue || 0; // Find the corresponding revenue for that day

          daysInWeek.push({
            date: day.toISOString().split('T')[0],
            revenue: dayRevenue,
          });
        }

        return {
          week: dateValue,
          days: daysInWeek,
        };
      }

      // Nếu group theo tháng
      if (period === 'month') {
        const startOfMonth = new Date(startDate);
        startOfMonth.setMonth(dateValue - 1);

        const weeksInMonth = [];
        for (let week = 0; week < 4; week++) {
          const startOfWeek = new Date(startOfMonth);
          startOfWeek.setDate(startOfWeek.getDate() + week * 7);

          const endOfWeek = new Date(startOfWeek);
          endOfWeek.setDate(endOfWeek.getDate() + 6);

          weeksInMonth.push({
            week: `Week ${week + 1}`,
            startDate: startOfWeek.toISOString().split('T')[0],
            endDate: endOfWeek.toISOString().split('T')[0],
            totalRevenue,
          });
        }
        return {
          month: dateValue,
          weeks: weeksInMonth,
        };
      }

      return null; // Trường hợp không hợp lệ
    });

    res.status(200).json({
      success: true,
      data: formattedResults,
    });
  } catch (error) {
    console.error('Error fetching revenue between dates:', error);
    res.status(500).json({
      success: false,
      message: 'Có lỗi xảy ra khi lấy tổng doanh thu trong khoảng thời gian.',
    });
  }
};

const getOrderUserTop = async (req, res) => {
  try {
    // Lấy tham số limit từ query (số lượng người muốn lấy)
    const { limit = 5 } = req.query; // Nếu không có limit trong query thì mặc định là 5

    // Fetch top users với điều kiện order_status = 6 và tính tổng số đơn hàng và tổng tiền
    const data = await order.findAll({
      attributes: [
        'user_id',
        [Sequelize.fn('SUM', Sequelize.col('order_total')), 'totalSpent'], // Tính tổng số tiền
        [Sequelize.fn('COUNT', Sequelize.col('order_id')), 'totalOrders'], // Đếm số lượng đơn hàng
      ],
      include: [
        {
          model: models.user,
          as: 'user',
          attributes: ['user_name', 'user_email'], // Chỉ lấy các thông tin cần thiết của user
        },
      ],
      where: {
        order_status: 6, // Điều kiện order_status = 6
      },
      group: ['user_id'], // Nhóm theo user_id để tính tổng
      order: [[Sequelize.literal('totalSpent'), 'DESC']], // Sắp xếp theo tổng tiền giảm dần
      limit: parseInt(limit, 10), // Lấy số lượng user theo tham số limit
    });

    if (data && data.length > 0) {
      responseSend(res, data, 'Thành công!', 200);
    } else {
      responseSend(res, [], 'Không có dữ liệu!', 404);
    }
  } catch (e) {
    console.error('Error:', e);
    responseSend(res, '', 'Server Error!', 500);
  }
};


const getOrderById = async (req, res) => {
    
    try {
    const user_id=req.id;
    
        let data = await order.findAll({
            where:{
                user_id,

            },
            include:[
                {
                    model:models.order_status,
                    as:"order_statuses",
                    where: {
                        order_status_id: sequelize.literal(`(
                          SELECT MAX(order_status_id) FROM order_status os WHERE os.order_id = order.order_id
                        )`),
                      },
                     
                     
                }
            ]
        });
        
        if (data) {
            responseSend(res, data, "Thành công!", 200);
        } else {
            responseSend(res, "", "không tồn tại !", 404);
        }
    } catch (error) {
        responseSend(res, "", "Có lỗi xảy ra!", 500);
    }
};
const getMonthlyRevenue = async (req, res) => {
    try {
      // Lấy ngày đầu tháng và cuối tháng hiện tại
      const today = new Date();
      const startDate = startOfMonth(today);
      const endDate = endOfMonth(today);
  
      // Query dữ liệu doanh thu
      const results = await models.order.findAll({
        attributes: [
          [fn('SUM', col('order_total')), 'total_revenue'], // Tính tổng doanh thu
        ],
        where: {
          order_date: {
            [Op.between]: [startDate, endDate], // Lọc đơn hàng trong tháng hiện tại
          },
        },
      });
  
      // Trả về kết quả
      res.status(200).json({
        success: true,
        data: results,
      });
    } catch (error) {
      console.error('Error fetching monthly revenue:', error);
      res.status(500).json({
        success: false,
        message: 'Có lỗi xảy ra khi lấy tổng doanh thu hàng tháng.',
      });
    }
  };


const changeStatusOrder = async (req, res) => {
    try {
        const idUser=req.id;
      const order_id = req.params.id;  // Lấy ID đơn hàng từ params
      const { order_status, order_status_text_cancel } = req.body;  // Lấy trạng thái và lý do hủy (nếu có)
      const order = await orders.findByPk(order_id);
        console.log(order_id);
        
    
      

      order.order_status = order_status;
      await order.save();


      // Tạo một bản ghi mới trong bảng order_status
      const newOrderStatus = await models.order_status.create({
        order_id: order_id,  // Liên kết với order_id
        order_status: order_status,  // Trạng thái của đơn hàng
        order_status_text_cancel: order_status_text_cancel || null,  // Lý do hủy nếu có
        created_at: new Date(),  // Thời gian tạo
      });
      if (order_status ==4 ) {
        // Lấy danh sách sản phẩm liên quan đến đơn hàng
        const orderItems = await models.detail_order.findAll({
          where: { order_id },
          attributes: ['product_id'], // Chỉ lấy product_id
        });
  
        const productIds = orderItems.map((item) => item.product_id);
        
        console.log(productIds);
        
        // Cập nhật cờ isPurchase = true cho các bình luận liên quan đến các sản phẩm trong đơn hàng
        await models.comment_product.update(
          { isPurchase: true },
          { where: { product_id: productIds, user_id:idUser }, }
        );
      }
      if ( order_status == 6 || order_status ==5) {
        
        // Tăng lại số lượng sản phẩm trong kho
        const orderItems = await models.detail_order.findAll({
          where: { order_id },
          attributes: ["product_color", "product_storage",'product_id','detail_order_quality'], // Truy xuất màu và dung lượng
        });
        console.log('313: ',orderItems);
        
        await Promise.all(
          orderItems.map(async (item) => {
            const colorMapping = await models.product_colors.findOne({
              where: {
                color: {
                  [Op.like]: `%${item.product_color}%`, // Tìm kiếm chứa chuỗi
                },
                product_id: item.product_id
                
              },
            });
            
            const storageMapping = await models.product_storage.findOne({
              where: {
                storage: {
                  [Op.like]: `%${item.product_storage}%`, // Tìm kiếm chứa chuỗi
                },
                product_id: item.product_id

              },
            });
            
        
            if (colorMapping && storageMapping) {
             const res= await models.product_quality.increment("quality_product", {
                by: item.detail_order_quality,
                where: {
                  product_id: item.product_id,
                  color_id: colorMapping.color_id,
                  storage_id: storageMapping.id_storage,
                },
              });
              console.log(res);
            }
          })
       
          
        );
        let data = await models.detail_order.findAll({
          where: {
            order_id,
           
          },
          include: [
            {
              model: models.products,
              as: 'product', // Bao gồm thông tin sản phẩm liên quan
            },
            {
              model: models.order,
              as: 'order',
              include: [
                {
                  model: models.user,
                  as: 'user', // Bao gồm thông tin người dùng liên quan
                },
                {
                  model: models.order_status,
                  as: "order_statuses", // Bao gồm lịch sử trạng thái đơn hàng
                },
                {
                  model: models.discount,
                  as: "discount_discount", // Bao gồm thông tin giảm giá
                },
              ],
            },
          ],
        });
        console.log("data1",data);
        
      io.emit("change_order",data)
      // Trả về phản hồi thành công với dữ liệu đã tạo
      return res.status(201).json({
        message: 'Đã tạo mới trạng thái đơn hàng thành công!',
        data: data,
      });
    } 


    return res.status(201).json({
      message: 'Đã tạo mới trạng thái đơn hàng thành công!',
      data: newOrderStatus,
    });

}catch (error) {
  // Nếu có lỗi, trả về lỗi cho người dùng
  console.error('Error creating order status:', error);
  console.log(error);
  
  return res.status(500).json({ message: 'Lỗi hệ thống, vui lòng thử lại sau.' });

};
}
  
const createorder = async (req, res) => {
  try {
      const {
          order_total,
          order_total_quatity,
          email_user,
          discount,    // Ensure you're using 'discount' correctly if it's needed
          address,
          phone_number,
          order_pay
      } = req.body;

      const user_id = req.id;  // Make sure `req.id` is properly set (typically from authentication)
      
      let date = new Date();
      
      // Create a new order record
      const neworder = await order.create({
          order_date: date,
          order_total,
          order_total_quatity,
          order_status: 0,  // Initial order status
          discount,
          user_id,
          address,
          phone_number,
          email_user,
          order_pay
      });

      // Create the order status entry (this might represent the initial status of the order)
      const newOrderStatus = await models.order_status.create({
          order_id: neworder.order_id,
          order_status: 0,  
          created_at: date
      });
      let newOrderData = await order.findOne({
        where: { order_id: neworder.order_id },
        include: [
          {
            model: models.order_status,
            as: "order_statuses",
            where: {
              order_status_id: sequelize.literal(`(
                SELECT MAX(order_status_id) FROM order_status os WHERE os.order_id = order.order_id
              )`),
            },
          },
          {
            model: models.discount,
            as: "discount_discount",
          },
        ],
      });
      
      // Phát sự kiện socket với dữ liệu mới
      io.emit('createOrder', newOrderData);
      

      // Send the response back to the client
      responseSend(res, neworder, "Thêm Thành công!", 201);
  } catch (error) {
      console.log(error);  // It's a good practice to log the error
      responseSend(res, error, "Có lỗi xảy ra!", 500);  // Send a generic error message back
  }
};

const getSuccessEmailOrder = async (req, res) => {
  try {
    const { email, orderDetails } = req.body;
    console.log(orderDetails);
    
    // Kiểm tra thông tin đầu vào
    if (!email || !orderDetails || !Array.isArray(orderDetails)) {
      return res.status(400).json({ message: 'Thông tin không hợp lệ.' });
    }

    // Kiểm tra từng phần tử trong orderDetails
    const invalidItems = orderDetails.filter(
      (item) =>
        !item.name || // Tên sản phẩm không tồn tại
        typeof item.quantity !== 'number' || // Số lượng không phải là số
        typeof item.price !== 'number' // Giá không phải là số
    );

    // if (invalidItems.length > 0) {
    //   return res.status(400).json({
    //     message: 'Một số sản phẩm trong danh sách không hợp lệ.',
    //     invalidItems,
    //   });
    // }

    // Tạo danh sách sản phẩm từ orderDetails
    const productList = orderDetails
      .map((item) => {
        const priceAfterDiscount = item.detail_order_price - (item.discount_product || 0);

        return `
          <li>
            <b>Sản phẩm:</b> ${item.product_name} <br>
            <b>Số lượng:</b> ${item.detail_order_quality} <br>
            <b>Giá:</b> ${priceAfterDiscount}
          </li>
        `;
      })
      .join('');

    // Tính tổng thanh toán
    const totalAmount = orderDetails
    .reduce((total, item) => {
      const priceAfterDiscount = item.detail_order_price - (item.discount_product || 0);
      return total + (item.detail_order_quality * priceAfterDiscount) + 30000;
    }, 0)

    // Tạo nội dung HTML cho email
    const htmlContent = `
      <h1 style="color: green;">Đơn hàng của bạn đã được đặt thành công!</h1>
      <p>Cảm ơn bạn đã mua sắm tại cửa hàng của chúng tôi.</p>
      <h3>Chi tiết đơn hàng:</h3>
      <ul>
        ${productList}
      </ul>
      <p>Tiền ship: 30.000đ</p>
      <p>Tổng thanh toán: <b>${totalAmount}</b></p>
      <p>Chúng tôi sẽ sớm xử lý và giao hàng đến bạn.</p>
      <br>
      <p>Trân trọng,<br>Đội ngũ hỗ trợ</p>
    `;

    // Gửi email
    const emailResult = await sendMail(email, 'Xác nhận đơn hàng thành công', '', htmlContent);

    if (emailResult) {
      return res.status(200).json({ message: 'Email xác nhận đã được gửi!' });
    } else {
      return res.status(500).json({ message: 'Gửi email không thành công.' });
    }
  } catch (error) {
    console.error('Lỗi khi gửi email:', error);
    return res.status(500).json({ message: 'Đã xảy ra lỗi khi gửi email.' });
  }
};

const updateorder = async (req, res) => {
    try {
        const order_id = req.params.id;
        const {
            order_date,
            order_total,
            order_total_quatity,
            order_status,
        } = req.body;
        const pay_id =  req.id;
        const user_id = req.id;
        const discount = req.id;
        const order = await orders.findByPk(order_id);
        if (!order) {
            responseSend(res, "", "Đơn hàng không tồn tại!", 404);
            return;
        }
        order.order_date = order_date;
        order.order_total = order_total;
        order.order_total_quatity = order_total_quatity;
        order.order_status = order_status;
        order.pay_id = pay_id;
        order.user_id = user_id;
        order.discount = discount;
        await order.save();
        responseSend(res, order, "Đã Cập Nhật Thành Công!", 200);
    } catch (error) {
        console.error("Error updating order:", error);
        responseSend(res, "", "Có lỗi xảy ra!", 500);
    }
};

const deleteorder = async (req, res) => {
    try {
        const deleted = await order.destroy({
            where: { order_id: req.params.id }
        });
        if (deleted) {
            responseSend(res, deleted, "Đã Xóa Thành Công!", 200);
        } else {
            responseSend(res, "", "Không tìm thấy đơn hàng!", 404);
        }
    } catch (error) {
        responseSend(res, "", "Có lỗi xảy ra khi xóa đơn hàng!", 500);
    }
};
const getOrderId= async (req, res) => {
  try {
      const orderId = await order.findOne({
          where: { order_id: req.params.id },
          
      });
      if (orderId) {
        io.emit('pay_order',orderId.order_pay);
        // console.log('Đã emit sự kiện pay_order với giá trị2:',orderId.order_pay);
          responseSend(res, orderId, "Thành Công!", 200);
          
      } else {
          responseSend(res, "", "Không tìm thấy đơn hàng!", 404);
      }
      
  } catch (error) {
      responseSend(res, "", "Có lỗi xảy ra khi xóa đơn hàng!", 500);
      console.log(error);
      
  }
};
export const checkInventory = async (product_id, color_id, storage_id, quantity, res) => {
  // Build the condition object dynamically
  let condition = { product_id, color_id };

  // Only add storage_id to condition if it's provided
  if (storage_id) {
    condition.storage_id = storage_id;
  }

  const inventory = await models.product_quality.findOne({
    where: condition,  // Apply dynamic condition
  });

  if (!inventory) {
    return responseSend(res, "", "Không tìm thấy số lượng trong sản phẩm!", 200);
  }

  const product = await models.products.findOne({
    where: { product_id },
  });

  // Check if the stock is low
  if (inventory.quality_product < 10) {
    // Send notification if product is running low
    io.emit("low_stock_warning", {
      title: "Thông báo nhập hàng",
      description: `Sản phẩm ${product.product_name} sắp hết số lượng. Vui lòng kiểm tra và bổ sung!`,
    });
  }

  // Check if the requested quantity is available
  if (inventory.quality_product < quantity) {
    return responseSend(res, "", "Số lượng sản phẩm không đủ!", 200);
  }

  // Return inventory if checks pass
  return inventory;
};

export {
    getorder,
    getOrderById,
    getOrderId,
    createorder,
    updateorder,
    deleteorder,
    changeStatusOrder,
    getMonthlyRevenue,
    // getOrdersForToday,
    getOrderUserTop,
    getRevenueBetweenDates ,
    getSuccessEmailOrder
};