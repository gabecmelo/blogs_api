const httpHelper = require('./utils/httpStatusHelper');
const { postValidations } = require('./validations');
const CategoryService = require('./category.service');
const PostCategoryService = require('./post.categories.service');
const sequelize = require('./utils/sequelize');
const { createBlogPost } = require('./utils/queries/createQueries');
const { validateUpdateData } = require('./validations/post.validations');
const { getById } = require('./postFinders.service');
const { validateAuthorizedUser } = require('./validations/user.validations');

const insert = async ({ title, content, categoryIds }, userId) => {
  const error = postValidations.validateNewPostData({ title, content, categoryIds });
  if (error) return { status: error.status, data: error.data };
  const categoriesResult = await CategoryService.getAllByIds(categoryIds);
  if (categoriesResult.status === httpHelper.BAD_REQUEST) {
    return { status: categoriesResult.status, data: categoriesResult.data };
  }
  const transactionResult = await sequelize.transaction(async (t) => {
    const newPost = await createBlogPost(title, content, userId, t);
    await PostCategoryService.insert(newPost.id, categoryIds, t);
    return newPost;
  });
  if (!transactionResult) {
    return { 
      status: httpHelper.BAD_REQUEST, data: { message: 'one or more "categoryIds" not found' }, 
    };
  }
  return { status: httpHelper.CREATED, data: transactionResult };
};

const update = async (updatedPostData, postId, userId) => {
  const error = validateUpdateData(updatedPostData);
  if (error) return { status: error.status, data: error.data };
  const { status, data } = await getById(postId);
  if (status === httpHelper.NOT_FOUND) return { status, data };
  const { id } = data.user;
  const { authorizedUser, authorizedMessage } = validateAuthorizedUser(id, userId);
  if (authorizedUser === 'UNAUTHORIZED') return { status: authorizedUser, data: authorizedMessage };
  const { title, content } = updatedPostData;
  const updated = new Date();
  await data.update({ title, content, updated });
  await data.save();
  return { status: httpHelper.SUCCESSFUL, data };
};

const exclude = async (postId, userId) => {
  const { status, data } = await getById(postId);
  if (status === httpHelper.NOT_FOUND) return { status, data };
  const { id } = data.user;
  const { authorizedUser, authorizedMessage } = validateAuthorizedUser(id, userId);
  if (authorizedUser === 'UNAUTHORIZED') return { status: authorizedUser, data: authorizedMessage };
  await data.destroy();
  return { status: httpHelper.NO_CONTENT };
};

module.exports = {
  insert,
  update,
  exclude,
};
