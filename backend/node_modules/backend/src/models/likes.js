import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class likes extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    like_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'user',
        key: 'user_id'
      }
    },
    post_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'posts',
        key: 'post_id'
      }
    },
    comment_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'comment_product',
        key: 'comment_id'
      }
    },
    replies_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'replies_comment_product',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'likes',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "like_id" },
        ]
      },
      {
        name: "fk_like_user",
        using: "BTREE",
        fields: [
          { name: "user_id" },
        ]
      },
      {
        name: "fk_like_post",
        using: "BTREE",
        fields: [
          { name: "post_id" },
        ]
      },
      {
        name: "fk_like_commentoprod",
        using: "BTREE",
        fields: [
          { name: "comment_id" },
        ]
      },
      {
        name: "fk_like_replies",
        using: "BTREE",
        fields: [
          { name: "replies_id" },
        ]
      },
    ]
  });
  }
}
