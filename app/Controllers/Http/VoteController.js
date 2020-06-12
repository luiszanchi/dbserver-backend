'use strict'

const Person = use('App/Models/Person')
const Service = use('App/Service/Service')
const PersonRestaurant = use('App/Models/PersonRestaurant')
const Restaurant = use('App/Models/Restaurant')
const VoteConfig = use('App/Models/VoteConfig')
const moment = require('moment-timezone')
const Config = use('Config')
const momentTz = moment().tz(Config.get('app.locales.timezone'))
const Cache = use('Cache')
const _ = require('lodash')

class VoteController {

  async index ({ response }) {
    let personsId = await PersonRestaurant.query()
      .select('person_id')
      .where('created_at', '>=', momentTz.clone().startOf('day').format('YYYY-MM-DD HH:mm:ss'))
      .where('created_at', '<=', momentTz.clone().endOf('day').format('YYYY-MM-DD HH:mm:ss'))
      .fetch()

    personsId = JSON.parse(JSON.stringify(personsId))

    let winnersOfWeek = await (new Service()).winnersOfWeek();

    let restaurantIds = winnersOfWeek.filter((item) => !!item.result)
      .map((item) => item.result.restaurant_id)

    response.json({
      persons: await Person.query().whereNotIn('id', _.map(personsId, (item) => item.person_id)).fetch(),
      restaurants: await Restaurant.query().whereNotIn('id', restaurantIds).fetch()
    })
  }

  /**
   * Show a list of restaurants votes in desc
   * GET votes of day
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async votesOfDay ({ request, response, view }) {
    let personRestaurant = Restaurant
      .query()
      .where('restaurants.created_at', '>=', momentTz.clone().startOf('day').format('YYYY-MM-DD HH:mm:ss'))
      .where('restaurants.created_at', '<=', momentTz.clone().endOf('day').format('YYYY-MM-DD HH:mm:ss'))
      .innerJoin('person_restaurants', function() {
        this.on('person_restaurants.restaurant_id', 'restaurants.id');
      })
      .select('restaurants.name')
      .count('person_id as total')
      .groupBy('restaurants.name')
      .orderByRaw('total desc')

    response.json(await personRestaurant)
  }
  /**
   * Make a restaurant vote
   * POST vote
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async vote ({ request, response, view }) {

    let startVote = await VoteConfig.query().where('name', 'vote-time-start').first()
    let arrayStartVote = startVote.value.split(':')

    let endVote = await VoteConfig.query().where('name', 'vote-time-end').first()
    let arrayEndVote = endVote.value.split(':')

    let today = momentTz.clone()

    let startHourVote = today.clone().hours(arrayStartVote[0]).minutes(arrayStartVote[1])

    let endHourVote = today.clone().hours(arrayEndVote[0]).minutes(arrayEndVote[1])

    if ((! momentTz.isSameOrAfter(startHourVote)) || (! momentTz.isSameOrBefore(endHourVote))) {
      return response.status(500).json({
        message: 'Is not vote time of today!'
      });
    }

    let inputs = request.all();

    let ifPersonIsVoted = await PersonRestaurant.query()
      .where('person_id', inputs.person_id)
      .where('created_at', '>=', today.clone().startOf('day').format('YYYY-MM-DD HH:mm:ss'))
      .where('created_at', '<=', today.clone().endOf('day').format('YYYY-MM-DD HH:mm:ss'))
      .first()

    if (ifPersonIsVoted) {
      return response.status(500).json({
        message: 'This person voted today!'
      });
    }

    let winnersOfWeek = await (new Service()).winnersOfWeek();

    let restaurantIds = winnersOfWeek.filter((item) => !!item.result)
      .map((item) => item.result.restaurant_id)

    if (restaurantIds.indexOf(inputs.restaurant_id) > -1) {
      return response.status(500).json({
        message: 'This restaurant won this week!'
      });
    }

    let voted = await PersonRestaurant.create(inputs);

    response.json({
      voted: !!voted
    });
  }
}

module.exports = VoteController
