
import { Sequelize } from "sequelize";

const sequelize = new Sequelize(
  "nmaplpaa_apitest",
  "nmaplpaa_duy",
  "Phamngocduy@@",
  {
    host: "103.221.221.104",
    dialect: "mysql",
    port: 3306,
    dialectOptions: {
      connectTimeout: 20000,
    },
  }
);

async function authenticateDB() {
  try {
    await sequelize.authenticate();
    console.log("Kết Nối Thành Công");
  } catch (e) {
    console.error("Kết Nối Thất Bại:", e);
  }
}

authenticateDB();

export default sequelize;
