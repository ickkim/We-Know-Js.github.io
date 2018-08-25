module.exports = (sequelize, DataTypes) => {
  const UserLogin = sequelize.define(
    'UserLogin',
    {
      no: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      id: {
        type: DataTypes.STRING(20),
        allowNull: false,
        unique: true,
        validate: { len: [5, 20], isLowercase: true },
      },
      pw: {
        type: DataTypes.STRING(20),
        allowNull: false,
        validate: { len: [5, 20], isLowercase: true },
      },
      salt: { type: DataTypes.STRING, allowNull: false },
    },
    {
      freezeTableName: true,
      tableName: 'tbl_userLogin',
      underscored: true,
      timestamps: true,
      paranoid: true,
    },
  );

  UserLogin.associate = function(models) {};
  return UserLogin;
};
