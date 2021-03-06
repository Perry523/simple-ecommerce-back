"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class OrderSchema extends Schema {
  up() {
    this.create("orders", (table) => {
      table.increments();
      table.integer("user_id").unsigned().references("id").inTable("users");
      table
        .integer("endereco_id")
        .unsigned()
        .references("id")
        .inTable("enderecos");
      table.timestamps();
    });
  }

  down() {
    this.drop("orders");
  }
}

module.exports = OrderSchema;
