const getAllSalesQuery = `
query getAllSaleQuery($page: Int!,$pageSize: Int!, $dateStart:String, $dateEnd:String){
    getAllSale(pagination: {page:$page,limit:$pageSize}, filter:{startDate:$dateStart,endDate:$dateEnd}){
      sales{
        id
        numberSale
        createdAt
        total
        productSold{
          id
          description
          discount
          price
             quantity
        }
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

const deleteSaleMutation = `
mutation($id: ID!) {
  deleteSale(id:$id)
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

  getAllSales: async (page, pageSize, dateStart, dateEnd) => {
    let response = await fetch(`http://localhost:4000`,
      queryOptions(getAllSalesQuery, { page, pageSize, dateStart, dateEnd }));
    let data = await response.json()
    return data;
  },

  deleteSale: async (id) => {
    let response = await fetch(`http://localhost:4000`,
      queryOptions(deleteSaleMutation, { id }));
    let data = await response.json()
    return data;
  },

}