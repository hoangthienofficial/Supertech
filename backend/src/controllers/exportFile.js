import sequelize from "../models/connect.js";
import initModels from "../models/init-models.js";
import ExcelJS from 'exceljs'
import PDFDocument from "pdfkit"
import path from "path"; // Hỗ trợ xác định đường dẫn
import { fileURLToPath } from 'url';
import fs from 'fs';

// import '../font/Roboto-Regular.ttf'
let models = initModels(sequelize); 
const exportFile=async(req,res)=>{
    
    try {
        const { data } = req.body; // Nhận dữ liệu từ Frontend

        if (!data || data.length === 0) {
            return res.status(400).send('No data provided');
        }

        // Tạo workbook và worksheet
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('Data');

        // Lấy danh sách các cột từ keys của object đầu tiên
        const columns = Object.keys(data[0]);
        worksheet.columns = columns.map(key => ({
            header: key.toUpperCase(),
            key: key,
            width: 20,
        }));

        // Thêm dữ liệu vào worksheet
        data.forEach(item => worksheet.addRow(item));

        // Thiết lập header tải file
        res.setHeader(
            'Content-Type',
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        );
        res.setHeader('Content-Disposition', 'attachment; filename=data.xlsx');

        // Gửi file Excel về client
        await workbook.xlsx.write(res);
        res.end();
    } catch (error) {
        console.error('Error exporting Excel:', error);
        res.status(500).send('Failed to export Excel');
    }
}
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const exportFilePDF = async (req, res) => {
    const { data } = req.body; // Dữ liệu từ frontend

    if (!data || data.length === 0) {
        return res.status(400).send('No data provided');
    }

    const doc = new PDFDocument();

    // Đường dẫn tới font sử dụng __dirname
    const fontPath = path.join(__dirname, "../font/Roboto-Regular.ttf");

    // Kiểm tra xem font có tồn tại không trước khi đăng ký
    if (fs.existsSync(fontPath)) {
        doc.registerFont("Roboto", fontPath);
        doc.font("Roboto"); // Sử dụng font
    } else {
        console.error("Font file not found at", fontPath);
    }

    doc.fontSize(25).text("Data Export", { align: "center" });
    doc.moveDown();
    
    // Thêm dữ liệu vào PDF
    data.forEach(item => {
        for (let [key, value] of Object.entries(item)) {
            doc.fontSize(14).text(`${key}: ${value}`);
        }
        doc.moveDown(); 
    });

    // Thiết lập header và gửi file PDF về client
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=data.pdf');

    doc.pipe(res);  
    doc.end();
};
export {exportFile,exportFilePDF}