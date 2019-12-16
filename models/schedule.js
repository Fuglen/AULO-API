"use strict";
const Sequelize = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    const schedule = sequelize.define(
        "schedule",
        {
            team: {
                type: Sequelize.STRING,
                primaryKey: true,
                allowNull: false
            },
            class: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            /*             fromDate: {
                            type: Sequelize.STRING,
                            allowNull: false
                        },
                        toDate: {
                            type: Sequelize.STRING,
                            allowNull: false
                        }, */
            monday: {
                type: Sequelize.TEXT,
                allowNull: false
            },
            tuesday: {
                type: Sequelize.TEXT,
                allowNull: false
            },
            wednesday: {
                type: Sequelize.TEXT,
                allowNull: false
            },
            thursday: {
                type: Sequelize.TEXT,
                allowNull: false
            },
            friday: {
                type: Sequelize.TEXT,
                allowNull: false
            }
        },
        {
            timestamps: false,
            freezeTableName: true
        }
    );
    schedule.associate = function (models) {
        // associations can be defined here
    };
    return schedule;
};