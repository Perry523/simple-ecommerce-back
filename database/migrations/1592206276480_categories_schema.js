'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CategoriesSchema extends Schema {
  up () {
    this.create('categories', (table) => {
      table.increments()
      table.string('name').unique().notNullable()
      table.string('icon').unique().notNullable()
      table.timestamps()

    })
  }

  down () {
    this.drop('categories')
  }
}

module.exports = CategoriesSchema
