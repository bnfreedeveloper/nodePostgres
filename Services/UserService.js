const Models = require("../Models/models")
require("sequelize");

class UserService {
    constructor(sequelize) {
        Models(sequelize);
        this.client = sequelize;
        this.models = sequelize.models;
    }
    async createUser({ firstName, lastName, email, password }) {
        try {
            const user = await this.models.user.create({
                firstName,
                lastName,
                email,
                password
            })
            console.log(user)
            return user;
        }
        catch (e) {
            throw new Error(e)
        }
    }
    async getAllUsers() {
        try {
            return await this.models.user.findAll({})
        } catch (e) {
            throw new Error(e);
        }
    }
    async getUser(id) {
        try {
            return await this.models.user.findByPk(id);
        }
        catch (e) {
            throw new Error(e);
        }
    }
    async getSpecificInfos(infosObject) {
        let infos = Object.keys(infosObject);
        return await this.models.user.findAll({
            attributes: [...infos]
        });
    }
    async deleteUser(id) {
        return await this.models.user.destroy({ where: { id: id } })
    }
}

module.exports = UserService;