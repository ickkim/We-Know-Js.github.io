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
      errorLog_type: { type: DataTypes.STRING, allowNull: true },
      errorLog_content: { type: DataTypes.STRING, allowNull: true },
      errorLog_Date: { type: DataTypes.DATE, allowNull: true },
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
      timestamps: false,
    },
  );

  errorLog.associate = function(models) {};
  return errorLog;
};
