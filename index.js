require("dotenv").config();
const express = require("express");
const Sequelize = require("sequelize");
let sequelize = null;
const app = express();

app.get("/", (req, res) => {
    res.send("hello it's working ")
})

async function ConnectToPostgres() {
    let sequelize = new Sequelize("sequelizeInDepth", "postgres", process.env.PASSWORD, {
        host: "localhost",
        // port: 5432,
        dialect: "postgres"
    }

    )
    sequelize.authenticate().then(() => console.log("connected to posgresql"))
        .catch(e => {
            console.log(e.message);
            process.exit(0);
        })
    return sequelize;
}
async function test() {
    try {
        let connected = await ConnectToPostgres();
        return connected;

    }
    catch (e) {
        console.log("something went wrong");
    }
}

app.listen(process.env.PORT || 4500, async () => {
    sequelize = await test();
    console.log("working")


})