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
import { RequestSpaceService } from './request-space.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerOptions } from 'src/common/multer/config';
import { CreateRequestSpaceDto } from './dto/create-requestSpace.dto';

@Controller('request-space')
export class RequestSpaceController {
  constructor(private readonly requestSpaceService: RequestSpaceService) {}

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

  //Find request edit space by id
  @Get('/:id')
  async findRequestEditSpaceById(@Param('id', ParseIntPipe) id: number,) {
    return await this.requestSpaceService.findRequestEditSpaceById(id);
  }
}
