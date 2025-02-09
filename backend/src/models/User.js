import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class user extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    user_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    user_name: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    user_email: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    user_password: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    user_address: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    user_phone: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    user_image: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    user_role: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    level: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    user_gender: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    user_birth: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    user_time: {
      type: DataTypes.DATE,
      allowNull: true
    },
    is_verified: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: 0
    },
    user_status: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    user_call: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    user_time_connection: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    user_time_disconnection: {
      type: DataTypes.STRING(255),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'user',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "user_id" },
        ]
      },
    ]
  });
  }
}
