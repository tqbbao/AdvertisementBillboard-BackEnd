import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RequestEditSpace } from 'src/entity/requestEditSpace.entity';
import { Repository } from 'typeorm';
import { CreateRequestSpaceDto } from './dto/create-requestSpace.dto';
import { UpdateRequestSpaceDto } from './dto/update-requestSpace.dto';
import { RequestState } from 'src/common/enums/request-state.enum';
import { MailerService } from '@nestjs-modules/mailer';
import { ReportsSpaceService } from 'src/reports-space/reports-space.service';
import { SpacesService } from 'src/spaces/spaces.service';

@Injectable()
export class RequestSpaceService {
  constructor(
    @InjectRepository(RequestEditSpace)
    private readonly requestEditSpaceRepository: Repository<RequestEditSpace>,
    private mailerService: MailerService,
    private readonly reportsSpaceService: ReportsSpaceService,
    private readonly spacesService: SpacesService,
  ) {}

  //Create a new request edit space
  async createRequestEditSpace(data: CreateRequestSpaceDto) {
    try {
      const requestEditSpace = this.requestEditSpaceRepository.create(data);
      return await this.requestEditSpaceRepository.save(requestEditSpace);
    } catch (error) {
      throw error;
    }
  }

  //Find request edit space by id
  async findRequestEditSpaceById(id: number) {
    return await this.requestEditSpaceRepository.findOne({
      where: { id: id },
      relations: {
        formAdvertising: true,
        locationTypes: true,
        ward: true,
        district: true,
      },
    });
  }

  // Aceept request edit space
  async acceptRequestEditSpace(id: number) {
    try {
      const requestEditSpace = await this.findRequestEditSpaceById(id);
      if (!requestEditSpace) {
        throw new Error('Request edit space not found');
      }
      await this.requestEditSpaceRepository.update(id, {
        state: RequestState.ACCEPTED,
      });

      return await this.findRequestEditSpaceById(id);
    } catch (error) {
      throw error;
    }
  }

  // Decline request edit space
  async declineRequestEditSpace(id: number) {
    try {
      //Cập nhật state của request edit space thành ACCEPTED
      const requestEditSpace = await this.findRequestEditSpaceById(id);
      if (!requestEditSpace) {
        throw new Error('Request edit space not found');
      }
      await this.requestEditSpaceRepository.update(id, {
        state: RequestState.DECLINED,
      });
    } catch (error) {
      throw error;
    }
  }

  // Sendmail to user when request edit space is accepted and update state to report space
  async sendMailToUserWhenRequestEditSpaceIsAccepted(id: number) {
    try {
      //Cập nhật state của request edit space thành ACCEPTED
      const requestEditAccept = await this.acceptRequestEditSpace(id);

      const {
        address,
        latitude,
        longitude,
        imgUrl,
        zone,
        formAdvertising,
        locationTypes,
        ward,
        district,
        reportSpace,
      } = requestEditAccept;

      const spaceBeforeAccept = await this.spacesService.findById(
        reportSpace.space.id,
      );

      //Cập nhật lại data cho space
      const spaceAfterAccept = await this.spacesService.updateSpace(
        reportSpace.space.id,
        {
          address: address,
          latitude: latitude,
          longitude: longitude,
          imgUrl: imgUrl,
          zone: zone,
          formAdvertising: formAdvertising,
          locationTypes: locationTypes,
          ward: ward,
          district: district,
        },
      );

      //Cập nhật state của report space thành PROCESSED
      await this.reportsSpaceService.acceptReportSpace(reportSpace.id);

      //Gửi mail cho user

      const emailData = {
        email: reportSpace.email,
        name: reportSpace.name,
        state: reportSpace.state,

      };


      await this.mailerService.sendMail({
        to: `${emailData.email}`, // Địa chỉ email người nhận
        subject: 'Report the results you provided', // Tiêu đề của email
        html: `<p>Dear ${emailData.name},</p>
        <p>You have selected <a href="mailto:xxxxx@gmail.com">xxxxx@gmail.com</a> as your new Apple ID email address. To verify this email address belongs to you, enter the code below on the Apple ID website, verification page:</p>
        <p><strong>${emailData.state}</strong></p>
        <p>This code will expire three hours after this email was sent.</p>
        <p><em>Why you received this email.</em><br/>
        Apple requires verification whenever an email address is selected as an Apple ID.</p>
        <p>If you did not make this request, you can ignore this email or report it to Apple Support.</p>
        `, // Nội dung của email (HTML)
      });


    } catch (error) {
      throw error;
    }
  }
}
