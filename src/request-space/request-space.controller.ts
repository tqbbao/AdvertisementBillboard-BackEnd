import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
  Req,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { RequestSpaceService } from './request-space.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerOptions } from 'src/common/multer/config';
import { CreateRequestSpaceDto } from './dto/create-requestSpace.dto';
import { UpdateRequestSpaceDto } from './dto/update-requestSpace.dto';
import { PaginationRequestSpace } from './dto/pagination';

@Controller('request-space')
export class RequestSpaceController {
  constructor(private readonly requestSpaceService: RequestSpaceService) {}

  //Find all request edit space
  @Get()
  async findAll() {
    return await this.requestSpaceService.findAll();
  }
  //Find all request edit space by area
  @Get('/area')
  async findAllByArea(@Query() pagination: PaginationRequestSpace) {
    return await this.requestSpaceService.findAllByArea(pagination);
  }
  //Find request edit space by id
  @Get('/:id')
  async findRequestEditSpaceById(@Param('id', ParseIntPipe) id: number) {
    return await this.requestSpaceService.findRequestEditSpaceById(id);
  }

  //Create a new request edit space
  @Post()
  @UseInterceptors(FileInterceptor('imgUrl', multerOptions('request-spaces')))
  async createRequestEditSpace(
    @Req() req: any,
    @Body() data: CreateRequestSpaceDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (req.fileValidationError) {
      throw new BadRequestException(req.fileValidationError);
    }
    if (!file) {
      throw new BadRequestException('File is required');
    }
    const fullFilePath = `${file.destination}/${file.filename}`;
    return await this.requestSpaceService.createRequestEditSpace({
      ...data,
      imgUrl: fullFilePath,
    });
  }

  // Aceept request edit space
  @Post('/accept/:id')
  async acceptRequestEditSpace(@Param('id', ParseIntPipe) id: number) {
    return await this.requestSpaceService.acceptRequestEditSpace(id);
  }

  //Decline request edit space
  @Post('/decline/:id')
  async declineRequestEditSpace(@Param('id', ParseIntPipe) id: number) {
    return await this.requestSpaceService.declineRequestEditSpace(id);
  }

  //send Email To User Report Space
  @Post('/send-email/:id')
  async sendEmailToUserReportSpace(@Param('id', ParseIntPipe) id: number) {
    return await this.requestSpaceService.sendMailToUserWhenRequestEditSpaceIsAccepted(
      id,
    );
  }
}
