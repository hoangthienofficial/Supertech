import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class chat extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    chat_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    chat_text: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    send_time: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    room_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'chatRoom',
        key: 'room_id'
      }
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
    tableName: 'chat',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "chat_id" },
        ]
      },
      {
        name: "fk_chat_product",
        using: "BTREE",
        fields: [
          { name: "user_id" },
        ]
      },
      {
        name: "fk_chat_roomid",
        using: "BTREE",
        fields: [
          { name: "room_id" },
        ]
      },
    ]
  });
  }
}
