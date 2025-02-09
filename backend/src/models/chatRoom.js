import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class chatRoom extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    room_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    room_name: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    room_create_date: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    room_delete_date: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    id_user_join: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    id_user_chose: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'chatRoom',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "room_id" },
        ]
      },
      {
        name: "fk_user_join",
        using: "BTREE",
        fields: [
          { name: "id_user_join" },
        ]
      },
      {
        name: "fk_user_chose",
        using: "BTREE",
        fields: [
          { name: "id_user_chose" },
        ]
      },
    ]
  });
  }
}
