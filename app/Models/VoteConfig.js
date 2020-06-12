'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')
const moment = require('moment-timezone')
const Config = use('Config')
const momentTz = moment().tz(Config.get('app.locales.timezone'))

class VoteConfig extends Model {
  static boot () {
    super.boot()

    this.addHook('beforeCreate', async (instance) => {
      instance.created_at = momentTz.clone().format('YYYY-MM-DD HH:mm:ss')
    })
    this.addHook('beforeUpdate', async (instance) => {
      instance.updated_at = momentTz.clone().format('YYYY-MM-DD HH:mm:ss')
    })
  }
}

module.exports = VoteConfig
