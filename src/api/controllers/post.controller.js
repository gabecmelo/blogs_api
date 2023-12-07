const mapStatusHttp = require('../../utils/mapStatusHttp');
const { PostService, PostServiceFinders } = require('../services');

const insert = async (req, res) => {
  const newPost = req.body;
  const { id } = req.user;
  const { status, data } = await PostService.insert(newPost, id);
  return res.status(mapStatusHttp(status)).json(data);
};

const getAll = async (_req, res) => {
  const { status, data } = await PostServiceFinders.getAll();
  return res.status(mapStatusHttp(status)).json(data);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const { status, data } = await PostServiceFinders.getById(id);
  return res.status(mapStatusHttp(status)).json(data);
};

const update = async (req, res) => {
  const updatedPostData = req.body;
  const { id } = req.params;
  const userId = req.user.id;

  const { status, data } = await PostService.update(updatedPostData, id, userId);
  return res.status(mapStatusHttp(status)).json(data);
};

module.exports = {
  insert,
  getAll,
  getById,
  update,
};
