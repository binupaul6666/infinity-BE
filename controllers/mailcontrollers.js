
const nodemailer = require('nodemailer');
exports.mail = function ($, token) {
    let transporter = nodemailer.createTransport({
        service: 'Gmail',
        // secure: false,
        auth: {
            user: 'paulbinu1991@gmail.com',
            pass: '9605113842'
        },
    });
    transporter.sendMail({
        from: 'paulbinu1991@gmail.com',
        to: `${$}`,
        subject: "Confirm Your Access",
        html: "<p style='margin-bottom: 10px;'>Please click on confirm button. It will be provide the access to Infinity Web Application<p><div><a style='background-color: #199319; color: white;padding:10px;border-radius: 4px;border: 1px solid green; cursor:pointer; text-decoration:none;' target='_blank' href='http://localhost:8080/login/?userId="+token+"'>CONFIRM</a></div>",
    }, function (err) {
        if (err) {
            console.log(err);
        }
    });
}

