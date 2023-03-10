const express = require("express");
const router = express.Router();

//to notice
// when we stringify the response , sequelize will get us only the
//object datavalues, not the rest coz they are all functions

const UserService = require("../Services/UserService");
module.exports = (sequelize) => {
    const userManagement = new UserService(sequelize);
    router.get("/", async (req, res, next) => {
        try {
            const users = await userManagement.getAllUsers();
            res.status(200).json(users);
        }
        catch (err) {
            return next(err)
        }
    })
    //find by id
    router.get("/:id", async (req, res, next) => {
        try {
            const user = await userManagement.getUser(req.params.id);
            if (user == null) return res.status(200).send("no user found for this id")
            res.status(200).json(user);
        } catch (e) {
            return next(e);
        }
    })

    //creation
    router.post("/", async (req, res, next) => {
        try {
            const user = await userManagement.createUser(req.body);
            res.status(201).json(user);
        }
        catch (e) {
            next(e)
        }
    })
    router.get("/testFromUrl", (req, res, next) => {

        //if we use formidable, we use fields for every content-type
        // const { name, age } = req.fields;

        const { name, age } = req.body;
        res.status(200).send(name);
    })

    // get infos with only some specific attribute
    router.get("/specific/infos", async (req, res, next) => {
        const infos = req.body;
        //we take care of all attibutes of the models, so the client will send everything
        const infosRequested = Object.entries(infos).filter(([x, value]) => value == true);
        const objectInfosReq = Object.fromEntries(infosRequested);
        try {
            const result = await userManagement.getSpecificInfos(objectInfosReq);
            return res.status(200).json(result);
        }
        catch (e) {
            return next(e.message)
        }
    })
    //delete user
    router.delete("/:id", async (req, res, next) => {
        try {
            await userManagement.deleteUser(req.params.id);
            res.status(200).redirect("/users")
        }
        catch (e) {
            return next(e.message)
        }
    })


    return router;
}