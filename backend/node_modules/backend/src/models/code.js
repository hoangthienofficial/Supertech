import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class code extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    code_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    code: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'user',
        key: 'user_id'
      }
    }
  }, {
    sequelize,
    tableName: 'code',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "code_id" },
        ]
      },
      {
        name: "fk_code_userid",
        using: "BTREE",
        fields: [
          { name: "user_id" },
        ]
      },
    ]
  });
  }
}
