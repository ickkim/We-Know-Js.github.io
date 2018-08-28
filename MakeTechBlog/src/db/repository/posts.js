const { Posts } = require('../../db');

findHotPost = () => {
  return Posts.findAll({
    limit: 5,
    attributes: ['no', 'title'],
    order: [['count', 'desc']],
  });
};

findAllList = (pageNum = 10, offset = 0) => {
  return Posts.findAll({
    limit: pageNum,
    offset,
    attributes: [
      'no',
      'title',
      'tag',
      'count',
      [
        Posts.sequelize.fn(
          'date_format',
          Posts.sequelize.col('created_at'),
          '%Y.%m.%d',
        ),
        'created_at',
      ],
    ],
    order: [['created_at', 'DESC']],
  });
};

creatPost = ({ title, tag, content, category }) => {
  return Posts.create({
    title,
    tag,
    content,
    category_no: category,
  });
};

findById = id => {
  return Posts.findById(id, {
    attributes: [
      'no',
      'title',
      'tag',
      'content',
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
  });
};

deleteById = id => {
  return Posts.destroy({
    where: {
      no: id,
    },
  });
};

updateById = (id, title, content, categories) => {
  return Posts.update(
    {
      title,
      content,
      categories,
    },
    { where: { no: id } },
  );
};

totalCount = () => {
  return Posts.count();
};

module.exports = {
  findById,
  deleteById,
  findAllList,
  creatPost,
  updateById,
  totalCount,
  findHotPost,
};
