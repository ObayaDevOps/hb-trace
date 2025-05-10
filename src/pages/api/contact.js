import nodemailer from "nodemailer"

//make this a promise: https://stackoverflow.com/questions/60684227/api-resolved-without-sending-a-response-in-nextjs
export default async (req, res) => {
  const { name, email, phoneNumber, userMessage } = req.body;
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD
    }
  });
const data={ from: email,
    to: process.env.RECIPIENT_ADDRESS,
    subject: `Ashton & Carrington Contact form submission from ${name}`,
      html: `<h1>${name} Has contacted you</h1>
      <p>You have a contact form submission</p><br>
        <p><strong>Email: </strong> ${email}</p><br>
        <p><strong>Phone Number: </strong> ${phoneNumber}</p><br>
        <p><strong>Message: </strong> ${userMessage}</p><br>
      `}

      transporter.sendMail(data, function (err, info) {
        if(err){
            console.log(err)
            console.log("DID NOT SEND !")


        }
        else
        console.log("INFO SEND !") // at this point, tell the user message has successfully sent
        //toast
        //chakra tenplate modal ?

          console.log(info)
          res.send("success!!")
      })
};