'use strict'

const Restaurant = use('App/Models/Restaurant')
const moment = require('moment-timezone')
const Config = use('Config')
const momentTz = moment().tz(Config.get('app.locales.timezone'))
const Cache = use('Cache')

class Service {
  async winnersOfWeek() {
    return await Cache.remember('winnersOfWeek', 1, async () => {
      let days = momentTz.clone().diff(momentTz.clone().startOf('week'), 'days');
      let arrayDays = new Array(days);

      let result = [];

      for (let i = 0; i < arrayDays.length; i++) {
        let day = momentTz.clone().startOf('week').add((i), 'days')
        let res = await Restaurant
          .query()
          .where('restaurants.created_at', '>=', day.clone().startOf('day').format('YYYY-MM-DD HH:mm:ss'))
          .where('restaurants.created_at', '<=', day.clone().endOf('day').format('YYYY-MM-DD HH:mm:ss'))
          .innerJoin('person_restaurants', function () {
            this.on('person_restaurants.restaurant_id', 'restaurants.id')
          })
          .select('restaurant_id')
          .count('person_id as total')
          .groupBy('restaurant_id')
          .orderByRaw('total desc')
          .first()

        result.push({
          day: day.clone().format('DD/MM/YYYY'),
          result: res ? res : null
        })
      }

      return result;
    })
  }
}

module.exports = Service
