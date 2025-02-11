import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class bankauto extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    id_bank: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    short_name: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    accountName: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    accountNumber: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    on_off: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'bankauto',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_bank" },
        ]
      },
    ]
  });
  }
}
