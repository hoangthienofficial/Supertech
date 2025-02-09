import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class banner extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    banner_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    banner_name: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    status: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'banner',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "banner_id" },
        ]
      },
    ]
  });
  }
}
