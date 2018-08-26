const { Posts } = require('../../db');

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
          '%Y-%m-%d',
        ),
        'created_at',
      ],
    ],
    order: [['created_at', 'DESC']],
  });
};

creatPost = ({ title, tag, content }) => {
  return Posts.create({
    title: title,
    tag: tag,
    content: content,
  });
};

findById = id => {
  return Posts.findById(id);
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
};
