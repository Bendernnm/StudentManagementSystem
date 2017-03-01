module.exports = function savePost(req, res, next) {
    req.body.post = req.params.id;
    next();
};