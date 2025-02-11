import sequelize from "../models/connect.js";
import { responseSend } from "../config/response.js";
import initModels from "../models/init-models.js";
let models = initModels(sequelize); 
let discount = models.discount; 

const getdiscount = async (req, res) => {
    try {
        let data = await discount.findAll();
        responseSend(res, data, "Thành công!", 200);
    } catch (error) {
        responseSend(res, "", "Có lỗi xảy ra!", 500);
    }
};
const createUserDiscount = async (req, res) => {
    try {
        const user_id=req.id;

       const {discount_id}=req.body;
        const user_at=new Date();
          const newDiscount = await models.user_discounts.create({
            user_id,discount_id,user_at
        });

        responseSend(res, newDiscount, "Thành công!", 200);
    } catch (error) {
        responseSend(res, "", "Có lỗi xảy ra!", 500);
    }
};

const getdiscountById = async (req, res) => {
    try {
        let data = await discount.findByPk(req.params.id);
        if (data) {
            responseSend(res, data, "Thành công!", 200);
        } else {
            responseSend(res, "", "không tồn tại !", 404);
        }
    } catch (error) {
        responseSend(res, "", "Có lỗi xảy ra!", 500);
    }
};

const creatediscount = async (req, res) => {
    try {
      const { discount_name, discount_percent, discount_date_start, discount_date_end, condition } = req.body;
  
      if (!discount_date_start || !discount_date_end) {
        return res.status(400).json({ message: 'Vui lòng cung cấp đầy đủ ngày bắt đầu và ngày kết thúc.' });
      }
  
      const startDate = new Date(discount_date_start);
      const endDate = new Date(discount_date_end);
  
      if (endDate <= startDate) {
        return res.status(400).json({ message: 'Ngày kết thúc phải lớn hơn ngày bắt đầu.' });
      }
  
      const newDiscount = await sequelize.models.discount.create({
        discount_name,
        discount_percent,
        discount_date_start: startDate,
        discount_date_end: endDate,
        condition,
      });
  
      // Tính thời gian hết hạn và lên lịch xóa
      const expirationDate = new Date(endDate);
      expirationDate.setDate(expirationDate.getDate() + 1); // Thêm 1 ngày sau ngày kết thúc
      const timeUntilDeletion = expirationDate.getTime() - Date.now();
  
      setTimeout(async () => {
        await sequelize.models.discount.destroy({
          where: { id: newDiscount.id },
        });
        console.log(`Đã tự động xóa mã giảm giá "${discount_name}" do đã hết hạn.`);
      }, timeUntilDeletion);
  
      res.status(201).json({ message: 'Thêm mã giảm giá thành công!', data: newDiscount });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Có lỗi xảy ra khi thêm mã giảm giá.' });
    }
  };
  

const applyDiscount = async (req, res) => 
    {
        const     userId     =req.id;

    const {  discountId } = req.body;

    if (!userId || !discountId) {
      return res.status(400).json({ message: 'User ID and Discount ID are required.' });
    }
  
    try {
      // Kiểm tra xem người dùng đã áp dụng mã giảm giá chưa
      const existingDiscount = await    models. user_discounts.findOne({
        where: { user_id: userId, discount_id: discountId }
      });
  
      if (existingDiscount) {
        // Nếu đã áp dụng mã giảm giá, trả về thông báo
        return res.status(400).json({ message: 'You have already applied this discount.' });
      }
  
    
  
      return res.status(200).json({
        message: 'Discount applied successfully!',
    
      });
  
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'An error occurred while applying the discount.' });
    }
};
const deletediscount = async (req, res) => {
    try {
        let deleted = await discount.destroy({
            where: { discount_id: req.params.id }
        });
        if (deleted) {
            responseSend(res, deleted, "Đã Xóa Thành Công!", 200);
        } else {
            responseSend(res, "", "không tìm thấy !", 404);
        }
    } catch (error) {
        responseSend(res, "", "Có lỗi xảy ra!", 500);
    }
};

export {
    getdiscount,
    getdiscountById,
    creatediscount,
    applyDiscount,
    createUserDiscount,
    deletediscount
};