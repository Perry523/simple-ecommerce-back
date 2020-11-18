'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CriarProdutosSchema extends Schema {
  up() {
    this.create('products', (table) => {
      table.increments()
      table.string('link').notNullable().unique()
      table.string('name', 80).notNullable()
      table.string('brand').notNullable().references('name').inTable('brands')
      table
        .string('category')
        .notNullable()
        .references('name')
        .inTable('categories')
      table.integer('discount').notNullable()
      table.integer('price').notNullable()
      table.string('info').notNullable()
      table.timestamps()
    })
  }

  down() {
    this.drop('products')
  }
}

module.exports = CriarProdutosSchema
