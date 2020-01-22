const nodeMailer = require('nodemailer');

module.exports = async (email, token) => {
  let link = `http://localhost:3000/sign-in?token=${token}`;
  let productionLink = `https://calm-waters-78958.herokuapp.com/sign-in?token=${token}`;

  // create reusable transporter object using the default SMTP transport
  let transporter = nodeMailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465 || 587,
    secure: true,
    auth: {
      type: 'OAuth2',
      user: process.env.EMAIL_USERNAME,
      clientId: process.env.EMAIL_CLIENT_ID,
      clientSecret: process.env.EMAIL_CLIENT_SECRET,
      refreshToken: process.env.EMAIL_REFRESH_TOKEN,
      accessToken: process.env.EMAIL_ACCESS_TOKEN
    }
  });

  try {
    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: '"Story Master" <noreply@story-master.com>',
      to: email,
      subject: 'Story Master Sign In ✔',
      html: `
        <head>
        <style type="text/css">
          .container {
            text-align: center;
            font-family: Verdana, Geneva, Tahoma, sans-serif;
          }
          h1 {
            color: #3dd969;
          }
          a {
            text-align: center;
          }
          button {
            font-weight: 300;
            font-family: Poppins, -apple-system, BlinkMacSystemFont, 'Segoe UI',
              Roboto, 'Helvetica Neue', Arial, sans-serif;
            border: 1px solid transparent;
            padding: 0.75rem 1.25rem;
            font-size: 0.875rem;
            line-height: 1.125;
            border-radius: 0.375rem;
            transition: all 250ms cubic-bezier(0.27, 0.01, 0.38, 1.06);
            color: #fff;
            border-color: #007bff;
            background-color: #007bff;
            box-shadow: none;
            margin-top: 50px;
            width: 50%;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>Welcome to Story Master</h1>
          <p>We sent you this email just to verify that it's really you. Cause ya know, security is important.
          Click below to sign in!</p>
          <a href=${
            process.env.NODE_ENV === 'production' ? productionLink : link
          }><button>Click here to Sign In</button></a>
        </div>
      </body>
        `
    });

    console.log('Message sent: %s', info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
  } catch (err) {
    console.error(err.message);
    console.log('Error sending email');
  }
};
