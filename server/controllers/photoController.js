const {Photo, User, Bbox, ProductClass} = require('../models/models')
const ApiError = require('../error/ApiError')
const uploadFile = require("../middleware/UploadMiddleware")
const sendMessage = require('../middleware/RabbitmqMiddleware')

class PhotoController {
    async uploadPhoto(req, res) {

        try {
            await uploadFile(req, res);
            if (req.file === undefined) {
                return res.status(400).send({message: "Please upload a file!"});
            }

            await sendMessage(JSON.stringify(
                {
                    'path': req.file.path,
                    'userId': req.user.id
                }
            ));
            return res.status(200).send({
                message: "Uploaded the file successfully: " + req.file.originalname,
            });
        } catch (err) {
            return res.status(500).send({
                message: `Could not upload the file: ${req.file}. ${err}`,
            });
        }
    }

    async getAllUserPhotos(req, res, next) {


        let {page, limit} = req.query

        let userId = req.user.id
        page = page || 1
        limit = limit || 9
        let offset = page * limit - limit
        let photos;
        if (!userId) {
            return next(ApiError.badRequest('Не указан Id пользователя'))
        }
        photos = await Bbox.findAndCountAll(
            {
                include: [
                    {model: Photo, as: 'photo', required: true, where: {userId: userId}},
                    {model: ProductClass, as: 'product_class', required: true}
                ],
            })
        let uniqPhotos = []

        photos.rows.map(row => {

            let searchPhotoIndex = uniqPhotos.findIndex(i => i.id === row["photo"].id)
            searchPhotoIndex !== -1 ?
                uniqPhotos[searchPhotoIndex].bboxes.push(
                    {
                        id: row.id,
                        coordinates: row.coordinates,
                        percent: row.recognition_percent,
                        class: row["product_class"].name
                    }
                )
                :
                uniqPhotos.push(
                    {
                        id: row["photo"].id,
                        name: row["photo"].name,
                        path: row["photo"].path,
                        bboxes: [
                            {
                                id: row.id,
                                coordinates: row.coordinates,
                                percent: row.recognition_percent,
                                class: row["product_class"].name
                            }
                        ]
                    }
                )
        })

        let allProducts = []
        uniqPhotos.map(photo => {
            let products = []
            photo.bboxes.map(bbox => {
                let productId = allProducts.findIndex(product => product.product_class === bbox.class)

                if (productId === -1)
                {
                    productId = allProducts.length
                    allProducts.push({
                        id: productId,
                        name: bbox.class.split('_')[0],
                        product_class: bbox.class
                    })

                }

                const tmpProductIndex = products.findIndex(product => product.id === productId)
                if ( tmpProductIndex !== -1) {
                    products[tmpProductIndex].count++
                } else {
                    products.push(
                        {
                            id: productId,
                            name: bbox.class.split('_')[0],
                            class: bbox.class.split('_')[1],
                            product_class: bbox.class,
                            count: 1
                        }
                    )
                }
            })
            let productNames = []
            products.map(product => {
                let ind = productNames.findIndex(productTmp => productTmp.name === product.name)
                if(ind === -1){
                    productNames.push(
                        {
                            id: product.id,
                            name: product.name,
                            count: product.count,
                            classes: [{id: 0, name: product.class, count:product.count}]
                        }
                    )
                }
                else {
                    productNames[ind].count += product.count
                    let secondInd = productNames[ind]['classes'].findIndex(classTmp => classTmp.name === product.class)
                    if (secondInd === -1){
                        productNames[ind]['classes'].push({
                            id: productNames[ind]['classes'].length,
                            name: product.class,
                            count:product.count
                        })
                    } else{
                        productNames[ind]['classes'][secondInd].count++
                    }
                }
            })

            photo.info = productNames

        })
        let allProductsTmp = []
        allProducts.map(product => {
            if(allProductsTmp.findIndex(tmp => tmp.name === product.name) === -1){
                allProductsTmp.push({
                    name: product.name,
                    id: product.id
                })
            }
        })
        allProducts = allProductsTmp


        const result =
            {
                photos: uniqPhotos,
                products: allProducts
            }

        res.json(result);
    }

    async getOne(req, res, next) {
        let photos;
        const {id} = req.params
        if (!id) {
            return next(ApiError.badRequest('Не указан Id'))
        }

        photos = await Bbox.findAndCountAll(
            {
                include: [
                    {model: Photo, as: 'photo', required: true, where: {id: id}},
                    {model: ProductClass, as: 'product_class', required: true}
                ],
            })
        let uniqPhotos = []

        photos.rows.map(row => {

            let searchPhotoIndex = uniqPhotos.findIndex(i => i.id === row["photo"].id)
            searchPhotoIndex !== -1 ?
                uniqPhotos[searchPhotoIndex].bboxes.push(
                    {
                        id: row.id,
                        coordinates: row.coordinates,
                        percent: row.recognition_percent,
                        class: row["product_class"].name
                    }
                )
                :
                uniqPhotos.push(
                    {
                        id: row["photo"].id,
                        name: row["photo"].name,
                        path: row["photo"].path,
                        bboxes: [
                            {
                                id: row.id,
                                coordinates: row.coordinates,
                                percent: row.recognition_percent,
                                class: row["product_class"].name
                            }
                        ]
                    }
                )
        })

        let allProducts = []
        uniqPhotos.map(photo => {
            let products = []
            photo.bboxes.map(bbox => {
                let productId = allProducts.findIndex(product => product.product_class === bbox.class)

                if (productId === -1)
                {
                    productId = allProducts.length
                    allProducts.push({
                        id: productId,
                        name: bbox.class.split('_')[0],
                        product_class: bbox.class
                    })

                }

                const tmpProductIndex = products.findIndex(product => product.id === productId)
                if ( tmpProductIndex !== -1) {
                    products[tmpProductIndex].count++
                } else {
                    products.push(
                        {
                            id: productId,
                            name: bbox.class.split('_')[0],
                            class: bbox.class.split('_')[1],
                            product_class: bbox.class,
                            count: 1
                        }
                    )
                }
            })
            let productNames = []
            products.map(product => {
                let ind = productNames.findIndex(productTmp => productTmp.name === product.name)
                if(ind === -1){
                    productNames.push(
                        {
                            id: product.id,
                            name: product.name,
                            count: product.count,
                            classes: [{id: 0, name: product.class, count:product.count}]
                        }
                    )
                }
                else {
                    productNames[ind].count += product.count
                    let secondInd = productNames[ind]['classes'].findIndex(classTmp => classTmp.name === product.class)
                    if (secondInd === -1){
                        productNames[ind]['classes'].push({
                            id: productNames[ind]['classes'].length,
                            name: product.class,
                            count:product.count
                        })
                    } else{
                        productNames[ind]['classes'][secondInd].count++
                    }
                }
            })

            photo.info = productNames

        })
        let allProductsTmp = []
        allProducts.map(product => {
            if(allProductsTmp.findIndex(tmp => tmp.name === product.name) === -1){
                allProductsTmp.push({
                    name: product.name,
                    id: product.id
                })
            }
        })
        allProducts = allProductsTmp


        const result =
            {
                photos: uniqPhotos,
                products: allProducts
            }

        res.json(result);
    }
}

module.exports = new PhotoController()
