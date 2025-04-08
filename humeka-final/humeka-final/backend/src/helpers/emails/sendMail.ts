import nodemailer from 'nodemailer';
import hbs from 'handlebars';
import fs from 'fs';
import dotenv from 'dotenv';
import path from 'path'
import sgTransport from 'nodemailer-sendgrid-transport';
dotenv.config();


const nodeEnv = process.env.NODE_ENV

interface Idata {
    name: string,
    email?:string,
    link?: string,
    date?: string,
    time?: string,
    counselorName?:string,
    counselorEmail?:string
    code?:string,
    isOnline?:boolean,
    venue?:string,
    groupName?:string,
    description?:string,
}

const transporter = nodemailer.createTransport(
    sgTransport({
      auth: {
        api_key: process.env.SENDGRID_API_KEY
      }
    })
  );

const sendEmail = async(emailType:string, recipient:string, data:Idata | null) => {
    let subject;

    if(emailType == 'welcome'){
        subject = 'Welcome to the Humeka family'
    }else if(emailType == 'book'){
        subject = 'Appointment Confirmation'
    }else if(emailType == 'bookC'){
        subject = 'New Appointment'  
    }else if(emailType == 'cancel'){
        subject = 'Appointment Cancellation'
    }else if(emailType == 'reset'){
        subject = 'Password Reset'
    }else if(emailType == 'session'){
        subject = 'New Group Session'
    }else if(emailType == 'session-cancel'){
        subject = 'Group Session Cancellation'
    }

    const templatePath = nodeEnv !== 'PROD' ? path.join(__dirname, 'templates', `${emailType}.html`) : `./dist/helpers/emails/templates/${emailType}.html`;
    const templateFile = fs.readFileSync(templatePath, 'utf-8');
    const template = hbs.compile(templateFile); 
    const html = template(data);
    
    const mailOptions = {
        from: 'Humeka <noreply@mumwari.tech>',
        to: recipient,
        subject: subject,
        html: html
    };

    const response = await transporter.sendMail(mailOptions)
    return response  
}

export default sendEmail