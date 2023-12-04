module.exports = (sequelize, DataTypes) => {
  const PostCategory = sequelize.define(
    'PostCategory',
    {
      postId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'post_id',
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        references: {
          model: 'blog_posts',
          key: 'id',
        },
      },
      categoryId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'category_id',
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        references: {
          model: 'categories',
          key: 'id',
        },
      },
    },
    {
      modelName: 'PostCategory',
      tableName: 'posts_categories',
      timestamps: false,
      underscored: true,
    }
  );

  PostCategory.associate = (models) => {
    PostCategory.belongsToMany(models.BlogPost, {
      foreignKey: 'postId',
      as: 'post_id',
    });
    PostCategory.belongsToMany(models.Category, {
      foreignKey: 'categoryId',
      as: 'category_id',
    });
  };

  return PostCategory;
};
