const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    const User = sequelize.define("user", {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        firstName: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: "jean"

        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: true
        }

    }, {
        tableName: "employees",
        timestamp: true,
        createdAt: false,
        updatedAt: "lastUpdate"
    });
    sequelize.sync({ alter: true });
}