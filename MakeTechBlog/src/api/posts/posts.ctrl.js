const postDB = require('../../db/repository/posts');
const paging = require('../../lib/post/paging');

createView = (req, res) => {
  return res.render('postWrite');
};

create = async (req, res, next) => {
  let { title, tag, content } = req.body;
  if (!title || !tag || !content) {
    return res.status(400).end('입력이 올바르지 않습니다.');
  }

  try {
    let result = await postDB.creatPost(req.body);
    return res.status(201).json(result);
  } catch (e) {
    return next(e);
  }
};

list = async (req, res, next) => {
  let postList, totalCnt, pagingInfo;
  let hotPost;

  try {
    totalCnt = await postDB.totalCount();
    hotPost = await postDB.findHotPost();
  } catch (e) {
    next(e);
  }
  pagingInfo = paging.paging(totalCnt, req.query);
  const offset = (pagingInfo.page - 1) * pagingInfo.perPageNum;
  try {
    postList = await postDB.findAllList(pagingInfo.perPageNum, offset);
  } catch (e) {
    next(e);
  }

  return res.render('postsList', { postList, pagingInfo, hotPost });
};

show = async (req, res, next) => {
  let post;
  try {
    post = await postDB.findById(req.params.id);
    if (!post) return next();
    await post.updateAttributes({ count: post.dataValues.count + 1 });
  } catch (e) {
    next(e);
  }
  return res.render('postsRead', { post });
};

update = (req, res, next) => {
  return res.send('');
};

remove = (req, res, next) => {
  return res.send('');
};

uploadImage = (req, res, next) => {
  return res.send(req.files[0].filename);
};

module.exports = {
  createView,
  create,
  list,
  show,
  update,
  remove,
  uploadImage,
};
