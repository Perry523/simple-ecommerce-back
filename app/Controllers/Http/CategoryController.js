"use strict";

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */
const Category = use("App/Models/Category");
/**
 * Resourceful controller for interacting with categories
 */
class CategoryController {
  async index({ request, response, view }) {
    const categories = await Category.all();
    return categories;
  }

  async store({ request, response }) {
    const category = Category.create(await request.all());
    return category;
  }

  async update({ params, request, response }) {
    const { name, icon } = await request.all();
    const category = await Category.find(params.id);
    category.name = name;
    category.icon = icon;
    return await category.save();
  }

  async destroy({ params, request, response }) {
    const category = await Category.find(params.id);
    return await category.delete();
  }
}

module.exports = CategoryController;
