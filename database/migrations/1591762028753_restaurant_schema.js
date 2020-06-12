'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class RestaurantSchema extends Schema {
  up () {
    this.create('restaurants', (table) => {
      table.increments()
      table.string('name')
      table.timestamps()
      table.datetime('deleted_at')
    })
  }

  down () {
    this.drop('restaurants')
  }
}

module.exports = RestaurantSchema
