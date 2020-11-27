"use strict";
const Endereco = use("App/models/Endereco");

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with enderecos
 */
class EnderecoController {
  /**
   * Show a list of all enderecos.
   * GET enderecos
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({ request, response, view, auth }) {
    const user = await auth.getUser();
    const enderecos = Endereco.query().where("user_id", "=", user.id).fetch();
    return enderecos;
  }

  /**
   * Render a form to be used for creating a new endereco.
   * GET enderecos/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create({ request, response, view }) {}

  /**
   * Create/save a new endereco.
   * POST enderecos
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response, auth }) {
    let endereco = new Endereco();
    const user = await auth.getUser();
    endereco.user_id = user.id;
    const adressData = request.only([
      "cep",
      "logradouro",
      "bairro",
      "numero",
      "localidade",
      "uf",
      "complemento",
      "nome"
    ]);
    endereco = Object.assign(endereco, adressData);
    endereco.save();
    return endereco;
  }

  /**
   * Display a single endereco.
   * GET enderecos/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params, request, response, view }) {}

  /**
   * Render a form to update an existing endereco.
   * GET enderecos/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit({ params, request, response, view }) {}

  /**
   * Update endereco details.
   * PUT or PATCH enderecos/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, response }) {}

  /**
   * Delete a endereco with id.
   * DELETE enderecos/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, request, response }) {}
}

module.exports = EnderecoController;
