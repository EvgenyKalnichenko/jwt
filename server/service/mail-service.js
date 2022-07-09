const nodemailer = require('nodemailer')

class MailService {
    constructor() {
        this.transporter = nodemailer.createTransport({
            host: ,
            port: ,
            secure: false,
            auth: {

            }
        })
    }

    async sandActivationMail(to, link) {
    }
}

module.exports = new MailService();
