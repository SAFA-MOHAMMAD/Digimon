module.exports={
    HOST:'localhost',
    USER:'EA',
    PASSWORD:'EAuskudar2002',
    DB:'node_digimon',
    dialect: 'mysql',
    pool:{
        max:5,
        min:0,
        acquire: 30000,
        idle: 10000
    }
}