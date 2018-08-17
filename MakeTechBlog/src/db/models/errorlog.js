module.exports = (sequelize, DataTypes) => {
  const errorLog = sequelize.define(
    'errorLog',
    {
      errorLog_no: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      errorLog_status: { type: DataTypes.INTEGER(4), allowNull: true },
      errorLog_content: { type: DataTypes.TEXT, allowNull: true },
      errorLog_isCheck: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false,
      },
    },
    {
      freezeTableName: true,
      tableName: 'tbl_errorLog',
      underscored: true,
      timestamps: true,
    },
  );

  errorLog.associate = function(models) {};
  return errorLog;
};
