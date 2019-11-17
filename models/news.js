"use strict";
const Sequelize = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    const news = sequelize.define(
        "news",
        {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                allowNull: false
            },
            title: {
                type: Sequelize.STRING,
                allowNull: false
            },
            text: {
                type: Sequelize.TEXT,
                allowNull: false
            },
            author: {
                type: Sequelize.STRING,
                allowNull: false
            },
            date_created: {
                type: Sequelize.DATE,
                allowNull: false
            }
        },
        {
            timestamps: false,
            freezeTableName: true
        }
    );
    news.associate = function (models) {
        // associations can be defined here
    };
    return news;
};