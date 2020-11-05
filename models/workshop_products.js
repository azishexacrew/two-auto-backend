const Sequelize = require('sequelize');
const Partner_workshop = require('../models/partner_workshop');
const Products = require('../models/products');
const db = require('../db');
const Workshop_products = db.define('m_workshop_products', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    createdAt: Sequelize.TIME,
    updatedAt: Sequelize.TIME
}, {
    paranoid: false,
    timestamps: true,
});


Products.belongsToMany(Partner_workshop, {
    through: Workshop_products,
    foreignKey: {
        name: 'workshop_id',
        uniqe: false,
    },
    uniqe: false,
    require: true
});

Partner_workshop.belongsToMany(Products, {
    through: Workshop_products,
    foreignKey: {
        name:  'products_id',
        uniqe: false,
    },
    uniqe: false,
    require: true
});

Workshop_products.sync();

module.exports = Workshop_products;