import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TempSpace } from 'src/entity/tempSpace.entity';
import { LEGAL_TCP_SOCKET_OPTIONS, Repository } from 'typeorm';
import { UpdateTempSpaceDto } from './dto/update-temp-space.dto';
import { CreateTempSpaceDto } from './dto/create-temp-space.dto';
import { SpacesService } from 'src/spaces/spaces.service';
import { RequestState } from 'src/common/enums/request-state.enum';

@Injectable()
export class TempSpaceService {
  constructor(
    @InjectRepository(TempSpace)
    private spacesRepository: Repository<TempSpace>,

    private readonly spacesService: SpacesService,
  ) {}

  //Create temp space condition update
  //Condition update: thì sẽ cập nhật giá trị space: space
  async createTempSpaceConditionUpdate(data: UpdateTempSpaceDto) {
    try {
      //console.log(data);
      const dataTempSpace = this.spacesRepository.create(data);
      return await this.spacesRepository.save(dataTempSpace);
    } catch (error) {}
  }

  //Create temp space condition create
  //Condition create: thì sẽ cập nhật giá trị space: null
  async createTempSpaceConditionCreate(data: CreateTempSpaceDto) {
    try {
      //console.log(data);
      const dataTempSpace = this.spacesRepository.create(data);
      return await this.spacesRepository.save(dataTempSpace);
    } catch (error) {}
  }

  //Find temp space by id
  async findTempSpaceById(id: number) {
    try {
      return await this.spacesRepository.findOne({ where: { id: id } });
    } catch (error) {}
  }

  //Update state temp space when aceept
    async updateStateTempSpace(id: number) {
        try {
        const tempSpace = await this.findTempSpaceById(id);
        if (!tempSpace) {
            throw new Error('Request edit space not found');
        }
        const data = {...tempSpace, state: RequestState.ACCEPTED}
        return await this.spacesRepository.save(data);
        } catch (error) {}
    }

  //Accept temp space all
  async acceptTempSpaceAll(id: number) {
    try {
      const tempSpace = await this.findTempSpaceById(id);
      if (!tempSpace) {
        throw new Error('Request edit space not found');
      }

      //Kiểm tra condition update hay condition create
      if (tempSpace.space) {
        console.log(tempSpace.space)
        //Condition update
        //Cập nhật lại giá trị của space
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

        const spaceUpdate = await this.spacesService.updateSpace(tempSpace.space.id, data);

        await this.updateStateTempSpace(tempSpace.id);
        console.log(spaceUpdate);

      } else {
        //Condition create
        //Tạo mới space
      }

      return await this.spacesRepository.find();
    } catch (error) {}
  }
}
