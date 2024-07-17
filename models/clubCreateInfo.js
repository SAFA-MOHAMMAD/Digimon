module.exports = (sequelize, DataTypes) => {
  const Club = sequelize.define(
    "clubCreateInfo",
    {
      clubID: {
        type: DataTypes.INTEGER,

        primaryKey: true,
        autoIncrement: true,
      },
      clubName: {
        type: DataTypes.STRING,
      },
      clubPresident: {
        type: DataTypes.STRING,
      },
      clubVicePresident: {
        type: DataTypes.STRING,
      },
      clubOfficialEmail: {
        type: DataTypes.STRING,

        unique: true,
      },
      clubPresidentEmail: {
        type: DataTypes.STRING,

        unique: true,
      },
      clubVicePresidentEmail: {
        type: DataTypes.STRING,

        unique: true,
      },
      clubDescription: {
        type: DataTypes.TEXT,
      },
      clubActivitiesInfo: {
        type: DataTypes.TEXT,
      },
      clubLogo: {
        type: DataTypes.STRING,
      },
    },
    {
      timestamps: false,
    }
  );
  return Club;
};
