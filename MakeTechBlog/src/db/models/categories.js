module.exports = (sequelize, DataTypes) => {
  const categories = sequelize.define(
    'categories',
    {
      no: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      explain: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
    },
    {
      freezeTableName: true,
      tableName: 'tbl_categories',
      underscored: true,
      timestamps: false,
    },
  );

  categories.associate = function(models) {};
  return categories;
};
