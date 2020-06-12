'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.on('/').render('welcome')

Route.resource('person', 'PersonController')
  .apiOnly()

Route.resource('restaurant', 'RestaurantController')
  .apiOnly()

Route.resource('vote-config', 'VoteConfigController')
  .apiOnly()

Route.get('/votes/of-day', 'VoteController.votesOfDay')
Route.post('/votes/vote', 'VoteController.vote')
Route.get('/votes', 'VoteController.index')
