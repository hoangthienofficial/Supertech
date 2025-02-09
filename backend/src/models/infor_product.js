import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class infor_product extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    infor_product: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    infor_screen: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    infor_system: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    infor_cpu: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    infor_ram: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    infor_compan: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    infor_rom: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    infor_frontCamera: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    infor_rearCamera: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    infor_scanning_frequency: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    infor_chip_battery: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    infor_more: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    infor_more2: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'infor_product',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "infor_product" },
        ]
      },
    ]
  });
  }
}
