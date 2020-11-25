'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CreateVariantsSchema extends Schema {
  up () {
    this.create('variants', (table) => {
      table.string('path')
      table.integer('product_id').unsigned().references('id').inTable('products')
      table.string('name').notNullable()
      table.integer('stock')
      table.timestamps()
    })
  }

  down () {
    this.drop('variants')
  }
}

module.exports = CreateVariantsSchema
