const getAllProductsQuery = `
query searchProductsQuery($search: String!, $pageSize: Int!, $page: Int!, $orderBy:String, $asc:Boolean) {
  searchProducts(text:$search, pagination:{page:$page, limit:$pageSize}, filter:{orderBy:$orderBy, asc:$asc}){
    products{
      id
      barCode
      manualCode
      price
      description
    }
    pagination{
      totalDocs
      limit
      page
      hasPrevPage
      hasNextPage
      totalPages
    }
  }
}`

const getSpecificProductQuery = `
query ($search: String!) {
  specificSearchProduct(text:$search){
      id
      barCode
      manualCode
      price
      description
  }
}`

const deleteProductMutation = `
mutation($id: ID!) {
  deleteProduct(id:$id)
}`
const addProductMutation = `
mutation($product: ProductInput!) {
  addProduct(product:$product){
    description
  }
}`

const updateProductMutation = `
mutation($id:ID!, $product: ProductInput!) {
  updateProduct(id: $id, product: $product){
    description
  }
}`

const queryOptions = (query, variables) => ({
  method: "post",
  headers: {
    "Content-Type": "application/json",
    'Accept': 'application/json'
  },
  body: JSON.stringify({
    query, variables
  })
})

export default {

  getAllProducts: async (search, pageSize, page, orderBy, asc) => {
    let response = await fetch(`http://localhost:4000`,
      queryOptions(getAllProductsQuery, { search, pageSize, page, orderBy, asc }));
    let data = await response.json()
    return data;
  },

  deleteProduct: async (id) => {
    let response = await fetch(`http://localhost:4000`,
      queryOptions(deleteProductMutation, { id }));
    let data = await response.json()
    return data;
  },

  addProduct: async (product) => {
    let response = await fetch(`http://localhost:4000`,
      queryOptions(addProductMutation, { product: { ...product, price: Number(product.price) } }));
    let data = await response.json()
    return data;
  },
  updateProduct: async (id, product) => {
    let response = await fetch(`http://localhost:4000`,
      queryOptions(updateProductMutation, { id, product: { ...product, price: Number(product.price) } }));
    let data = await response.json()
    return data;
  },

  getSpecificProducts: async (search) => {
    let response = await fetch(`http://localhost:4000`,
      queryOptions(getSpecificProductQuery, { search }));
    let data = await response.json()
    return data;
  },

}
