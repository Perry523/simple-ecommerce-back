'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CriarProdutosSchema extends Schema {
  up () {
    this.create('products', (table) => {
      table.string('name', 80).notNullable().unique()
      table.string('brand').notNullable().references('brand').inTable('brands')
      table.string('category').notNullable().references('category').inTable('categories')
      table.integer('discount').notNullable()
      table.integer('price').notNullable()
      table.string('info').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('products')
  }
}

module.exports = CriarProdutosSchema
