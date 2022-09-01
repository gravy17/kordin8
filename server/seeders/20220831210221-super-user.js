"use strict";
require("dotenv").config();
const uuidv4 = require("uuid").v4;
const { hashSync } = require("bcryptjs");
const id = uuidv4();
const hash = hashSync(process.env.SUPERADMIN_PASSWORD, 8);
const email = process.env.SUPERADMIN_EMAIL;
const date = new Date();

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Admins", [
      {
        id: id,
        firstName: "Superadmin",
        lastName: "Kordin8",
        email: email,
        phone: "01234567890",
        password: hash,
        address: "7 Asajon Way Sangotedo",
        createdAt: date,
        updatedAt: date
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Admins", null, {});
  }
};
