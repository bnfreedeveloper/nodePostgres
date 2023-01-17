const Models = require("../Models/models")

class UserService {
    constructor(sequelize) {
        Models(sequelize);
        this.client = sequelize;
        this.models = sequelize.models;
    }
    async getUsers() {
        return "custom list of users"
    }
}

module.exports = UserService;