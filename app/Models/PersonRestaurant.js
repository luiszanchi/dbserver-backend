'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')
const moment = require('moment-timezone')
const Config = use('Config')
const momentTz = moment().tz(Config.get('app.locales.timezone'))

class PersonRestaurant extends Model {
  static boot () {
    super.boot()

    this.addHook('beforeCreate', async (instance) => {
      instance.created_at = momentTz.clone().format('YYYY-MM-DD HH:mm:ss')
    })
    this.addHook('beforeUpdate', async (instance) => {
      instance.updated_at = momentTz.clone().format('YYYY-MM-DD HH:mm:ss')
    })
  }
  static get table () {
    return 'person_restaurants'
  }
  person () {
    return this.belongsTo('App/Models/Person');
  }
  restaurant () {
    return this.belongsTo('App/Models/Restaurant');
  }
}

module.exports = PersonRestaurant
