const httpHelper = require('../utils/httpHelper');
const { categoryInputSchema } = require('./schemas');

const validateCategoryInput = (categoryData, existentCategory) => {
  const { error } = categoryInputSchema.validate(categoryData);
  if (error) {
    return {
      status: httpHelper.BAD_REQUEST,
      data: { message: error.message },
    };
  }
  // getByName e passar o data como esse parâmetro para que funcione, da problema no requisito
  if (existentCategory) {
    return {
      status: httpHelper.CONFLICT,
      data: { message: 'Category already registered', existentCategory },
    };
  }
};

module.exports = {
  validateCategoryInput,
};
