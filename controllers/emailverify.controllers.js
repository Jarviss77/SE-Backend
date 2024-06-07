import nodemailer from 'nodemailer';

export async function verifymail (req, res) {
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
        auth: {
            user: 'thetimeline65@gmail.com',  // Your Gmail address
            pass: 'thetimeline@gmail.com'    // Your Gmail password or App Password
        }
    });
    console.log(transporter);
    // Configure email options
    const mailOptions = {
      from: 'thetimeline65@gmail.com', 
      to: email,
      subject: 'Email Verification',
      text: `Your verification code is: ${verificationCode}`,
    };
  
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error occurred while sending email:');
        } else {
            console.log('Email sent successfully:', info.response);
        }
  })
};
