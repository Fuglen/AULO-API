"use strict";
const Sequelize = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    const parents = sequelize.define(
        "parents",
        {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                allowNull: false
            },
            fullname: {
                type: Sequelize.STRING,
                allowNull: false
            },
            username: {
                type: Sequelize.STRING,
                allowNull: false
            },
            pw: {
                type: Sequelize.STRING,
                allowNull: false
            },
            team: {
                type: Sequelize.STRING,
                allowNull: false
            },
            phone: {
                type: Sequelize.STRING,
                allowNull: false
            },
            adress: {
                type: Sequelize.STRING,
                allowNull: false
            },
            child: {
                type: Sequelize.STRING,
                allowNull: false
            }
        },
        {
            timestamps: false,
            freezeTableName: true
        }
    );
    parents.associate = function (models) {
        // associations can be defined here
    };
    return parents;
};