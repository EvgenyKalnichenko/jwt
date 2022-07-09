class UserController {
    async registration(req, res, next) {
        try {

        } catch (e) {

        }
    }

    async login(req, res, next) {
        try {

        } catch (e) {

        }
    }

    async logout(req, res, next) {
        try {

        } catch (e) {

        }
    }

    async activate(req, res, next) {
        try {

        } catch (e) {

        }
    }

    async refresh(req, res, next) {
        try {

        } catch (e) {

        }
    }

    async getUsers(req, res, next) {
        try {
            console.log('req', req);
            console.log('res', res);
            res.json(['123', 'fsafsa']);
        } catch (e) {
            console.log(e)
        }
    }
}

module.exports = new UserController()
