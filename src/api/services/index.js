const LoginService = require('./login.service');
const UserService = require('./user.service');
const CategoryService = require('./category.service');
const PostService = require('./post.service');
const PostServiceFinders = require('./postFinders.service');
const postCategoryService = require('./post.service');

module.exports = {
  LoginService,
  UserService,
  CategoryService,
  PostService,
  PostServiceFinders,
  postCategoryService,
};
