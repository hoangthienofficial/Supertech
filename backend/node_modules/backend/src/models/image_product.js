import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class image_product extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    image_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    image_one: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    image_two: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    image_three: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    image_four: {
      type: DataTypes.STRING(50),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'image_product',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "image_id" },
        ]
      },
    ]
  });
  }
}
