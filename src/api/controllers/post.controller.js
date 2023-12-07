const mapStatusHttp = require('../../utils/mapStatusHttp');
const { PostService } = require('../services');

const insert = async (req, res) => {
  const newPost = req.body;
  const { id } = req.user;
  const { status, data } = await PostService.insert(newPost, id);
  return res.status(mapStatusHttp(status)).json(data);
};

const getAll = async (_req, res) => {
  const { status, data } = await PostService.getAll();
  return res.status(mapStatusHttp(status)).json(data);
};

module.exports = {
  insert,
  getAll,
};
