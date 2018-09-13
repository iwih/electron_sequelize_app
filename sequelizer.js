var Sequelize = require('sequelize');
var sequelize = new Sequelize('seq_table', 'osama', 'osama', {
    dialect: 'sqlite',
    storage: './sqlite/db.sqlite'
});
var authenticated = false;
sequelize.authenticate()
    .then(function () {
    authenticated = true;
    console.log("connected to db");
    createUserTable();
})
    .catch(function (err) { return console.log("unable to connect to db " + err); });
function createUserTable() {
    if (authenticated) {
        var userTable_1 = sequelize.define('user', {
            firstName: {
                type: Sequelize.STRING
            },
            lastName: {
                type: Sequelize.STRING
            }
        });
        function findOne() {
            userTable_1.findOne().then(function (user) { return console.log(user.get('firstName')); });
        }
        userTable_1.sync()
            .then(function () {
            console.log('created usersTable successfully.');
            userTable_1.create({ firstName: 'osama', lastName: 'alwash' }).then(findOne);
        })
            .catch(function (error) { return console.log('error creating usersTable \n' + error); });
    }
}
