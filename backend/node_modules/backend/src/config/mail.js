import nodemailer from 'nodemailer';
import { responseSend } from "../config/response.js";
import initModels from "../models/init-models.js";
const models = initModels(sequelize);
import sequelize from "../models/connect.js";
const { setting } = models;
const getSMTPFromDatabase = async () => {
  const settings = await setting.findAll({
    where: {
      id: [12, 13, 14]
    }
  });

  const smtpSettings = {};
  settings.forEach(setting => {
    switch (setting.id) {
      case 12:
        smtpSettings.SMTP_USER = setting.value;
        break;
      case 13:
        smtpSettings.SMTP_PASSWORD = setting.value;
        break;
      case 14:
        smtpSettings.SMTP_MAIL_CONTENT = setting.value;
        break;
      default:
        break;
    }
  });

  return smtpSettings;
};
export const sendMail = async (to, subject, text, html) => {
  const smtpSettings = await getSMTPFromDatabase(); 
  const SMTP_USER = smtpSettings.SMTP_USER;  
  const SMTP_PASSWORD = smtpSettings.SMTP_PASSWORD; 
  const SMTP_MAIL_CONTENT = smtpSettings.SMTP_MAIL_CONTENT;
  return new Promise((resolve, reject) => {
    // Cấu hình email
    let configMail = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: SMTP_USER, // Địa chỉ email của bạn
        pass: SMTP_PASSWORD   // Mật khẩu ứng dụng
      },
      tls: {
        rejectUnauthorized: false 
      }
    });

    let infoMail = {
      from: SMTP_MAIL_CONTENT,  
      to,                        
      subject,                   
      text,                      
      html                      
    };

    console.log("Email info:", infoMail);

    // Gửi email
    configMail.sendMail(infoMail, (err, info) => {
      if (err) {
        console.error("Error sending email:", err);  
        reject(false);
      } else {
        console.log("Email sent successfully:", info.response);
        resolve(true);
      }
    });
  });
};
