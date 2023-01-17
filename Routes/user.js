const express = require("express");
const router = express.Router();

const UserService = require("../Services/UserService");
module.exports = (sequelize) => {
    const userMangement = new UserService(sequelize);
    router.get("/", async (req, res, next) => {
        try {
            // const users = await userMangement.getUsers();
            // res.send(users)
            return next("error")
        }
        catch (err) {
            return next(err)
        }
    })

    router.get("/testFromUrl", (req, res, next) => {

        //if we use formidable, we use fields for every content-type
        // const { name, age } = req.fields;

        const { name, age } = req.body;
        res.status(200).send(name);



    })
    return router;
}