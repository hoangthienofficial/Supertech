import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class media_post extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    media_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    media_url: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    post_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'posts',
        key: 'post_id'
      }
    }
  }, {
    sequelize,
    tableName: 'media_post',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "media_id" },
        ]
      },
      {
        name: "fk_postiddd_posts",
        using: "BTREE",
        fields: [
          { name: "post_id" },
        ]
      },
    ]
  });
  }
}
