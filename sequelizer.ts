const Sequelize = require('sequelize')

const sequelize = new Sequelize('seq_table', 'osama', 'osama', {
    dialect: 'sqlite',
    storage: './sqlite/db.sqlite'
})

var authenticated = false
sequelize.authenticate()
    .then(() => {
        authenticated = true
        console.log(`connected to db`)
        createUserTable()
    })
    .catch((err) => console.log(`unable to connect to db ${err}`))



function createUserTable() {
    if (authenticated) {
        const userTable = sequelize.define('user', {
            firstName: {
                type: Sequelize.STRING
            },
            lastName: {
                type: Sequelize.STRING
            }
        })
        function findOne() {
            userTable.findOne().then(user => console.log(user.get('firstName')))
        }
        userTable.sync()
            .then(() => {
                    console.log('created usersTable successfully.')
                userTable.create({firstName: 'osama', lastName: 'alwash'}).then(findOne)
                }
            )
            .catch((error) => console.log('error creating usersTable \n' + error))
    }
}