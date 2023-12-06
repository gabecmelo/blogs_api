const { PostCategory } = require('../../models');

const insert = async (postId, categoryIds, transaction) => {
  await Promise.all(
    categoryIds.map(async (categoryId) => {
      await PostCategory.create({ postId, categoryId }, { transaction });
    }),
  );
};

module.exports = {
  insert,
};
