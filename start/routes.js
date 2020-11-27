"use strict";

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use("Route");
Route.resource("/products", "ProductController");
Route.resource("/brands", "BrandController");
Route.resource("/categories", "CategoryController");
Route.get("images/:path", "ImageController.show");
Route.post("/login", "AuthController.store");
Route.get("variantImgs/:path", "VariantController.show");
Route.post("/register", "UserController.store");
Route.get("/home", "UserController.show").middleware("auth");
Route.get("/admin", "UserController.isAdmin").middleware("auth");
Route.post("/filterCategory", "ProductController.filterByCategory");
Route.post("/filter", "ProductController.filter");
Route.resource("/endereco", "EnderecoController").middleware("auth");
