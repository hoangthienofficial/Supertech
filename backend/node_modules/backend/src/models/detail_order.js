import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class detail_order extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    detail_order_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    detail_order_quality: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    detail_order_price: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    discount_product: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    order_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'order',
        key: 'order_id'
      }
    },
    product_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'products',
        key: 'product_id'
      }
    },
    product_color: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    product_storage: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
   
    product_name: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    img_name: {
      type: DataTypes.TEXT,
      allowNull: true
    },
  }, {
    sequelize,
    tableName: 'detail_order',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "detail_order_id" },
        ]
      },
      {
        name: "fk_detailorder_order",
        using: "BTREE",
        fields: [
          { name: "order_id" },
        ]
      },
      {
        name: "fk_productidr_producttt",
        using: "BTREE",
        fields: [
          { name: "product_id" },
        ]
      },
    ]
  });
  }
}
