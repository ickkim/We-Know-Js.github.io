module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define(
    'Users',
    {
      users_no: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
      },
      users_name: { type: DataTypes.STRING, allowNull: false },
      users_isman: { type: DataTypes.BOOLEAN }, // 남자 : 1  여자  : 0 ???
      users_email: { type: DataTypes.STRING },
      users_phone: { type: DataTypes.STRING },
    },
    {
      freezeTableName: true,
      tableName: 'tbl_users',
      underscored: true,
      timestamps: true,
    },
  );

  Users.associate = function(models) {};
  return Users;
};
