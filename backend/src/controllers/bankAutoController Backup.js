import axios from "axios";
import sequelize from "../models/connect.js";
import { responseSend } from "../config/response.js";  
import initModels from "../models/init-models.js";

const models = initModels(sequelize);
const { order, bank_auto, history_bank, order_status } = models;  

const checkTransactionStatus = async (req, res) => {
    try {
        const response = await axios.get("https://api.sieuthicode.net/historyapiviettelv2/c9145cb9549734430860e53bfa3bb360");
        const { transactions } = response.data;

        const recentTransactions = transactions.slice(0, 5);
        console.log("Recent Transactions: ", recentTransactions);

        for (const transaction of recentTransactions) {
            const { description, amount, transactionID } = transaction;
            if (description.includes("naptien")) {
                const orderIdMatch = description.match(/naptien(\d+)/);
                if (orderIdMatch) {
                    const orderId = orderIdMatch[1];
                    console.log(`Extracted order_id: ${orderId} from description: ${description}`);
                    const matchedOrder = await order.findOne({
                        where: { order_id: orderId }
                    });
                    if (matchedOrder) {
                        console.log(`Thanh Toán Thành Công !:`, matchedOrder.dataValues);
                        await history_bank.create({
                            transactionId: transactionID,
                            description: description,
                            amount: amount
                        });
                        console.log("Lưu Thành Công Lịch Sử Giao Dịch ID:", transactionID);
                    } else {
                        console.log(`Không Tìm Thấy Mã Đơn Hàng : ${orderId}`);
                    }
                } else {
                    console.log("Không Tìm Thấy Nội Dung Giao Dịch.");
                }
            } else {
                console.log("Nội Dung Giao Dịch Không Có 'naptien'.");
            }
        }
        responseSend(res, null, "5 giao dịch gần nhất đã được xử lý thành công.", 200);
    } catch (error) {
        console.error("Error checking transactions:", error);
        responseSend(res, error.message, "Error checking transactions.", 500);
    }
};

export { checkTransactionStatus };