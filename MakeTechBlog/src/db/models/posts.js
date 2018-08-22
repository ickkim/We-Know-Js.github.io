module.exports = (sequelize, DataTypes) => {
  const Posts = sequelize.define(
    'Posts',
    {
      post_no: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      post_title: { type: DataTypes.STRING(100), allowNull: false },
      post_tag: { type: DataTypes.STRING(100), allowNull: false },
      post_content: {
        type: DataTypes.TEXT('long'),
        allowNull: false,
      },
      post_count: {
        type: DataTypes.INTEGER.UNSIGNED,
        defaultValue: 0,
        allowNull: false,
      },
    },
    {
      freezeTableName: true,
      tableName: 'tbl_posts',
      underscored: true,
      timestamps: true,
      paranoid: true,
    },
  );

  Posts.associate = function(models) {
    Posts.belongsTo(models.Users, { foreignKey: 'post_writer' });
  };

  return Posts;
};
