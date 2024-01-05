import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm/dist/common';
import { RequestEditSurface } from 'src/entity/requestEditSurface.entity';
import { Repository } from 'typeorm';
import { CreateRequestSurfaceDto } from './dto/create-requestSurface.dto';
import { ReportsSurfaceService } from 'src/reports-surface/reports-surface.service';
import { RequestState } from 'src/common/enums/request-state.enum';
import { SurfacesService } from 'src/surfaces/surfaces.service';
import { MailerService } from '@nestjs-modules/mailer';
import * as path from 'path';
import * as fs from 'fs';
@Injectable()
export class RequestSurfaceService {
  constructor(
    @InjectRepository(RequestEditSurface)
    private readonly requestEditSpaceRepository: Repository<RequestEditSurface>,
    private mailerService: MailerService,

    private readonly reportSurfaceService: ReportsSurfaceService,
    private readonly surfaceService: SurfacesService,
  ) {}

  //Find all request edit surface
  async findAll() {
    return await this.requestEditSpaceRepository.find({
      relations: {
        surfaceType: true,

        reportSurface: true,
      },
    });
  }

  //Create a new request edit surface
  async createRequestEditSurface(data: CreateRequestSurfaceDto) {
    try {
      const requestEditSurface = this.requestEditSpaceRepository.create(data);
      await this.reportSurfaceService.updateStateReportSurface(
        parseInt(String(data.reportSurface)),
      );
      const requestSurface =
        await this.requestEditSpaceRepository.save(requestEditSurface);

      const reportSurface =
        await this.reportSurfaceService.findReportSurfaceById(
          parseInt(String(data.reportSurface)),
        );

      const emailData = {
        email: reportSurface.email,
        name: reportSurface.name,
        state: reportSurface.state,
      };
      const htmlFilePath = path.join(
        __dirname,
        '../../src/templates/email/processingEmail.html',
      );
      let htmlContent = fs.readFileSync(htmlFilePath, 'utf8');
      for (const key in emailData) {
        const regex = new RegExp(`{{${key}}}`, 'g');
        htmlContent = htmlContent.replace(regex, emailData[key]);
      }

      await this.mailerService.sendMail({
        to: `${emailData.email}`, // Địa chỉ email người nhận
        subject: 'Report the results you provided', // Tiêu đề của email
        html: htmlContent,
      });

      return requestSurface;
    } catch (error) {
      throw error;
    }
  }

  //Find request edit surface by id
  async findRequestEditSurfaceById(id: number) {
    return await this.requestEditSpaceRepository.findOne({
      where: { id: id },
      relations: {
        surfaceType: true,

        reportSurface: true,
      },
    });
  }

  //Accept request edit surface
  async acceptRequestEditSurface(id: number) {
    try {
      const requestEditSurface = await this.findRequestEditSurfaceById(id);
      if (!requestEditSurface) {
        throw new Error('Request edit surface not found');
      }
      await this.requestEditSpaceRepository.update(id, {
        state: RequestState.ACCEPTED,
      });

      //Cập nhật state của report surface thành PROCESSED
      await this.reportSurfaceService.acceptReportSurface(
        requestEditSurface.reportSurface.id,
      );

      return await this.findRequestEditSurfaceById(id);
    } catch (error) {
      throw error;
    }
  }

  //Decline request edit surface
  async declineRequestEditSurface(id: number) {
    try {
      const requestEditSurface = await this.findRequestEditSurfaceById(id);
      if (!requestEditSurface) {
        throw new Error('Request edit surface not found');
      }
      await this.requestEditSpaceRepository.update(id, {
        state: RequestState.DECLINED,
      });

      //Caap nhat state cua report surface thanh REJECTED
      await this.reportSurfaceService.declineReportSurface(
        requestEditSurface.reportSurface.id,
      );
    } catch (error) {
      throw error;
    }
  }

  //Sendmail to user when request edit surface is accepted and update state to report surface
  async sendMailToUserWhenRequestEditSurfaceIsAccepted(id: number) {
    try {
      //Cập nhật state của request edit surface thành ACCEPTED
      const requestEditAccept = await this.acceptRequestEditSurface(id);

      const { height, width, imgUrl, expiryDate, surfaceType, reportSurface } =
        requestEditAccept;

      const surfaceBeforeAccept = await this.surfaceService.findById(
        reportSurface.surface.id,
      );
      //Cập nhật lại data cho surface
      const surfaceAferAccept = await this.surfaceService.updateSurface(
        surfaceBeforeAccept.id,
        {
          height: height,
          width: width,
          imgUrl: imgUrl,
          expiryDate: expiryDate,
          surfaceType: surfaceType,
          space: surfaceBeforeAccept.space,
        },
      );

      //Cập nhật state của report surface thành PROCESSED
      await this.reportSurfaceService.acceptReportSurface(reportSurface.id);

      //Gửi mail thông báo cho người dùng
      const emailData = {
        email: reportSurface.email,
        name: reportSurface.name,
        state: reportSurface.state,
      };

      const htmlFilePath = path.join(
        __dirname,
        '../../src/templates/email/processedEmail.html',
      );
      let htmlContent = fs.readFileSync(htmlFilePath, 'utf8');
      for (const key in emailData) {
        const regex = new RegExp(`{{${key}}}`, 'g');
        htmlContent = htmlContent.replace(regex, emailData[key]);
      }

      await this.mailerService.sendMail({
        to: `${emailData.email}`, // Địa chỉ email người nhận
        subject: 'Report the results you provided', // Tiêu đề của email
        // html: `<p>Dear ${emailData.name},</p>
        // <p>You have selected <a href="mailto:xxxxx@gmail.com">xxxxx@gmail.com</a> as your new Apple ID email address. To verify this email address belongs to you, enter the code below on the Apple ID website, verification page:</p>
        // <p><strong>${emailData.state}</strong></p>
        // <p>This code will expire three hours after this email was sent.</p>
        // <p><em>Why you received this email.</em><br/>
        // Apple requires verification whenever an email address is selected as an Apple ID.</p>
        // <p>If you did not make this request, you can ignore this email or report it to Apple Support.</p>
        // `, // Nội dung của email (HTML)
        html: htmlContent,
      });
    } catch (error) {
      throw error;
    }
  }
}
