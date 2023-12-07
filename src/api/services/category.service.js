const { Category } = require('../../models');
const httpHelper = require('./utils/httpHelper');
const sequelize = require('./utils/sequelize');
const { categoryValidations } = require('./validations');

const getByName = async (name) => {
  const category = await Category.findOne({ where: { name } });
  return { status: httpHelper.SUCCESSFUL, data: category };
};

const insert = async (categoryData) => {
  const { name } = categoryData;
  const error = categoryValidations.validateCategoryInput(categoryData);
  if (error) {
    return { status: error.status, data: error.data };
  }
  const transactionResult = await sequelize.transaction(async (t) => {
    const category = await Category.create({ name }, { transaction: t });
    return category;
  });
  return { status: httpHelper.CREATED, data: transactionResult };
};

const getAll = async () => {
  const categories = await Category.findAll();
  if (!categories) {
    return {
      status: httpHelper.SUCCESSFUL,
      data: { message: 'There are no registered categories' },
    };
  }
  return { status: httpHelper.SUCCESSFUL, data: categories };
};

const getAllByIds = async (ids) => {
  const categories = await Promise.all(
    ids.map(async (id) => {
      const category = await Category.findByPk(id);
      if (!category || category === null) {
        return {
          status: httpHelper.BAD_REQUEST,
          data: { message: 'one or more "categoryIds" not found' },
        };
      }
      return category;
    }),
  );
  const error = categories.find((c) => c.status === httpHelper.BAD_REQUEST);
  if (error) return error;
  return { status: httpHelper.SUCCESSFUL, data: categories };
};

module.exports = {
  insert,
  getByName,
  getAll,
  getAllByIds,
};
