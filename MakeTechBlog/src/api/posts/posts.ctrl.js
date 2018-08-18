const postDB = require('../../db/repository/posts');

createView = (req, res) => {
  return res.render('postWrite');
};

create = async (req, res, next) => {
  let { title, tag, content } = req.body;
  console.log(req.body);
  if (!title || !tag || !content) {
    return res.status(400).end('입력이 올바르지 않습니다.');
  }

  try {
    let result = await postDB.creatPost(req.body);
    console.log(result.dataValues);
    return res.status(201).json(result);
  } catch (e) {
    return next(e);
  }
};

list = async (req, res, next) => {
  let list = await postDB.findAllList();

  return res.render('postsList', { list });
};

show = async (req, res, next) => {
  let post = await postDB.findById(req.params.id);

  return res.render('postsRead', { post });
};

update = (req, res, next) => {
  return res.send('');
};

remove = (req, res, next) => {
  return res.send('');
};

module.exports = {
  createView,
  create,
  list,
  show,
  update,
  remove,
};
