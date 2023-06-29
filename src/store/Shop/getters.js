import { ProductList } from 'src/models/Product.js'

export function shopServiceName (state) {
  return state.shopServiceName
}

export function selectedProducts (state) {
  return new ProductList(state.selectedProducts)
}
