// import { $authHost, $host } from "./index";
import jwt_decode from 'jwt-decode'

export const createCategory = async (category) => {
  // const {data} = await $authHost.post('api/type', category);

  fetch('https://api.storerestapi.com/categories',
    {
      method: 'POST',
      body: JSON.stringify({
        name: category.name
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8'
      }
    })
    .then(response => response.json())
    .then(json => console.log(json))

  // return data
}

export const fetchCategories = async () => {
  // const {data} = await $host.get('api/type');

  const response = await fetch('https://fakestoreapi.com/products/categories')
  const responseJSON = await response.json()

  responseJSON.push('category5', 'category6', 'category7', 'category8')

  const responseObj = []
  responseJSON.map((category, index) => {
    responseObj[index] = {
      id: index,
      name: category,
      image: 'http://via.placeholder.com/640x360'
    }
  })

  return responseObj

  // return data
}

export const createBrand = async (brand) => {
  // const {data} = await $authHost.post('api/brand', brand);

  fetch('https://api.storerestapi.com/categories',
    {
      method: 'POST',
      body: JSON.stringify({
        name: brand.name
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8'
      }
    })
    .then(response => response.json())
    .then(json => {
      json.message = 'Success! Brand created'
      console.log(json)
    })

  // return data
}

export const fetchBrands = async () => {
  // const {data} = await $host.get('api/brand');

  const response = await fetch('https://fakestoreapi.com/products/categories')
  let responseJSON = await response.json()

  responseJSON = ['brand1', 'brand2', 'brand3', 'brand4', 'brand5', 'brand6', 'brand7', 'brand8']

  const responseObj = []
  responseJSON.map((category, index) => {
    responseObj[index] = {
      id: index,
      name: category,
      image: 'http://via.placeholder.com/640x360'
    }
  })

  return responseObj

  // return data
}

export const createProduct = async (product) => {
  // const {data} = await $authHost.post('api/product', product);

  fetch('https://api.storerestapi.com/products',
    {
      method: 'POST',
      body: JSON.stringify(product),
      headers: {
        'Content-type': 'application/json; charset=UTF-8'
      }
    })
    .then(response => response.json())
    .then(json => console.log(json))

  // return data
}

export const fetchProducts = async (categoryId, brandId, page, limit = 8) => {
  // const {data} = await $host.get('api/product', {params: {
  //     categoryId, brandId, page, limit
  // }});

  const response = await fetch('https://fakestoreapi.com/products?limit=' + limit)
  const responseJSON = await response.json()

  /* TEMPORARY CODE */
  responseJSON.map(product => product.count = 1)
  /* TEMPORARY CODE */

  return responseJSON

  // return data
}

export const fetchOneProduct = async (id) => {
  // const {data} = await $host.get('api/product/' + id);

  const response = await fetch('https://fakestoreapi.com/products/' + id)
  const responseJSON = await response.json()
  responseJSON.count = 1

  return responseJSON

  // return data
}

export const searchProducts = async (searchQuery) => {
  const response = await fetch('https://fakestoreapi.com/products?query=' + searchQuery)
  const responseJSON = await response.json()

  return responseJSON
}
