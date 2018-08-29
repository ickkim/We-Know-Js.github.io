const postDB = require('../../db/repository/posts');
const subPostDB = require('../../db/repository/subPost');
const paging = require('../../lib/post/paging');
const validation = require('../../lib/validation/validation');

createView = (req, res) => {
  return res.render('team/postWrite');
};

createSubView = (req, res) => {
  return res.render('team/subPostWrite', { no: req.params.id });
};

create = async (req, res, next) => {
  let { title, tag, content, category } = req.body;

  if (!validation.arrayElementIsString([title, tag, content, category])) {
    return res.status(400).json('입력이 올바르지 않습니다.');
  }

  if (
    !(validation.isLength(title, 1, 100) && validation.isLength(tag, 1, 100))
  ) {
    return res.status(400).json('입력이 올바르지 않습니다.');
  }

  if (!validation.checkTag(tag)) {
    return res.status(400).json('입력이 올바르지 않습니다.');
  }

  try {
    let result = await postDB.creatPost(req.body);
    return res.status(201).json(result);
  } catch (e) {
    return next(e);
  }
};

createSubPost = async (req, res, next) => {
  let { title, content } = req.body;
  let id = req.params.id;

  if (!validation.arrayElementIsString([title, content])) {
    return res.status(400).json('입력이 올바르지 않습니다.');
  }

  if (!validation.isLength(title, 1, 100)) {
    return res.status(400).json('입력이 올바르지 않습니다.');
  }

  try {
    let result = await subPostDB.create(id, req.body);
    return res.status(201).json(result);
  } catch (e) {
    return next(e);
  }
};

list = async (req, res, next) => {
  let postList, totalCnt, pagingInfo;
  let hotPost, hotSubPost;

  try {
    totalCnt = await postDB.totalCount();
    hotPost = await postDB.findHotPost();
    hotSubPost = await subPostDB.findHotPost();
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

  if (req.session.isLogin)
    return res.render('team/postsList', {
      postList,
      pagingInfo,
      hotPost,
      hotSubPost,
    });

  return res.render('noauth/postsList', {
    postList,
    pagingInfo,
    hotPost,
    hotSubPost,
  });
};

show = async (req, res, next) => {
  const id = req.params.id;
  let post, subPost;
  try {
    post = await postDB.postFindById(id);
    if (!post) return next();
    subPost = await subPostDB.findByPostNo(id);
    post.updateAttributes({ count: post.dataValues.count + 1 });
  } catch (e) {
    next(e);
  }

  if (req.session.isLogin)
    return res.render('team/postsRead', { post, subPost });
  return res.render('noauth/postsRead', { post, subPost });
};

showSubPost = async (req, res, next) => {
  const { id, subId } = req.params;
  let post, subPost;
  try {
    post = await subPostDB.findDetailByPostNo(subId);
    if (!post) return next();
    post.updateAttributes({ count: post.dataValues.count + 1 });
    subPost = await subPostDB.findByPostNo(id);
  } catch (e) {
    next(e);
  }
  return res.render('noauth/subPostRead', { post, subPost, home: id });
};

updateView = async (req, res, next) => {
  const { id } = req.params;
  let post;
  console.log(id);
  try {
    post = await postDB.findById(id);
    if (!post) return next();
  } catch (e) {
    next(e);
  }
  return res.render('team/postsUpdate', { post });
};

update = async (req, res, next) => {
  let { id } = req.params;
  let { title, tag, content, category } = req.body;

  if (!validation.arrayElementIsString([title, tag, content, category])) {
    return res.status(400).json('입력이 올바르지 않습니다.');
  }

  if (
    !(validation.isLength(title, 1, 100) && validation.isLength(tag, 1, 100))
  ) {
    return res.status(400).json('입력이 올바르지 않습니다.');
  }

  if (!validation.checkTag(tag)) {
    return res.status(400).json('입력이 올바르지 않습니다.');
  }

  let result,
    updateVal = { title, tag, content, category_no: category };
  try {
    result = await postDB.findById(id);
    if (!result) return next();
    result = await result.update(updateVal);
  } catch (e) {
    return next(e);
  }
  return res.status(204).end();
};

remove = (req, res, next) => {
  return res.send('');
};

uploadImage = (req, res, next) => {
  return res.send(req.files[0].filename);
};

module.exports = {
  createView,
  createSubView,
  create,
  createSubPost,
  list,
  show,
  showSubPost,
  updateView,
  update,
  remove,
  uploadImage,
};
