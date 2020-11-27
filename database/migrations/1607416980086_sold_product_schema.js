'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class SoldProductSchema extends Schema {
  up () {
    this.create('sold_products', (table) => {
      table.increments()
      table.integer('order_id').unsigned().references('id').inTable('orders')
      table.integer('product_id').unsigned().references('id').inTable('products')
      table.string('variant')
      table.integer('quantity')
      table.integer('price')
      table.integer('discount')
      table.timestamps()
    })
  }

  down () {
    this.drop('sold_products')
  }
}

module.exports = SoldProductSchema
