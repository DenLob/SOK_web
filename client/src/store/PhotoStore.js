import {makeAutoObservable} from "mobx";

export default class PhotoStore {
    constructor() {
        this._photos = {
        }
        this._selectedProduct = {}
        makeAutoObservable(this)
    }

    setPhotos(photos) {
        this._photos = photos
    }

    get photos() {
        return this._photos
    }

    setSelectedProduct(product) {
        this._selectedProduct = product
    }

    get selectedProduct() {
        return this._selectedProduct
    }
}