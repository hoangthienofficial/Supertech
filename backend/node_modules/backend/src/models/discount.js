import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class discount extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    discount_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    discount_name: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    discount_percent: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    condition: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    discount_date_start: {
      type: DataTypes.DATE,
      allowNull: true
    },
    discount_date_end: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'discount',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "discount_id" },
        ]
      },
    ]
  });
  }
}
