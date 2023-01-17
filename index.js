require("dotenv").config();
const express = require("express");
const formidable = require("express-formidable")
const Sequelize = require("sequelize");
let sequelize;
const app = express();
//get form-data encoded data useful for binary data file or whataver format
//like json , url encoded but if put no need of the other middlewares
//for parsing content and body is replace by fields
// app.use(formidable());

//general middlewares for handling parsing body request
app.use(express.json());
//got x-www-form-urlencoded endode data
app.use(express.urlencoded({ extended: true }))





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