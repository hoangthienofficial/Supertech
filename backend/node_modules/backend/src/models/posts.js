import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class posts extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    post_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    post_title: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    post_content: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    post_date: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'posts',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "post_id" },
        ]
      },
    ]
  });
  }
}
