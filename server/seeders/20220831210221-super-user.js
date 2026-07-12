"use strict";
require("dotenv").config();
const uuidv4 = require("uuid").v4;
const { hashSync } = require("bcryptjs");
const email = process.env.SUPERADMIN_EMAIL;

module.exports = {
  async up(queryInterface, Sequelize) {
    const existing = await queryInterface.rawSelect(
      "Admins",
      { where: { email }, limit: 1 },
      ["id"]
    );

    if (existing) {
      return;
    }

    const id = require("uuid").v4();
    const hash = require("bcryptjs").hashSync(process.env.SUPERADMIN_PASSWORD, 8);
    const date = new Date();

    await queryInterface.bulkInsert("Admins", [
      {
        id,
        firstName: "Super",
        lastName: "Admin",
        email,
        phone: "01234567890",
        password: hash,
        address: "7 Asajon Way Sangotedo",
        createdAt: date,
        updatedAt: date,
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Admins", { email }, {});
  },
};
