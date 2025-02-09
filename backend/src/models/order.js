import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class order extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    order_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    order_date: {
      type: DataTypes.DATE,
      allowNull: true
    },
    order_total: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    order_total_quatity: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    order_status: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    pay_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'pay',
        key: 'pay_id'
      }
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'user',
        key: 'user_id'
      }
    },
    discount: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'discount',
        key: 'discount_id'
      }
    },
    address: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    phone_number: {
      type: DataTypes.STRING(15),
      allowNull: true
    },
    email_user: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    order_pay: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'order',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "order_id" },
        ]
      },
      {
        name: "fk_payid_pay",
        using: "BTREE",
        fields: [
          { name: "pay_id" },
        ]
      },
      {
        name: "fk_userid_userrr",
        using: "BTREE",
        fields: [
          { name: "user_id" },
        ]
      },
      {
        name: "fk_discountid_discount",
        using: "BTREE",
        fields: [
          { name: "discount" },
        ]
      },
    ]
  });
  }
}
