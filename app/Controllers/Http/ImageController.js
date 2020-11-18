'use strict'
const Helpers = use('Helpers')
const Env = use('Env')
const Drive = use('Drive')
class ImageController {
    async show({response, params}){
        return response.download(`${Helpers.tmpPath()}/uploads/ProductImgs/${params.path}`)
    }
}

module.exports = ImageController
