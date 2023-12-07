const { Op } = require('sequelize');
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

const BlogOptionsQueryWithTerms = (query) => {
  const formattedQuery = `%${query}%`;
  const { include } = BlogOptionsQuery;
  return {
    where: {
      [Op.or]: [
        { title: { [Op.like]: formattedQuery } },
        { content: { [Op.like]: formattedQuery } },
      ],
    },
    include,
  };
};

module.exports = {
  BlogOptionsQuery,
  BlogOptionsQueryWithTerms,
};
