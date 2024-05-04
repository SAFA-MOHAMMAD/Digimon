module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define(
    "postInfo",
    {
      postID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      clubName: {
        type: DataTypes.STRING,
      },
      postTitle: {
        type: DataTypes.STRING,
      },
      postDescription: {
        type: DataTypes.TEXT,
      },
      postImage: {
        type: DataTypes.STRING,
      },
      postDate: {
        type: DataTypes.DATEONLY,
      },
    },
    {
      timestamps: false,
    }
  );
  return Post;
};
