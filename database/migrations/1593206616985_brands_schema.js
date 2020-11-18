'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class BrandsSchema extends Schema {
  up () {
    this.create('brands', (table) => {
      table.string('brand').notNullable().unique()
      table.timestamps()

    })
  }

  down () {
    this.drop('brands')
  }
}

module.exports = BrandsSchema
