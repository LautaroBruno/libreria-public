const addSaleMutation = `
mutation($product: [productSoldInput]) {
  addSale(product:$product){
    numberSale
    total
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


const addSale = async (productList) => {
  let response = await fetch(`http://localhost:4000`,
    queryOptions(addSaleMutation, { product: productList }));
  let data = await response.json()
  return data;
}

export { addSale }
