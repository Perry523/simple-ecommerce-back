"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class PedidoSchema extends Schema {
  up() {
    this.create("pedidos", (table) => {
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
    this.drop("pedidos");
  }
}

module.exports = PedidoSchema;
