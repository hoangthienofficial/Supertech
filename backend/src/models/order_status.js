import _sequelize from "sequelize";
const { Model, Sequelize } = _sequelize;

export default class order_status extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    order_status_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    order_status: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    order_status_text_cancel: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    order_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: true
    },
  }, {
    sequelize,
    tableName: 'order_status',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "order_status_id" },
        ]
      },
      {
        name: "fk_status_order",
        using: "BTREE",
        fields: [
          { name: "order_id" },
        ]
      },
    ]
  });
  }
}