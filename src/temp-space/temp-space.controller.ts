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
import { TempSpaceService } from './temp-space.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerOptions } from 'src/common/multer/config';
import { UpdateTempSpaceDto } from './dto/update-temp-space.dto';
import { CreateTempSpaceDto } from './dto/create-temp-space.dto';

@Controller('temp-space')
export class TempSpaceController {
  constructor(private tempSpaceService: TempSpaceService) {}

  //Create temp space condition update space
  @Post('/condition-update')
  @UseInterceptors(FileInterceptor('imgUrl', multerOptions('spaces')))
  async createTempSpace(
    @Req() req: any,
    @Body() data: UpdateTempSpaceDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (req.fileValidationError) {
      throw new BadRequestException(req.fileValidationError);
    }
    if (!file) {
      throw new BadRequestException('File is required');
    }
    const fullFilePath = `${file.destination}/${file.filename}`;
    return await this.tempSpaceService.createTempSpaceConditionUpdate({
      ...data,
      imgUrl: fullFilePath,
    });
  }

  //Create temp space condition create space
  @Post('/condition-create')
  @UseInterceptors(FileInterceptor('imgUrl', multerOptions('spaces')))
  async createTempSpaceConditionCreate(
    @Req() req: any,
    @Body() data: CreateTempSpaceDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (req.fileValidationError) {
      throw new BadRequestException(req.fileValidationError);
    }
    if (!file) {
      throw new BadRequestException('File is required');
    }
    const fullFilePath = `${file.destination}/${file.filename}`;
    return await this.tempSpaceService.createTempSpaceConditionCreate({
      ...data,
      imgUrl: fullFilePath,
    });
  }

  //Accept temp space 
  @Get('/accept/:id')
    async acceptTempSpace(@Param('id', ParseIntPipe) id: number) {
        return await this.tempSpaceService.acceptTempSpaceAll(id);
    }

}
