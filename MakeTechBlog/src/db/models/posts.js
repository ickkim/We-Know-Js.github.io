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
      post_title: { type: DataTypes.STRING, allowNull: false },
      post_categories: { type: DataTypes.STRING, allowNull: false },
      post_content: { type: DataTypes.STRING, allowNull: false },
    },
    {
      freezeTableName: true,
      tableName: 'tbl_post',
      underscored: true,
      timestamps: false,
    },
  );

  Posts.associate = function(models) {};
  return Posts;
};
