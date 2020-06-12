'use strict'

const Restaurant = use('App/Models/Restaurant')
const { validate } = use('Validator')
const _ = require('lodash')

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with restaurants
 */
class RestaurantController {
  /**
   * Show a list of all people.
   * GET people
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {
    response.json(await Restaurant.all())
  }

  /**
   * Render a form to be used for creating a new restaurant.
   * GET people/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create ({ request, response, view }) {
  }

  /**
   * Create/save a new restaurant.
   * POST people
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {
    const rules = {
      name: 'required|string|unique:restaurants,name'
    }

    let inputs = request.all()

    const validation = await validate(inputs, rules)

    if (validation.fails()) {
      return response.status(500).json(validation.messages())
    }

    let restaurant = await Restaurant.create(inputs)

    return response.status(200).json(restaurant)
  }

  /**
   * Display a single restaurant.
   * GET people/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
    const rules = {
      id: 'required|number'
    }

    const validation = await validate(params, rules)

    if (validation.fails()) {
      return response.status(500).json(validation.messages())
    }

    let restaurant = await Restaurant.find(params.id);

    if (! restaurant) {
      return response.status(500).json({
        message: "This restaurant doesn't exists!"
      });
    }

    response.json(restaurant);
  }

  /**
   * Render a form to update an existing restaurant.
   * GET people/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit ({ params, request, response, view }) {
  }

  /**
   * Update restaurant details.
   * PUT or PATCH people/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
    const rules = {
      id: 'required|number',
      name: 'required|string|unique:restaurants,name'
    }

    let inputs = _.merge(params, request.all())

    const validation = await validate(inputs, rules)

    if (validation.fails()) {
      return response.status(500).json(validation.messages())
    }

    let restaurant = await Restaurant.find(params.id);

    if (! restaurant) {
      return response.status(500).json({
        message: "This restaurant doesn't exists!"
      });
    }

    restaurant.name = params.name;

    restaurant.save();

    response.json(restaurant);
  }

  /**
   * Delete a restaurant with id.
   * DELETE people/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
    const rules = {
      id: 'required|number'
    }

    const validation = await validate(params, rules)

    if (validation.fails()) {
      return response.status(500).json(validation.messages())
    }

    let restaurant = await Restaurant.find(params.id);

    if (! restaurant) {
      return response.status(500).json({
        message: "This restaurant doesn't exists!"
      });
    }

    await restaurant.delete();

    response.json(restaurant);
  }
}

module.exports = RestaurantController
