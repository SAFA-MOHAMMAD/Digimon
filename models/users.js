module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("users", {
      userId: {
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true,
      },
      userEmail: {
          type: DataTypes.STRING,
          unique: true,
      },
      userPassword: {
          type: DataTypes.STRING,
      },
      userImage: {
          type: DataTypes.STRING,
          allowNull: true,
      },
      refreshToken: {
          type: DataTypes.STRING,
          allowNull: true,
      },
  }, {
      timestamps: false,
  });

  return User;
};
