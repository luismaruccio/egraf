const bcrypt = require('bcryptjs');

async function generatePassword(password){
    return await bcrypt.hash(password, 8);
}

async function checkPassword(passwordUser, passwordSend) {
    return await bcrypt.compare(passwordSend, passwordUser);
}

module.exports.generatePassword = generatePassword
module.exports.checkPassword = checkPassword