const backupDataBaseMutation = `
mutation($name: String) {
  backupDataBase(DB:$name)
}`

const getServersBackupsQuery = `
query{
  quetionDataBase
}`


const restoreDataBaseMutation = `
mutation($name: String){
  restoreDataBase(DB: $name)
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


const backupDataBase = async (name) => {
  let response = await fetch(`http://localhost:4000`,
    queryOptions(backupDataBaseMutation, { name: name }));
  let data = await response.json()
  return data;
}

const getServersBackups = async (name) => {
  let response = await fetch(`http://localhost:4000`,
    queryOptions(getServersBackupsQuery, {}));
  let data = await response.json()
  return data;
}

const restoreDataBase = async (name) => {
  let response = await fetch(`http://localhost:4000`,
    queryOptions(restoreDataBaseMutation, {name:name}));
  let data = await response.json()
  return data;
}

export { backupDataBase, getServersBackups, restoreDataBase }