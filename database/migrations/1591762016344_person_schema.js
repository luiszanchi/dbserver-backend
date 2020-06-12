'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PersonSchema extends Schema {
  up () {
    this.create('person', (table) => {
      table.increments()
      table.string('name')
      table.timestamps()
      table.datetime('deleted_at')
    })
  }

  down () {
    this.drop('person')
  }
}

module.exports = PersonSchema
