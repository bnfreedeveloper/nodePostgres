require("dotenv").config();
const express = require("express");
const Sequelize = require("sequelize");
let sequelize;
const app = express();

function ConnectToPostgres() {
    let sequelize = new Sequelize("sequelizeInDepth", "postgres", process.env.PASSWORD, {
        host: "localhost",
        // port: 5432,
        dialect: "postgres"
    })
    sequelize.authenticate().then(() => console.log("connected to posgresql"))
        .catch(e => {
            console.log(e.message);
            process.exit(0);
        })
    return sequelize;
}

sequelize = ConnectToPostgres();

//router configuration

const UserRouter = require("./Routes/user");


app.use("/Users", UserRouter(sequelize));


//error handling middleware

app.use((err, req, res, next) => {
    res.status(500).send(err)
})



app.listen(process.env.PORT || 4500, async () => {
    console.log("working")
})