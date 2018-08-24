const { Posts } = require('../../db');

const findAllList = (pageNum = 10) => {
  return Posts.findAll({
    limit: pageNum,
    attributes: [
      'post_no',
      'post_title',
      'post_tag',
      'post_content',
      'post_count',
      [
        Posts.sequelize.fn(
          'date_format',
          Posts.sequelize.col('created_at'),
          '%Y-%m-%d',
        ),
        'created_at',
      ],
    ],
    order: [['created_at', 'DESC']],
  });
};

const creatPost = ({ title, tag, content }) => {
  return Posts.create({
    post_title: title,
    post_tag: tag,
    post_content: content,
  });
};

const findById = id => {
  return Posts.findById(id);
};

const deleteById = id => {
  return Posts.destroy({
    where: {
      post_no: id,
    },
  });
};

const updateById = (id, title, content, categories) => {
  return Posts.update(
    {
      post_title: title,
      post_content: content,
      post_categories: categories,
    },
    { where: { post_no: id } },
  );
};

module.exports = {
  findById,
  deleteById,
  findAllList,
  creatPost,
  updateById,
};
