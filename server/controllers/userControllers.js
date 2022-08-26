const ApiError = require('../error/ApiError')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {User, Photo} = require('../models/models')

const generateJwt = (id, login) => {
    return jwt.sign(
        {id, login},
        process.env.SECRET_KEY,
        {expiresIn: '24h'}
    )
}
class UserControllers {
    async registration(req, res, next) {
        const {login, password} = req.body
        console.log(req.body)
        if (!login || !password) {
            return next(ApiError.badRequest('Некорректный логин или пароль'))
        }
        const candidate = await User.findOne({where: {login}})
        if (candidate) {
            return next(ApiError.badRequest('Пользователь с таким логином уже существует'))
        }
        const hashPassword = await bcrypt.hash(password, 5)
        const user = await User.create({login, password: hashPassword})
        const token = generateJwt(user.id, login)
        return res.json({token})
    }

    async login(req, res, next) {
        const {login, password}=req.body
        const user = await User.findOne({where: {login}})
        if(!user){
            return next(ApiError.internal('Пользователь с таким логином не найден'))
        }
        let comparePassword = bcrypt.compareSync(password, user.password)
        if(!comparePassword){
            return next(ApiError.badRequest('Неверный паоль'))
        }
        const token = generateJwt(user.id, login)
        return res.json({token})
    }

    async check(req, res, next) {
        const token = generateJwt(req.user.id, req.user.login)
        return res.json({token});
    }
}

module.exports = new UserControllers()