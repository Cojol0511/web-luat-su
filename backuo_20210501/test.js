const axios = require('axios')

async function main() {
  const lawyerList = await axios.get('http://api.veneris.bitiland.com/api/lawyer')
  console.log(lawyerList.data)

  const userObj = {
    "UserName": "admin",
    "PasswordHash": "admin"
  }

  const user = await axios.post('http://api.veneris.bitiland.com/api/auth/', userObj)
  console.log(user.data)
}

main()