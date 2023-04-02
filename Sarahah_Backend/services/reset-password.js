import nodemailer from "nodemailer";
import jwt from 'jsonwebtoken'
import { otp_html } from "./otp-templete.js";


export const PasswordReset = async (options)=>{
    let transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "faresramadan97@gmail.com", // generated ethereal user
          pass: "ymonwxzizuzaybub", // generated ethereal password
        },
      });
    
    
    let info = await transporter.sendMail({
    from: '"Sarahah App" <faresramadan97@gmail.com>', // sender address
    to: options.email, // list of receivers
    subject: "Reset Password", // Subject line
    html: otp_html(options), // html body
    });
}