'use strict'
const Product =  use('App/Models/Product')
const Variant =  use('App/Models/Variant')
const Image =  use('App/Models/Image')
const Drive = use('Drive')
const Helpers = use('Helpers')


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
   
  async index ({ request, response, view }) {
    const products = await Product.all()
    const produtos = []
    for(let i in products.rows){
      let produto = {}
      produto.nome = products.rows[i].name 
      let imgs = await Image.query().where('product_name','=',produto.nome).fetch()
      let variants = await Variant.query().where('product_name','=',produto.nome).fetch()
      produto.marca = products.rows[i].brand
      produto.preco = products.rows[i].price
      produto.info = products.rows[i].info
      produto.desconto = products.rows[i].discount
      produto.tipo = products.rows[i].type
      produto.imgs = []
      produto.variants = []
      for(let j in imgs.rows){
        produto.imgs.push(imgs.rows[j].path)
      }
      for(let j in variants.rows){
        produto.variants.push(variants.rows[j])
      }
      produtos.push(produto)
    }
    return produtos
    
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
  async create ({ request, response, view }) {
  }

  /**
   * Create/save a new product.
   * POST products
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {
    let product = request.only(['name','type','brand','discount','price','info'])
    //const produto = Product.create(product)
    const prod = new Product()
    prod.name = product.name
    prod.category = product.type
    prod.brand = product.brand
    prod.discount = product.discount
    prod.price = product.price
    prod.info = product.info
    prod.save()
    let rawvariants = request.only('variants')
    let variantImgs = request.file('variantImgs')
    for(let i in rawvariants.variants){
      const variant = JSON.parse(rawvariants.variants[i])
      const variante = new Variant
      variante.product_name = product.name
      variante.stock = variant.estoque
      variante.variant = variant.cor
      if (variantImgs !== null){
        if(variantImgs.files[i] !== undefined){
          const variantImgName = `${new Date().getTime()}.${variantImgs.files[i].subtype}`
          variante.path = '/variantImgs/'+variantImgName
          await variantImgs.files[i].move(Helpers.tmpPath('uploads/variantImgs'), {
            name: variantImgName,
          })
          if (!variantImgs.files[i].moved()) {
            return variantImgs.files[i].error()
          }
          variante.save()
        }
        else{
          variante.path = null
          variante.save()
        } 
      }
      else{
        variante.path = null
        variante.save()
      } 
    }   
      let file = request.file('imgs')
        if (file){
          for(let i in file.files){
            let productImgName = `${new Date().getTime()}${file.files[i].clientName}`
            await file.files[i].move(Helpers.tmpPath('uploads/ProductImgs'), {
              name: productImgName,
            })
            if (!file.files[i].moved()) {
              return file.files[i].error()
            }
            const img = new Image()
            img.product_name = product.name
            img.path = '/images/'+productImgName
            img.save()
          }
        }
        else{
          return "O campo de imagem é obrigatório"
        }
      return 'success'
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
  async show ({ params, request, response, view }) {
    let produto = {}
    const id = params.id.replace(/_/g,' ')
    let product = await Product.query().where('name','=',id).fetch()
    produto.nome = product.rows[0].name
    produto.marca = product.rows[0].brand
    produto.preco = product.rows[0].price
    produto.info = product.rows[0].info
    produto.desconto = product.rows[0].discount
    produto.tipo = product.rows[0].category
    let imgs = await Image.query().where('product_name','=',id).fetch()
    produto.imgs = imgs.rows.map(img => {return img.path})
    produto.variants = await Variant.query().where('product_name','=',id).fetch()
    return produto
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
  async edit ({ params, request, response, view }) {
  }

  /**
   * Update product details.
   * PUT or PATCH products/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
  }

  /**
   * Delete a product with id.
   * DELETE products/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
  }
  async filter({params, request, response}){
    const products = await Product.query().where('category','=',request.only('category').category).fetch()
    const produtos = []
    for(let i in products.rows){
      let produto = {}
      produto.nome = products.rows[i].name 
      let imgs = await Image.query().where('product_name','=',produto.nome).fetch()
      let variants = await Variant.query().where('product_name','=',produto.nome).fetch()
      produto.marca = products.rows[i].brand
      produto.preco = products.rows[i].price
      produto.info = products.rows[i].info
      produto.desconto = products.rows[i].discount
      produto.tipo = products.rows[i].type
      produto.imgs = []
      produto.variants = []
      for(let j in imgs.rows){
        produto.imgs.push(imgs.rows[j].path)
      }
      for(let j in variants.rows){
        produto.variants.push(variants.rows[j])
      }
      produtos.push(produto)
    }
    return produtos
  }
}

module.exports = ProductController
