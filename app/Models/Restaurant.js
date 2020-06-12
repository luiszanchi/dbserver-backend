'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')
const Service = use('App/Service/Service')
const moment = require('moment-timezone')
const Config = use('Config')
const momentTz = moment().tz(Config.get('app.locales.timezone'))

class Restaurant extends Model {
  static boot () {
    super.boot()

    this.addTrait('@provider:Lucid/SoftDeletes')
    this.addHook('beforeCreate', async (instance) => {
      instance.created_at = momentTz.clone().format('YYYY-MM-DD HH:mm:ss')
    })
    this.addHook('beforeUpdate', async (instance) => {
      instance.updated_at = momentTz.clone().format('YYYY-MM-DD HH:mm:ss')
    })
  }

  static get table () {
    return 'restaurants'
  }

  personRestaurant () {
    return this.hasMany('App/Models/PersonRestaurant');
  }
}

module.exports = Restaurant
