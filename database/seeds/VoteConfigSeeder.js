'use strict'

/*
|--------------------------------------------------------------------------
| VoteConfigSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')
const Database = use('Database')
const Config = use('Config')
const moment = require('moment-timezone')

class VoteConfigSeeder {
  async run () {
    let now = moment().tz(Config.get('app.locales.timezone')).format('YYYY-MM-DD HH:mm:ss');
    await Database.table('vote_configs')
      .insert({
        name: 'vote-time-start',
        value: '07:00',
        created_at: now,
        updated_at: now
      });

    await Database.table('vote_configs')
      .insert({
        name: 'vote-time-end',
        value: '12:00',
        created_at: now,
        updated_at: now
      });
  }
}

module.exports = VoteConfigSeeder
