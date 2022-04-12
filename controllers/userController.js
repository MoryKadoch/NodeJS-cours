module.exports = {
    users: (req, res) => {
        const users = require('../datas/users.json')
        res.status(200).render('users', {
            users
        })
    },
    user: (req, res) => {
        const users = require('../datas/users.json')
        for (let key in users) {
            if (users[key].id === req.param('id')) {
                user = users[key];
                break;
            }
            else {
                user = undefined;
            }
        }
        if (typeof user === 'undefined') {
            res.status(404).send('Nothing here!');
        }
        else {
            res.status(200).render('user', {
                user
            })
        }
    }
}