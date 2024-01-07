import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpCode,
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
import { ApiBody, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { Pagination } from 'src/spaces/dto/pagination';

@ApiTags('request-surface')
@Controller('request-surface')
export class RequestSurfaceController {
  constructor(private readonly requestSurfaceService: RequestSurfaceService) {}

  //Find all request edit surface
  @HttpCode(200)
  @ApiOperation({ summary: 'Danh sách request edit surface' })
  @ApiQuery({ name: 'pagination', type: Pagination, required: false })
  @Get()
  async findAll() {
    return await this.requestSurfaceService.findAll();
  }
  //Find request edit surface by id
  @HttpCode(200)
  @ApiOperation({ summary: 'Chi tiet request edit surface' })
  @ApiQuery({ name: 'id', type: Number, required: true })
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
  @HttpCode(201)
  @ApiOperation({ summary: 'Tạo request edit surface' })
  @ApiBody({ type: CreateRequestSurfaceDto })
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
  @HttpCode(200)
  @ApiOperation({ summary: 'Duyet request edit surface' })
  @ApiQuery({ name: 'id', type: Number, required: true })
  async acceptRequestEditSurface(@Param('id', ParseIntPipe) id: number) {
    return await this.requestSurfaceService.acceptRequestEditSurface(id);
  }

  //Decline request edit surface
  @Post('/decline/:id')
  @HttpCode(200)
  @ApiOperation({ summary: 'Tu choi request edit surface' })
  @ApiQuery({ name: 'id', type: Number, required: true })
  async declineRequestEditSurface(@Param('id', ParseIntPipe) id: number) {
    return await this.requestSurfaceService.declineRequestEditSurface(id);
  }

  //send Email To User Report Surface
  @Post('/send-email/:id')
  @HttpCode(200)
  @ApiOperation({ summary: 'Gui email den nguoi dung' })
  @ApiQuery({ name: 'id', type: Number, required: true })
  async sendEmailToUserReportSurface(@Param('id', ParseIntPipe) id: number) {
    return await this.requestSurfaceService.sendMailToUserWhenRequestEditSurfaceIsAccepted(id);
  }
}
