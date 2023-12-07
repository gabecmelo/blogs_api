const httpStatusHelper = require('./utils/httpStatusHelper');
const { postValidations } = require('./validations');
const CategoryService = require('./category.service');
const PostCategoryService = require('./post.categories.service');
const { BlogPost, User, Category } = require('../../models');
const sequelize = require('./utils/sequelize');
const { createBlogPost } = require('./utils/createQuerys');

const insert = async ({ title, content, categoryIds }, userId) => {
  const error = postValidations.validateNewPostData({ title, content, categoryIds });
  if (error) return { status: error.status, data: error.data };
  const categoriesResult = await CategoryService.getAllByIds(categoryIds);
  if (categoriesResult.status === httpStatusHelper.BAD_REQUEST) {
    return { status: categoriesResult.status, data: categoriesResult.data };
  }
  const transactionResult = await sequelize.transaction(async (t) => {
    const newPost = await createBlogPost(title, content, userId, t);
    await PostCategoryService.insert(newPost.id, categoryIds, t);
    return newPost;
  });
  if (!transactionResult) {
    return { 
      status: httpStatusHelper.BAD_REQUEST, 
      data: { message: 'one or more "categoryIds" not found' }, 
    };
  }
  return { status: httpStatusHelper.CREATED, data: transactionResult };
};

const getAll = async () => {
  const posts = await BlogPost.findAll({
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      {
        model: Category,
        as: 'categories',
        attributes: ['id', 'name'],
        through: { attributes: [] },
      },
    ],
  });
  return { status: httpStatusHelper.SUCCESSFUL, data: posts };
};

module.exports = {
  insert,
  getAll,
};
