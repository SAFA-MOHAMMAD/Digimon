//add your config info
module.exports = {
    HOST: "localhost",
    USER: "EA",
    PASSWORD: "EAuskudar2002",
    DB: "spm",
    dialect: "mysql", // Make sure this matches your database type, mysql in this case
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  };
  