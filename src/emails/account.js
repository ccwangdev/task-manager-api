const sgMail = require("@sendgrid/mail");

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendWelcomeEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: "ccwangdev@gmail.com",
        subject: "Thanks for joining me!",
        text: `Welcome to the app, ${name}. Let me know how you get along with the app.`
    });
};

const sendCancellationEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: "ccwangdev@gmail.com",
        subject: "Sorry for leaving me!",
        text: `${name}, Why you leasve me?`
    });
};

module.exports = {
    sendWelcomeEmail,
    sendCancellationEmail
}
