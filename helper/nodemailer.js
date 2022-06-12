const nodemailer = require("nodemailer");

let transporter_0 = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
        user: "068ffc743191a7", // generated ethereal user
        pass: "adc80d7bb1e80e", // generated ethereal password
    },
});

let transporter = nodemailer.createTransport({
    host: "smtp.mailgun.org",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
        user: "postmaster@sandbox037b96ce6d644afc847db0c791fc43ee.mailgun.org", // generated ethereal user
        pass: "198b5c0548e5d279d3b15b930de8d24d-523596d9-4b287d5c", // generated ethereal password
    },
});


// send mail with defined transport object
let info = transporter.sendMail({
    from: '"Fred Foo 👻" <foo@example.com>', // sender address
    to: "dev.sagartmg@gmail.com", // list of receivers
    subject: "Hello ✔", // Subject line
    text: "Hello world?", // plain text body
    html: "<b>Hello world?</b>", // html body
}, (err, data) => {
    if (err) console.log(err);
    console.log(data);
});

