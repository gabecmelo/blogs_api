const httpStatusHelper = require('../utils/httpStatusHelper');
const { newPostSchema, updatedPostSchema } = require('./schemas');

const validateNewPostData = (postData) => {
  const { error } = newPostSchema.validate(postData);
  if (error) {
    return {
      status: httpStatusHelper.BAD_REQUEST,
      data: { message: 'Some required fields are missing' },
    };
  }
};

const validateUpdateData = (updatedPostData) => {
  const { error } = updatedPostSchema.validate(updatedPostData);
  if (error) {
    return {
      status: httpStatusHelper.BAD_REQUEST,
      data: { message: 'Some required fields are missing' },
    };
  }
};

module.exports = {
  validateNewPostData,
  validateUpdateData,
};
