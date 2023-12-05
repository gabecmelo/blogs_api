const { Category } = require('../../models');
const httpStatusHelper = require('./utils/httpStatusHelper');
const sequelize = require('./utils/sequelize');
const {
  validateCategoryInput,
} = require('./validations/validationInputValues');

const getByName = async (name) => {
  const category = await Category.findOne({ where: { name } });
  return { status: httpStatusHelper.SUCCESSFUL, data: category };
};

const insert = async (categoryData) => {
  const { name } = categoryData;
  const error = validateCategoryInput(categoryData);

  if (error) {
    return { status: error.status, data: error.data };
  }

  const transactionResult = await sequelize.transaction(async (t) => {
    const category = await Category.create({ name }, { transaction: t });
    return category;
  });

  return { status: httpStatusHelper.CREATED, data: transactionResult };
};

module.exports = {
  insert,
  getByName,
};
