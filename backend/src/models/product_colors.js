import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class product_colors extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    color_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    color: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    quality: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    image_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'image_product',
        key: 'image_id'
      }
    },
    product_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'products',
        key: 'product_id'
      }
    }
  }, {
    sequelize,
    tableName: 'product_colors',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "color_id" },
        ]
      },
      {
        name: "fk_color_product",
        using: "BTREE",
        fields: [
          { name: "product_id" },
        ]
      },
      {
        name: "fk_color_product123",
        using: "BTREE",
        fields: [
          { name: "image_id" },
        ]
      },
    ]
  });
  }
}
