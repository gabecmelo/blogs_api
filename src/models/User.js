module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      displayName: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'display_name',
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      image: {
        type: DataTypes.STRING,
      },
    },
    {
      modelName: 'User',
      tableName: 'users',
      timestamps: false,
      underscored: true,
    }
  );

  User.associate = (models) => {
    User.hasMany(models.BlogPost, {
      foreignKey: 'id',
      as: 'blog_posts',
    });
  };

  return User;
};
