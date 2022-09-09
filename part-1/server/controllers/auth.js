const users = []
const bcryptjs = require(`bcryptjs`)
module.exports = {
    login: (req, res) => {
      console.log('Logging In User')
      console.log(req.body)
      const { username, password } = req.body
      for (let i = 0; i < users.length; i++) {
        const existingPassword = bcryptjs.compareSync(password, users[i].passwordHash)
        if (users[i].username === username) {
          if (existingPassword) {
            const userCopy = { ...users[i] };
            delete userCopy.passwordHash;
            return res.status(200).send(userCopy);
          }
        }
      }
      res.status(400).send("User not found.")
    },
    register: (req, res) => {
      let securedUserInfo = {...req.body}
      let {password} = req.body
      // console.log(password)
      const salt = bcryptjs.genSaltSync(5)
        const passwordHash = bcryptjs.hashSync(password, salt)
        delete password;
        securedUserInfo.passwordHash= passwordHash;
      
        // console.log('Registering User')
        // console.log(req.body)
        users.push(securedUserInfo)
        res.status(200).send(securedUserInfo)
    }
}