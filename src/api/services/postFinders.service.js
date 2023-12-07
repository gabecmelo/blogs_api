const httpStatusHelper = require('./utils/httpStatusHelper');
const { BlogOptionsQuery } = require('./utils/queriesOptions');
const { BlogPost } = require('../../models');

const getAll = async () => {
  const posts = await BlogPost.findAll(BlogOptionsQuery);
  return { status: httpStatusHelper.SUCCESSFUL, data: posts };
};

const getById = async (id) => {
  const post = await BlogPost.findByPk(id, BlogOptionsQuery);
  if (!post) {
    return {
      status: httpStatusHelper.NOT_FOUND,
      data: { message: 'Post does not exist' },
    };
  }
  return { status: httpStatusHelper.SUCCESSFUL, data: post };
};

module.exports = {
  getAll,
  getById,
};
