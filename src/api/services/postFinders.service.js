const httpHelper = require('./utils/httpHelper');
const { BlogOptionsQuery } = require('./utils/queriesOptions');
const { BlogPost } = require('../../models');

const getAll = async () => {
  const posts = await BlogPost.findAll(BlogOptionsQuery);
  return { status: httpHelper.SUCCESSFUL, data: posts };
};

const getById = async (id) => {
  const post = await BlogPost.findByPk(id, BlogOptionsQuery);
  if (!post) {
    return {
      status: httpHelper.NOT_FOUND,
      data: { message: 'Post does not exist' },
    };
  }
  return { status: httpHelper.SUCCESSFUL, data: post };
};

module.exports = {
  getAll,
  getById,
};
