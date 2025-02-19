import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
  private transporter;
  private auth = {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  };

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: this.auth.user,
        pass: this.auth.pass,
      },
    });
  }

  async sendMail(to: string, subject: string, text: string): Promise<void> {
    const mailOption = {
      from: `${this.auth.user}`,
      to,
      subject,
      text,
    };

    await this.transporter.sendMail(mailOption);
  }
}
