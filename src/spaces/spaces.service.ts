import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Spaces } from 'src/entity/spaces.entity';
import { Not, Repository } from 'typeorm';
import { Pagination } from './dto/pagination';
import { CreateSpaceDto } from './dto/create-space.dto';
import { UpdateSpaceDto } from './dto/update-space.dto';
import { removeFile } from 'src/common/multer/config';
import { ReverseGeocodingService } from 'src/reverse-geocoding/reverse-geocoding.service';
import { MailerService } from '@nestjs-modules/mailer';
import { CustomException } from 'src/common/exceptions/customException';

@Injectable()
export class SpacesService {
  constructor(
    @InjectRepository(Spaces)
    private spacesRepository: Repository<Spaces>,
    private readonly rere: ReverseGeocodingService,
    private mailerService: MailerService,
  ) {}

  async reverseGeocoding(lat: number, long: number) {
    const dataGeocoding = await this.rere.reverseGeocoding(lat, long);
    console.log(dataGeocoding);

    // const result = await this.mailerService.sendMail({
    //   to: 'tempsampleindex123@gmail.com', // Địa chỉ email người nhận
    //   subject: 'Subject of the Email', // Tiêu đề của email
    //   html: '<p>Content of the Email</p>', // Nội dung của email (HTML)
    // });
    return dataGeocoding;
  }

  //find all space where space is present in report_space
  async findAllSpaceInReportSpace(pagination: Pagination) {
    // Giới hạn 1 page bao nhiêu item
    const limit = Number(pagination.limit) || 100000;
    // Số page hiện tại
    const page = Number(pagination.page) || 1;
    // Tính skip bao nhiêu item
    const skip = (page - 1) * limit;
    // try {
    //   const temp =  await this.spacesRepository
    //     .createQueryBuilder('spaces')
    //     .innerJoinAndSelect('spaces.reportSpaces', 'reportSpaces')
    //     .getMany();

    //   return temp;

    // } catch (error) {
    //   throw new CustomException(error.message, 400);
    // }
    try {
      const [data, total] = await this.spacesRepository
        .createQueryBuilder('spaces')
        .innerJoinAndSelect('spaces.reportSpaces', 'reportSpaces')
        .innerJoinAndSelect('spaces.formAdvertising', 'formAdvertising') 
        .innerJoinAndSelect('spaces.locationTypes', 'locationTypes') 
        .innerJoinAndSelect('spaces.ward', 'ward')
        .innerJoinAndSelect('spaces.district', 'district')
        .select([
          'spaces.id',
          'spaces.address',
          'spaces.latitude',
          'spaces.longitude',
          'spaces.imgUrl',
          'spaces.zone',
          'spaces.createdAt',
          'spaces.lastUpdate',
          'spaces.deletedAt',
          'formAdvertising.id',
          'formAdvertising.name',
          'formAdvertising.createdAt',
          'formAdvertising.lastUpdate',
          'formAdvertising.deletedAt',
          'locationTypes.id',
          'locationTypes.name',
          'locationTypes.createdAt',
          'locationTypes.lastUpdate',
          'locationTypes.deletedAt',
          'ward.id',
          'ward.name',
          'ward.idGeo',
          'ward.createdAt',
          'ward.lastUpdate',
          'ward.deletedAt',
          'ward.district',
          'district.id',
          'district.name',
          'district.latitude',
          'district.longitude',
          'district.idGeo',
          'district.createdAt',
          'district.lastUpdate',
          'district.deletedAt',
        ])
        .skip(skip)
        .take(limit)
        .getManyAndCount();


      // Tính số page cuối cùng
      const lastPage = Math.ceil(total / limit);
      // Tính next page
      const nextPage = page + 1 > lastPage ? null : page + 1;
      // Tính prev page
      const prevPage = page - 1 < 1 ? null : page - 1;
      return {
        data,
        pagination: {
          totalPage: total,
          currentPage: page,
          lastPage,
          nextPage,
          prevPage,
        },
      };
    } catch (error) {
      throw new CustomException(error.message, 400);
    }
  }

  async findAll(pagination: Pagination) {
    // Giới hạn 1 page bao nhiêu item
    const limit = Number(pagination.limit) || 10;
    // Số page hiện tại
    const page = Number(pagination.page) || 1;
    // Tính skip bao nhiêu item
    const skip = (page - 1) * limit;

    //
    const [data, total] = await this.spacesRepository.findAndCount({
      relations: {
        formAdvertising: true,
        locationTypes: true,
      },
      take: limit,
      skip: skip,
    });

    // Tính số page cuối cùng
    const lastPage = Math.ceil(total / limit);
    // Tính next page
    const nextPage = page + 1 > lastPage ? null : page + 1;
    // Tính prev page
    const prevPage = page - 1 < 1 ? null : page - 1;

    return {
      data,
      pagination: {
        totalPage: total,
        currentPage: page,
        lastPage,
        nextPage,
        prevPage,
      },
    };
  }

  //Find all spaces by area
  async findAllByArea(pagination: Pagination) {
    const ward = pagination.ward;
    const district = pagination.district;

    return await this.spacesRepository.find({
      where: [{ district: { id: district } }, { ward: { id: ward } }],
      relations: {
        formAdvertising: true,
        locationTypes: true,
        ward: true,
        district: true,
      },
    });
  }

  //Find by (lat, long)
  async findByLatLong(lat: number, long: number) {
    return await this.spacesRepository.findOne({
      where: {
        latitude: lat,
        longitude: long,
      },
      relations: {
        formAdvertising: true,
        locationTypes: true,
      },
    });
  }

  //Find by id
  async findById(id: number) {
    return await this.spacesRepository.findOne({
      where: {
        id: id,
      },
      relations: {
        formAdvertising: true,
        locationTypes: true,
      },
    });
  }

  //Create new space
  async createSpace(data: CreateSpaceDto) {
    try {
      const space = await this.spacesRepository.create(data);
      return await this.spacesRepository.save(space);
    } catch (error) {
      throw error;
    }
  }

  //Update space
  async updateSpace(id: number, data: UpdateSpaceDto) {
    try {
      let space = await this.findById(id);
      if (!space) {
        removeFile(data.imgUrl);
        throw new NotFoundException('Space not found');
      }
      removeFile(space.imgUrl);
      space = { ...space, ...data };
      return await this.spacesRepository.save(space);
    } catch (error) {
      throw error;
    }
  }

  //Soft Delete space (Remove)
  async removeSpace(id: number) {
    try {
      let space = await this.findById(id);
      if (!space) {
        throw new NotFoundException('Space not found');
      }
      return await this.spacesRepository.softDelete(id);
    } catch (error) {
      throw error;
    }
  }

  //Restore space
  async restoreSpace(id: number) {
    try {
      return await this.spacesRepository.restore(id);
    } catch (error) {
      throw error;
    }
  }
}
