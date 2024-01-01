import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TempSpace } from 'src/entity/tempSpace.entity';
import { LEGAL_TCP_SOCKET_OPTIONS, Repository } from 'typeorm';
import { UpdateTempSpaceDto } from './dto/update-temp-space.dto';
import { CreateTempSpaceDto } from './dto/create-temp-space.dto';
import { SpacesService } from 'src/spaces/spaces.service';
import { RequestState } from 'src/common/enums/request-state.enum';
import { Pagination } from './dto/pagination';

@Injectable()
export class TempSpaceService {
  constructor(
    @InjectRepository(TempSpace)
    private tempSpacesRepository: Repository<TempSpace>,

    private readonly spacesService: SpacesService,
  ) {}

  //Create temp space condition update
  //Condition update: thì sẽ cập nhật giá trị space: space
  async createTempSpaceConditionUpdate(data: UpdateTempSpaceDto) {
    try {
      //console.log(data);
      const dataTempSpace = this.tempSpacesRepository.create(data);
      return await this.tempSpacesRepository.save(dataTempSpace);
    } catch (error) {}
  }

  //Create temp space condition create
  //Condition create: thì sẽ cập nhật giá trị space: null
  async createTempSpaceConditionCreate(data: CreateTempSpaceDto) {
    try {
      //console.log(data);
      const dataTempSpace = this.tempSpacesRepository.create(data);
      return await this.tempSpacesRepository.save(dataTempSpace);
    } catch (error) {}
  }

  //Find temp space by id
  async findTempSpaceById(id: number) {
    try {
      return await this.tempSpacesRepository.findOne({ where: { id: id } });
    } catch (error) {}
  }

  //Find all temp space with state pending
  async findAllTempSpacePending(pagination: Pagination) {
    try {
      return await this.tempSpacesRepository.find({
        where: { state: pagination.state },
      });
    } catch (error) {}
  }

  //Update state temp space when aceept
  async updateStateTempSpace(id: number) {
    try {
      const tempSpace = await this.findTempSpaceById(id);
      if (!tempSpace) {
        throw new Error('Request edit space not found');
      }
      const data = { ...tempSpace, state: RequestState.ACCEPTED };
      return await this.tempSpacesRepository.save(data);
    } catch (error) {}
  }

  //Update state tmep space when reject
  async rejectTempSpace(id: number) {
    try {
      const tempSpace = await this.findTempSpaceById(id);
      if (!tempSpace) {
        throw new Error('Request edit space not found');
      }
      const data = { ...tempSpace, state: RequestState.DECLINED };
      await this.tempSpacesRepository.save(data);
      return {
        message: 'Reject temp space successfully',
      };
    } catch (error) {}
  }

  //Decine temp space all
  async declineTempSpaceAll(id: number) {
    try {
      const tempSpace = await this.findTempSpaceById(id);
      if (!tempSpace) {
        throw new Error('Request edit space not found');
      }
      await this.rejectTempSpace(tempSpace.id);
      return {
        message: 'Decline temp space successfully',
      };
    } catch (error) {}
  }

  //Accept temp space all
  async acceptTempSpaceAll(id: number) {
    try {
      const tempSpace = await this.findTempSpaceById(id);
      if (!tempSpace) {
        throw new Error('Request edit space not found');
      }
      console.log(tempSpace);
      const data = {
        address: tempSpace.address,
        reason: tempSpace.reason,
        latitude: tempSpace.latitude,
        longitude: tempSpace.longitude,
        imgUrl: tempSpace.imgUrl,
        zone: tempSpace.zone,
        formAdvertising: tempSpace.formAdvertising,
        locationTypes: tempSpace.locationTypes,
        district: tempSpace.district,
        ward: tempSpace.ward,
      };
      if (tempSpace.space) {
        //Kiểm tra condition update hay condition create
        console.log(tempSpace.space);
        //Condition update
        //Cập nhật lại giá trị của space
        const spaceUpdate = await this.spacesService.updateSpace(
          tempSpace.space.id,
          data,
        );
        await this.updateStateTempSpace(tempSpace.id);
      } else {
        console.log('nul');
        //Condition create
        //Tạo mới space
        const spaceCreate = await this.spacesService.createSpace(data);
        await this.updateStateTempSpace(tempSpace.id);
      }
      return {
        message: 'Accept temp space successfully',
      };
    } catch (error) {}
  }
}
