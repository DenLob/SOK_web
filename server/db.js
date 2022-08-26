const {Sequelize} = require('sequelize')

module.exports = new Sequelize(
    process.env.PLATFORM_DB_NAME,
    process.env.PLATFORM_DB_USER,
    process.env.PLATFORM_DB_PASSWORD,
    {
        dialect: 'postgres',
        host: process.env.PLATFORM_DB_HOST,
        port: process.env.PLATFORM_DB_PORT
    }
)