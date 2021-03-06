'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CreateImagesSchema extends Schema {
  up () {
    this.create('images', (table) => {
      table.integer('product_id').unsigned().references('id').inTable('products')
      table.string('path')
      table.increments()
      table.timestamps()
    })
  }

  down () {
    this.drop('images')
  }
}

module.exports = CreateImagesSchema
