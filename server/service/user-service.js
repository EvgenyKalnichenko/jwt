const UserModel = require('../models/user-model');
const UserDto = require('../dtos/user-dto');
const bcrypt = require('bcrypt');
const uuid = require('uuid');
const mailService = require('./mail-service');
const tokenService = require('./token-service');

class UserService {
    async registration(email, password) {
        // проверка есть ли позльзователь в базе данных
        const candidate = await UserModel.findOne({email})
        if (candidate) {
            throw new Error(`Пользователь с почтовым адресом ${email} уже существует`)
        }
        // хешируем пароль
        const hashPassword = await bcrypt.hash(password, 3)
        const activationLink = uuid.v4();
        // добавляем в базу данных
        const user = await UserModel.create({email, password: hashPassword, activationLink});
        await mailService.sandActivationMail(email, activationLink);
        // отправляем письмо для активации
        const userDto = new UserDto(user); //id, email, isActivated
        // генерируем токены
        const tokens = tokenService.generateTokens({...userDto});
        await tokenService.saveToken(userDto.id, tokens.refreshToken);

        return {
            ...tokens,
            user: userDto
        }
    }
}

module.exports = new UserService();
