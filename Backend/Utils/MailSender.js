import mailer from 'nodemailer';


const MailSend=async(attributes)=>{
  const transport = mailer.createTransport({
    host: process.env.MAIL_HOST,
    port:process.env.MAIL_PORT ,
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASSWORD

    }
  });

  const mail={
    from:`${process.env.MAIL_FROM_NAME} <${process.env.MAIL_FROM_MAIL}>`,
    to:attributes.email,
    subject:attributes.subject,
    html:attributes.message,
  }

  await transport.sendMail(mail)

}


export default MailSend;