module.exports = (sequelize, DataTypes) => {
  const UserLogin = sequelize.define(
    'UserLogin',
    {
      userLogin_no: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      userLogin_id: {
        type: DataTypes.STRING(20),
        allowNull: false,
        unique: true,
        validate: { len: [5, 20], isLowercase: true },
      },
      userLogin_pw: {
        type: DataTypes.STRING(20),
        allowNull: false,
        validate: { len: [5, 20], isLowercase: true },
      },
      userLogin_salt: { type: DataTypes.INTEGER, allowNull: false },
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
