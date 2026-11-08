import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    service: "gmail", 

    auth: {
        user: process.env.NODEMAILER_ADMIN_EMAIL,
        pass: process.env.NODEMAILER_ADMIN_PASS
    }
})

export default transporter;