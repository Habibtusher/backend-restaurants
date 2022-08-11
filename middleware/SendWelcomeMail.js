import nodemailer from "nodemailer"

const welComeMail = async (email) => {

    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "demomail232@gmail.com", 
        pass: "yrpnxpxkwprueptb", 
      },
    });
  let detail={
    from:"demomail232@gmail.com",
    to:`test@gmail.com, ${email}`,
    subject:"Welcome Message",
    text:"Thank you for create account on our application"
  }
  transporter.sendMail(detail,(err)=>{
    if(err){
      console.log("it has a error",err);
    }
    else{
      console.log("mail send sucessfully");
    }
  })
  }
  
  welComeMail().catch(console.error);

  export {welComeMail};