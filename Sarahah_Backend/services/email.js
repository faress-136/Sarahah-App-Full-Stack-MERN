import nodemailer from "nodemailer";
import jwt from 'jsonwebtoken'
import { html } from "./email-templete.js";


export const sendEmail = async (options)=>{
    let transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "faresramadan97@gmail.com", // generated ethereal user
          pass: "ymonwxzizuzaybub", // generated ethereal password
        },
      });
    
      let token = jwt.sign({email: options.email}, process.env.VERIFY_KEY)
    
    let info = await transporter.sendMail({
    from: '"Sarahah App" <faresramadan97@gmail.com>', // sender address
    to: options.email, // list of receivers
    subject: "Email Verification", // Subject line
    html: html(token, options.name), // html body
    });
}