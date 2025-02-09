import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class product_storage extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    id_storage: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    storage: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    storage_quatity: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    storage_price: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    product_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'products',
        key: 'product_id'
      }
    },
    color_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'product_colors',
        key: 'color_id'
      }
    }
  }, {
    sequelize,
    tableName: 'product_storage',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_storage" },
        ]
      },
      {
        name: "fk_storage_product",
        using: "BTREE",
        fields: [
          { name: "product_id" },
        ]
      },
      {
        name: "fk_storage_color",
        using: "BTREE",
        fields: [
          { name: "color_id" },
        ]
      },
    ]
  });
  }
}
