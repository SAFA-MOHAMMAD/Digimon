module.exports={
    HOST:'localhost',
    USER:'root',
    PASSWORD:'hamzah4747',
    DB:'node_digimon',
    dialect: 'mysql',
    pool:{
        max:5,
        min:0,
        acquire: 30000,
        idle: 10000
    }
}