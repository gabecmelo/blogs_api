const { BlogPost } = require('../../../../models');

const createBlogPost = async (title, content, userId, transaction) => {
  const now = new Date();
  const post = await BlogPost.create(
    { title, content, userId, published: now, updated: now },
    { transaction },
  );

  return post;
};

module.exports = {
  createBlogPost,
};
