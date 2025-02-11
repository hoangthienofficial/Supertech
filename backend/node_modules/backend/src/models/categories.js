import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class categories extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    category_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    category_name: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    category_dad: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    category_date_task: {
      type: DataTypes.DATE,
      allowNull: true
    },
    category_task: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'categories',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "category_id" },
        ]
      },
    ]
  });
  }
}
