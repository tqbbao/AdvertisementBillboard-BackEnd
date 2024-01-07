import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpCode,
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
import { ApiBody, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';


@ApiTags('request-space')
@Controller('request-space')
export class RequestSpaceController {
  constructor(private readonly requestSpaceService: RequestSpaceService) {}

  //Find all request edit space
  @Get()
  @HttpCode(200)
  @ApiOperation({ summary: 'Danh sách request edit space' })
  @ApiQuery({ name: 'pagination', type: PaginationRequestSpace, required: false })
  async findAll() {
    return await this.requestSpaceService.findAll();
  }
  //Find all request edit space by area
  @Get('/area')
  @HttpCode(200)
  @ApiOperation({ summary: 'Danh sách request edit space theo khu vực' })
  @ApiQuery({ name: 'pagination', type: PaginationRequestSpace, required: false })
  async findAllByArea(@Query() pagination: PaginationRequestSpace) {
    return await this.requestSpaceService.findAllByArea(pagination);
  }
  //Find request edit space by id
  @Get('/:id')
  @HttpCode(200)
  @ApiOperation({ summary: 'Chi tiết request edit space' })
  @ApiQuery({ name: 'id', type: Number, required: true })
  async findRequestEditSpaceById(@Param('id', ParseIntPipe) id: number) {
    return await this.requestSpaceService.findRequestEditSpaceById(id);
  }

  //Create a new request edit space
  @Post()
  @HttpCode(201)
  @ApiOperation({ summary: 'Tạo request edit space' })
  @ApiBody({ type: CreateRequestSpaceDto })
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
  @HttpCode(200)
  @ApiOperation({ summary: 'Duyet request edit space' })
  @ApiQuery({ name: 'id', type: Number, required: true })
  async acceptRequestEditSpace(@Param('id', ParseIntPipe) id: number) {
    return await this.requestSpaceService.acceptRequestEditSpace(id);
  }

  //Decline request edit space
  @Post('/decline/:id')
  @HttpCode(200)
  @ApiOperation({ summary: 'Tu choi request edit space' })
  @ApiQuery({ name: 'id', type: Number, required: true })
  async declineRequestEditSpace(@Param('id', ParseIntPipe) id: number) {
    return await this.requestSpaceService.declineRequestEditSpace(id);
  }

  //send Email To User Report Space
  @Post('/send-email/:id')
  @HttpCode(200)
  @ApiOperation({ summary: 'Gửi email cho user khi request edit space được duyệt' })
  @ApiQuery({ name: 'id', type: Number, required: true })
  async sendEmailToUserReportSpace(@Param('id', ParseIntPipe) id: number) {
    return await this.requestSpaceService.sendMailToUserWhenRequestEditSpaceIsAccepted(
      id,
    );
  }
}
