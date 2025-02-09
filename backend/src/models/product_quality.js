import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class product_quality extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    quality_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    quality_product: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    color_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'product_colors',
        key: 'color_id'
      }
    },
    storage_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'product_storage',
        key: 'id_storage'
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
    tableName: 'product_quality',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "quality_id" },
        ]
      },
      {
        name: "rrr_idx",
        using: "BTREE",
        fields: [
          { name: "color_id" },
        ]
      },
      {
        name: "fk_storage_color_idx",
        using: "BTREE",
        fields: [
          { name: "storage_id" },
        ]
      },
      {
        name: "fk_quality_product_id_idx",
        using: "BTREE",
        fields: [
          { name: "product_id" },
        ]
      },
    ]
  });
  }
}
