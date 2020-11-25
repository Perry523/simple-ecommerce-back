"use strict";
const Product = use("App/Models/Product");
const Variant = use("App/Models/Variant");
const Image = use("App/Models/Image");
const Helpers = use("Helpers");

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with products
 */
class ProductController {
  /**
   * Show a list of all products.
   * GET products
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */

  async index({ request, response, view }) {
    const products = await Product.all();
    const produtos = [];
    for (let i in products.rows) {
      const produto = Object.assign(products.rows[i]);
      const imgs = await Image.query()
        .where("product_id", "=", produto.id)
        .fetch();
      const variants = await Variant.query()
        .where("product_id", "=", produto.id)
        .fetch();
      produto.imgs = [];
      produto.variants = [];
      for (let j in imgs.rows) {
        produto.imgs.push(imgs.rows[j].path);
      }
      for (let j in variants.rows) {
        produto.variants.push(variants.rows[j]);
      }
      produtos.push(produto);
    }
    return produtos;
  }

  /*await setTimeout(() => {
      }

    }, 2000);*/

  /**
   * Render a form to be used for creating a new product.
   * GET products/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create({ request, response, view }) {}

  /**
   * Create/save a new product.
   * POST products
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response }) {
    const product = request.only([
      "name",
      "category",
      "brand",
      "discount",
      "price",
      "info",
      "link",
    ]);
    let prod = new Product();
    prod = Object.assign(prod, product);
    await prod.save();
    let { variants } = request.only("variants");
    let variantImgs = request.file("variantImgs");
    for (let i in variants) {
      let variant = JSON.parse(variants[i]);
      let variante = new Variant();
      variante.product_id = prod.id;
      variante = Object.assign(variante, variant);
      if (variantImgs !== null) {
        if (variantImgs.files[i] !== undefined) {
          const variantImgName = `${new Date().getTime()}.${
            variantImgs.files[i].subtype
          }`;
          variante.path = "/variantImgs/" + variantImgName;
          await variantImgs.files[i].move(
            Helpers.tmpPath("uploads/variantImgs"),
            {
              name: variantImgName,
            }
          );
          if (!variantImgs.files[i].moved()) {
            return variantImgs.files[i].error();
          }
          variante.save();
        } else {
          variante.path = null;
          variante.save();
        }
      } else {
        variante.path = null;
        variante.save();
      }
    }
    let productImgs = request.file("imgs");
    if (productImgs) {
      for (let i in productImgs.files) {
        let productImgName = `${new Date().getTime()}${
          productImgs.files[i].clientName
        }`;
        await productImgs.files[i].move(
          Helpers.tmpPath("uploads/ProductImgs"),
          {
            name: productImgName,
          }
        );
        if (!productImgs.files[i].moved()) {
          return productImgs.files[i].error();
        }
        const img = new Image();
        img.product_id = prod.id;
        img.path = "/images/" + productImgName;
        img.save();
      }
    } else {
      throw new Error("O campo de imagem é obrigatório");
    }
    return "success";
  }

  /**
   * Display a single product.
   * GET products/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params, request, response, view }) {
    const id = params.id;
    let product = await Product.query().where("link", "=", id).fetch();
    const produto = Object.assign(product.rows[0]);
    let imgs = await Image.query().where("product_id", "=", produto.id).fetch();
    produto.imgs = imgs.rows.map((img) => {
      return img.path;
    });
    produto.variants = await Variant.query()
      .where("product_id", "=", produto.id)
      .fetch();
    return produto;
  }

  /**
   * Render a form to update an existing product.
   * GET products/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit({ params, request, response, view }) {}

  /**
   * Update product details.
   * PUT or PATCH products/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, response }) {}

  /**
   * Delete a product with id.
   * DELETE products/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, request, response }) {
    const product = await Product.find(params.id);
    await Image.query().where("product_id", "=", product.id).delete();
    await Variant.query().where("product_id", "=", product.id).delete();
    return await product.delete();
  }
  async filterByCategory({ params, request, response }) {
    const { category } = request.only("category");
    const products = await Product.query()
      .where("category", "=", category)
      .fetch();
    const produtos = [];
    for (let i in products.rows) {
      const produto = Object.assign({}, products.rows[i].$attributes);
      let imgs = await Image.query()
        .where("product_id", "=", produto.id)
        .fetch();
      let variants = await Variant.query()
        .where("product_id", "=", produto.id)
        .fetch();
      produto.imgs = [];
      produto.variants = [];
      for (let j in imgs.rows) {
        produto.imgs.push(imgs.rows[j].path);
      }
      for (let j in variants.rows) {
        produto.variants.push(variants.rows[j]);
      }
      produtos.push(produto);
    }
    return produtos;
  }
  async filter({ params, request, response }) {
    const { name, brand, min, max, category } = request.all();
    const products = await Product.query()
      .whereBetween("price", [min || 0, max || 9999999])
      .andWhere("category", "=", category)
      .andWhere("name", "like", name ? "%" + name + "%" : "%")
      .andWhere("brand", "like", brand ? "%" + brand + "%" : "%")
      .fetch();
    const produtos = [];
    for (let i in products.rows) {
      const produto = Object.assign({}, products.rows[i].$attributes);
      let imgs = await Image.query()
        .where("product_id", "=", produto.id)
        .fetch();
      let variants = await Variant.query()
        .where("product_id", "=", produto.id)
        .fetch();
      produto.imgs = [];
      produto.variants = [];
      for (let j in imgs.rows) {
        produto.imgs.push(imgs.rows[j].path);
      }
      for (let j in variants.rows) {
        produto.variants.push(variants.rows[j]);
      }
      produtos.push(produto);
    }
    return produtos;
  }
}

module.exports = ProductController;
