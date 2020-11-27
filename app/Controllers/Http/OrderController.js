"use strict";

const Order = use("App/models/Order");
const SoldProduct = use("App/models/SoldProduct");

class PedidoController {
  /**
   * Show a list of all pedidos.
   * GET pedidos
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({ request, response, view }) {}

  /**
   * Render a form to be used for creating a new pedido.
   * GET pedidos/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create({ request, response, view }) {}

  /**
   * Create/save a new pedido.
   * POST pedidos
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, auth }) {
    const user = await auth.getUser();
    const { address } = request.only(["address"]);
    const { cart } = request.only(["cart"]);
    let order = new Order();
    order.user_id = user.id;
    order.endereco_id = address.id;
    await order.save()
    for(let i in cart){
      const soldProduct = new SoldProduct()
      soldProduct.order_id = order.id
      soldProduct.product_id = cart[i].id
      soldProduct.variant = cart[i].variante.name
      soldProduct.price = cart[i].price
      soldProduct.discount = cart[i].discount
      soldProduct.quantity = cart[i].quantidade
      soldProduct.save()
    }
    return 'success'
  }

  /**
   * Display a single pedido.
   * GET pedidos/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params, request, response, view }) {}
}

module.exports = PedidoController;
