import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';


@Injectable()
export class MailService {
    constructor(private readonly mailerService: MailerService) {}
    
    async sendMail(to: string, subject: string, context: any) {
        await this.mailerService.sendMail({
        to,
        subject,
        template:'./index.hbs',
        context,
        });

        return { message: 'Email sent successfully'};
    }
}
