const express = require("express");
const router = express.Router();

const UserService = require("../Services/UserService");
module.exports = (sequelize) => {
    const userMangement = new UserService(sequelize);
    router.get("/", async (req, res) => {
        try {
            const users = await userMangement.getUsers();
            res.send(users)
        }
        catch (err) {
            return next(err)
        }
    })
    return router;
}