module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define(
    'Users',
    {
      users_no: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
      },
      users_alias: { type: DataTypes.STRING(20), allowNull: false },
      users_email: { type: DataTypes.STRING },
      users_phone: { type: DataTypes.STRING(15) },
    },
    {
      freezeTableName: true,
      tableName: 'tbl_users',
      underscored: true,
      timestamps: true,
      paranoid: true,
    },
  );

  Users.associate = function(models) {
    Users.hasMany(models.Posts, { foreignKey: 'post_writer' });
  };
  return Users;
};
