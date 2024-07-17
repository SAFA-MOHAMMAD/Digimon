module.exports = (sequelize, DataTypes) => {
  const ClubEvent = sequelize.define(
    "clubEventInfo",
    {
      idclubEvent: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      clubName: {
        type: DataTypes.STRING,
      },
      eventType: {
        type: DataTypes.STRING,
      },
      eventName: {
        type: DataTypes.STRING,
      },
      eventDate: {
        type: DataTypes.DATEONLY,
      },
      eventSpeaker: {
        type: DataTypes.STRING,
      },
      eventContent: {
        type: DataTypes.STRING,
      },
      eventPlace: {
        type: DataTypes.STRING,
      },
      eventSpecialService: {
        type: DataTypes.STRING,
      },
      eventImage: {
        type: DataTypes.STRING,
      },
      eventTime: {
        type: DataTypes.TIME,
      },
      eventApproval: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      timestamps: false,
      defaultScope: {
        order: [['eventDate', 'ASC']], // Default sorting order by eventDate column in ascending order
      }
    }
  );

  return ClubEvent;
};
