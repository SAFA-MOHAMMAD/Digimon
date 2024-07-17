module.exports = (sequelize, DataTypes) => {
    
    const Notification = sequelize.define
    ('Notification', {
        message: {
            type: DataTypes.STRING,
            allowNull: false
        },
        Title: {
            type: DataTypes.STRING,
        },
        Image: {
            type: DataTypes.STRING,
        },
        createdAt: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        }
    });
    return Notification ;
    };
