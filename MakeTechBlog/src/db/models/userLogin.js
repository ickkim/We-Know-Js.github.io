module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define(
    'Login',
    {
      userLogin_no: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      userLogin_id: { type: DataTypes.STRING, allowNull: false },
      userLogin_pw: { type: DataTypes.STRING, allowNull: false },
      userLogin_salt: { type: DataTypes.INTEGER, allowNull: false },
    },
    {
      freezeTableName: true,
      tableName: 'tbl_userLogin',
      underscored: true,
      timestamps: true,
    },
  );

  Users.associate = function(models) {};
  return Users;
};
