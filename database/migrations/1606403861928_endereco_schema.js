"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class EnderecoSchema extends Schema {
  up() {
    this.create("enderecos", (table) => {
      table.increments();
      table.integer("user_id").unsigned().references("id").inTable("users").notNullable();
      table.string("cep", 8).notNullable();
      table.string("logradouro").notNullable();
      table.string("bairro").notNullable();
      table.string("numero").notNullable();
      table.string("localidade").notNullable();
      table.string("uf").notNullable();
      table.string("complemento");
      table.string("nome");
      table.timestamps();
    });
  }

  down() {
    this.drop("enderecos");
  }
}

module.exports = EnderecoSchema;
