const { CategoryService } = require('../services');
const mapStatusHttp = require('../../utils/mapStatusHttp');

const insert = async (req, res) => {
  const categoryData = req.body;
  const { status, data } = await CategoryService.insert(categoryData);
  return res.status(mapStatusHttp(status)).json(data);
};

const getAll = async (_req, res) => {
  const { status, data } = await CategoryService.getAll();
  return res.status(mapStatusHttp(status)).json(data);
};

module.exports = {
  insert,
  getAll,
};
