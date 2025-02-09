import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class products extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    product_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    product_name: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    product_price: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    product_star: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    product_discount: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    product_hot: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    view: {
      type: DataTypes.INTEGER,
      defaultValue: 0, // Giá trị mặc định là 0
    },
    product_date: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    infor_product: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'infor_product',
        key: 'infor_product'
      }
    },
    category_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'categories',
        key: 'category_id'
      }
    }
  }, {
    sequelize,
    tableName: 'products',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "product_id" },
        ]
      },
      {
        name: "fk_infor_inforproduct",
        using: "BTREE",
        fields: [
          { name: "infor_product" },
        ]
      },
      {
        name: "fk_category_id",
        using: "BTREE",
        fields: [
          { name: "category_id" },
        ]
      },
    ]
  });
  }
}
