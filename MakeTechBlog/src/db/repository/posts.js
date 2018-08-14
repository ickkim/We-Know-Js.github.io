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
