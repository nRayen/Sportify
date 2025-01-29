const bcrypt = require('bcrypt')
export const encrypt = async (pwd) => {
    let hashedPwd=  bcrypt.hashSync(pwd,10)
    console.log(hashedPwd)
    return hashedPwd
}