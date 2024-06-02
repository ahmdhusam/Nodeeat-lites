import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

export class Mailer {
  port: any;
  host: any;
  secure: boolean;
  auth: Object;
  mainEmail: any;
  constructor() {
    this.host = process.env.EMAIL_HOST;
    this.port = process.env.EMAIL_PORT;
    this.secure = false;
    this.auth = {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    };
    this.mainEmail = process.env.EMAIL;
  }

  transporter(): nodemailer.Transporter {
    const trans = nodemailer.createTransport({
      // Configure your email service details here (e.g., gmail, smtp)
      host: this.host,
      port: this.port,
      secure: this.secure, // Adjust based on your email service configuration
      auth: this.auth,
    });
    return trans;
  }
  mailVerificationOptions(email: string, verificationToken: string) {
    return {
      from: this.mainEmail, // Replace with your sender info
      to: email,
      subject: "Verify Your Email Address",
      text: `Please click the following link to verify your email address for your account:
    
        ${process.env.BASE_URL}/api/v1/auth/verify-account?token=${verificationToken}
    
        This link will expire in 24 hours.
    
        Thanks,
        expresseat`,
    };
  }

  async sendVerificationToken(email: string, verificationToken: string) {
    try {
      await this.transporter().sendMail(
        this.mailVerificationOptions(email, verificationToken)
      );
      console.log("Verification email sent successfully!");
    } catch (error) {
      console.error("Error sending verification email:", error);
      throw error; // Re-throw for handling in the route
    }
  }
}

export const mailSender = new Mailer();
