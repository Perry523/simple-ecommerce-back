'use strict'
const Helpers = use('Helpers')
class VariantController {
    async show({response, params}){
        return response.download(`${Helpers.tmpPath()}/uploads/variantImgs/${params.path}`)
    }
}

module.exports = VariantController
