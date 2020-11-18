"use strict";

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */
const Brand = use("App/models/Brand");
/**
 * Resourceful controller for interacting with brands
 */
class BrandController {
  /**
   * Show a list of all brands.
   * GET brands
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({ request, response, view }) {
    const brands = await Brand.all();
    return brands;
  }

  /**
   * Render a form to be used for creating a new brand.
   * GET brands/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create({ request, response, view }) {}

  /**
   * Create/save a new brand.
   * POST brands
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response }) {
    const brand = Brand.create(await request.only("name"));
    return brand;
  }

  /**
   * Display a single brand.
   * GET brands/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params, request, response, view }) {}

  /**
   * Render a form to update an existing brand.
   * GET brands/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit({ params, request, response, view }) {}

  /**
   * Update brand details.
   * PUT or PATCH brands/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, response }) {
    const newBrandName = await request.only('name');
    const brand = await Brand.find(params.id);
    brand.name = newBrandName.name;
    return await brand.save()
  }

  /**
   * Delete a brand with id.
   * DELETE brands/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, request, response }) {
    const brand = await Brand.find(params.id)
    return await brand.delete()
  }
}

module.exports = BrandController;
