import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Req,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { RequestSurfaceService } from './request-surface.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerOptions } from 'src/common/multer/config';
import { CreateRequestSurfaceDto } from './dto/create-requestSurface.dto';

@Controller('request-surface')
export class RequestSurfaceController {
  constructor(private readonly requestSurfaceService: RequestSurfaceService) {}

  //Find all request edit surface
  @Get()
  async findAll() {
    return await this.requestSurfaceService.findAll();
  }
  //Find request edit surface by id
  @Get('/:id')
  async findRequestEditSurfaceById(@Param('id', ParseIntPipe) id: number) {
    const requestEditSurface =
      await this.requestSurfaceService.findRequestEditSurfaceById(id);
    if (!requestEditSurface) {
      return [];
    }
    return requestEditSurface;
  }

  @Post()
  @UseInterceptors(FileInterceptor('imgUrl', multerOptions('request-surface')))
  async createRequestEditSpace(
    @Req() req: any,
    @Body() data: CreateRequestSurfaceDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (req.fileValidationError) {
      throw new BadRequestException(req.fileValidationError);
    }
    if (!file) {
      throw new BadRequestException('File is required');
    }
    const fullFilePath = `${file.destination}/${file.filename}`;
    return await this.requestSurfaceService.createRequestEditSurface({
      ...data,
      imgUrl: fullFilePath,
    });
  }

  //Accept request edit surface
  @Post('/accept/:id')
  async acceptRequestEditSurface(@Param('id', ParseIntPipe) id: number) {
    return await this.requestSurfaceService.acceptRequestEditSurface(id);
  }

  //Decline request edit surface
  @Post('/decline/:id')
  async declineRequestEditSurface(@Param('id', ParseIntPipe) id: number) {
    return await this.requestSurfaceService.declineRequestEditSurface(id);
  }

  //send Email To User Report Surface
    @Post('/send-email/:id')
    async sendEmailToUserReportSurface(@Param('id', ParseIntPipe) id: number) {
      return await this.requestSurfaceService.sendMailToUserWhenRequestEditSurfaceIsAccepted(id);
    }
}
