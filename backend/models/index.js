const dbConfig = require('../config/dbConfig.js');

const {Sequelize, DataTypes} = require('sequelize');

const sequelize = new Sequelize(
    dbConfig.DB,
    dbConfig.USER,
    dbConfig.PASSWORD, {
        host: dbConfig.HOST,
        dialect: dbConfig.dialect,
        operatorsAliases: false,

        
    }
)

sequelize.authenticate()
.then(() => {
    console.log('connected..')
})
.catch(err => {
    console.log('Error'+ err)
})

const db = {}

db.Sequelize = Sequelize
db.sequelize = sequelize

db.products = require('./clubEventInfo.js')(sequelize, DataTypes)
db.reviews = require('./postInfo.js')(sequelize, DataTypes)
db.reviews = require('./clubCreateInfo.js')(sequelize, DataTypes)
db.reviews = require('./users.js')(sequelize, DataTypes)

db.sequelize.sync({ force: false })
.then(() => {
    console.log('connected to db !!')
})







module.exports = db
