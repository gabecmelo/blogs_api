const { User, Category } = require('../../../models');

const BlogOptionsQuery = {
  include: [
    { model: User, as: 'user', attributes: { exclude: ['password'] } },
    {
      model: Category,
      as: 'categories',
      attributes: ['id', 'name'],
      through: { attributes: [] },
    },
  ],
};

module.exports = {
  BlogOptionsQuery,
};
