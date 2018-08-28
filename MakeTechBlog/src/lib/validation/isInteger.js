function paramIsINT(req, res, next) {
  let param = Object.values(req.params);
  for (let element of param) {
    element = parseInt(element);
    if (element > 0) {
      continue;
    }
    return res.status(400).render('error/badRequest');
  }
  console.log('통과');
  next();
}

module.exports = {
  paramIsINT,
};
