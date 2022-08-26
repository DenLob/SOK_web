const sequelize = require('../db')
const {DataTypes} = require('sequelize')

const User = sequelize.define('user',{
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    login: {type: DataTypes.STRING, unique: true},
    password: {type: DataTypes.STRING}
})

const Photo = sequelize.define('photo',{
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, allowNull: false},
    path: {type: DataTypes.STRING, unique: true, allowNull: false}
})

const Bbox = sequelize.define('bbox',{
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    coordinates: {type: DataTypes.STRING, allowNull: false},
    recognition_percent: {type: DataTypes.INTEGER}
})

const ProductClass = sequelize.define('product_class',{
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, allowNull: false}
})

// const Product = sequelize.define('product',{
//     id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
//     name: {type: DataTypes.STRING, allowNull: false}
// })

User.hasMany(Photo,{as: 'photo'})
Photo.belongsTo(User, {as: 'user'})
//
// Product.hasMany(Photo,{as: 'photo'})
// Photo.belongsTo(Product, {as: 'product'})

Photo.hasMany(Bbox,{as: 'bboxes'})
Bbox.belongsTo(Photo,{as: 'photo'})

ProductClass.hasMany(Bbox,{as: 'bboxes'})
Bbox.belongsTo(ProductClass,{as: 'product_class'})

module.exports = {
    User,
    Photo,
    Bbox,
    ProductClass
}