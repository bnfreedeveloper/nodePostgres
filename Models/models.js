const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    const User = sequelize.define("user", {
        firstName: {
            type: DataTypes.STRING,
            allowNull: true,


        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: true,


        }
    });
    sequelize.sync();
}