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

  async store({ request, response }) {
    const brand = await Brand.create(request.only("name"));
    return brand;
  }

  async update({ params, request, response }) {
    const newBrandName = await request.only('name');
    const brand = await Brand.find(params.id);
    brand.name = newBrandName.name;
    return await brand.save()
  }
  
  async destroy({ params, request, response }) {
    const brand = await Brand.find(params.id)
    return await brand.delete()
  }

}

module.exports = BrandController;
