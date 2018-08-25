const { Posts } = require('../../db');

const findAllList = (pageNum = 10) => {
  return Posts.findAll({
    limit: pageNum,
    attributes: [
      'no',
      'title',
      'tag',
      'count',
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
    title: title,
    tag: tag,
    content: content,
  });
};

const findById = id => {
  return Posts.findById(id);
};

const deleteById = id => {
  return Posts.destroy({
    where: {
      no: id,
    },
  });
};

const updateById = (id, title, content, categories) => {
  return Posts.update(
    {
      title,
      content,
      categories,
    },
    { where: { no: id } },
  );
};

module.exports = {
  findById,
  deleteById,
  findAllList,
  creatPost,
  updateById,
};
