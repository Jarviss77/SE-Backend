import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

export async function verifyMail (req, res) {
    const { email } = req.body;
    console.log(email);
    if (!email) {
      return res.status(400).json({ error: 'Email is required' });
    }
    // Generate random 6-digit verification code
    const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
  
    try {

      // Send verification email
      await sendVerificationEmail(email, verificationCode);
  
      res.json({ message: 'User signed up successfully. Please verify your email.' });
    } catch (error) {
      console.error('Error signing up user:', error);
      res.status(500).json({ error: 'An error occurred while sending mail.' });
    }
  };
  
  // Function to send verification email
  async function sendVerificationEmail(email, verificationCode) {
    // Configure nodemailer transporter

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 587,
        secure: false, // use SSL
        auth: {
            user: process.env.EMAIL_ADDRESS,  // Your Gmail address
            pass: process.env.APP_PASSWORD    // Your Gmail password or App Password
        }
    });
    //console.log(transporter);
    // Configure email options
    const mailOptions = {
      from: {
        name: 'The Timeline',
        address: process.env.EMAIL_ADDRESS,
      }, 
      to: [email],
      subject: 'Email Verification',
      text: `Your verification code is: ${verificationCode}`,
    };
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error occurred while sending email:', error);
        } else {
            console.log('Email sent successfully:', info.response);
        }
  })
};
