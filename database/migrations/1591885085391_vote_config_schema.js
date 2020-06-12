'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class VoteConfigSchema extends Schema {
  up () {
    this.create('vote_configs', (table) => {
      table.increments()
      table.string('name').unique()
      table.string('value')
      table.timestamps()
    })
  }

  down () {
    this.drop('vote_configs')
  }
}

module.exports = VoteConfigSchema
