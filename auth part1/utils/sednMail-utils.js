import nodemailer from 'nodemailer';

// create transport
// mailoptions
// send mail

const sendVerificationEmail = async (email, token) => {
    try {

        // creating email tasnporter
        const transporter = nodemailer.createTransport({
            host: process.env.EMAIL_HOST,
            port: process.env.EMAIL_PORT,
            secure: process.env.EMAIL_SECURE === 'true',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            }
        })

        // verification url
        const verificationUrl = `${process.env.BASE_URL}/api/v1/users/verify${token}`

        // email content
        const mailOptions = {
            from: `"Authentication App" ${process.env.SENDER_MAIL}`,
            to: email,
            subject: "Pleasr verify your email address",
            text: `Thank you for registering! please verify your email address to complete your registration.
            ${verificationUrl}
            This verification link will expire in 10 mins.
            if you did not want to create an account, Please ignore this email
            `,
        };

        const info = await transporter.sendMail(mailOptions);
        console.log("verification email sen: %s", info.messageId);
        return true;
    } catch(err) {
        console.error("Error sending verification email: ", err);
        return false;
    }
};

export default sendVerificationEmail;