'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CreateVariantsSchema extends Schema {
  up () {
    this.create('variants', (table) => {
      table.string('path')
      table.string('product_name').references('name').inTable('products')
      table.string('variant').notNullable()
      table.integer('stock')
      table.timestamps()
    })
  }

  down () {
    this.drop('variants')
  }
}

module.exports = CreateVariantsSchema
