'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PersonRestaurantSchema extends Schema {
  up () {
    this.create('person_restaurants', (table) => {
      table.increments()
      table.integer('person_id').unsigned().references('id').inTable('person')
      table.integer('restaurant_id').unsigned().references('id').inTable('restaurants')
      table.timestamps()
    })
  }

  down () {
    this.drop('person_restaurants')
  }
}

module.exports = PersonRestaurantSchema
