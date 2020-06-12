'use strict'

const Person =  use('App/Models/Person')
const { validate } = use('Validator')
const _ = require('lodash')

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with people
 */
class PersonController {
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
    response.json(await Person.all())
  }

  /**
   * Render a form to be used for creating a new person.
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
   * Create/save a new person.
   * POST people
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {
    const rules = {
      name: 'required|string|unique:person,name'
    }

    let inputs = request.all()

    const validation = await validate(inputs, rules)

    if (validation.fails()) {
      return response.status(500).json(validation.messages())
    }

    let person = await Person.create(inputs)

    return response.status(200).json(person)
  }

  /**
   * Display a single person.
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

    let person = await Person.find(params.id);

    if (! person) {
      return response.status(500).json({
        message: "This person doesn't exists!"
      });
    }

    response.json(person);
  }

  /**
   * Render a form to update an existing person.
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
   * Update person details.
   * PUT or PATCH people/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
    const rules = {
      id: 'required|number',
      name: 'required|string|unique:person,name'
    }

    let inputs = _.merge(params, request.all())

    const validation = await validate(inputs, rules)

    if (validation.fails()) {
      return response.status(500).json(validation.messages())
    }

    let person = await Person.find(params.id);

    if (! person) {
      return response.status(500).json({
        message: "This person doesn't exists!"
      });
    }

    person.name = params.name;

    person.save();

    response.json(person);
  }

  /**
   * Delete a person with id.
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

    let person = await Person.find(params.id);

    if (! person) {
      return response.status(500).json({
        message: "This person doesn't exists!"
      });
    }

    await person.delete();

    response.json(person);
  }
}

module.exports = PersonController
