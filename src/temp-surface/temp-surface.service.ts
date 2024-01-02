import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TempSurface } from 'src/entity/tempSurface.entity';
import { Repository } from 'typeorm';
import { UpdateTempSurfaceDto } from './dto/update-temp-surface.dto';
import { CreateTempSurfaceDto } from './dto/create-temp-surface.dto';
import { SurfacesService } from 'src/surfaces/surfaces.service';
import { Pagination } from './dto/pagination';
import { RequestState } from 'src/common/enums/request-state.enum';

@Injectable()
export class TempSurfaceService {
  constructor(
    @InjectRepository(TempSurface)
    private tempSurfaceRepository: Repository<TempSurface>,

    private readonly surfaceService: SurfacesService,
  ) {}

  //Find all temp surface by space id
  async findAllTempSurfaceBySpaceId(spaceId: number) {
    try {
      return await this.tempSurfaceRepository.find({
        where: {
          space: {
            id: spaceId,
          },
        }
      });
    } catch (error) {}
  }

  //Create temp surface condition update
  //Condition update: thì sẽ cập nhật giá trị surface: surface
  async createTempSurfaceConditionUpdate(data: UpdateTempSurfaceDto) {
    try {
      const dataTempSurface = this.tempSurfaceRepository.create(data);
      return await this.tempSurfaceRepository.save(dataTempSurface);
    } catch (error) {}
  }

  //Create temp surface condition create
  //Condition create: thì sẽ cập nhật giá trị surface: null
  async createTempSurfaceConditionCreate(data: CreateTempSurfaceDto) {
    try {
      const dataTempSurface = this.tempSurfaceRepository.create(data);
      return await this.tempSurfaceRepository.save(dataTempSurface);
    } catch (error) {}
  }

  //Delete temp surface by id
  async deleteTempSurfaceById(id: number) {
    try {
      const tempSurface = await this.findTempSurfaceById(id);
      if (!tempSurface) {
        throw new Error('Request edit space not found');
      }
      return await this.tempSurfaceRepository.delete({ id: id });
    } catch (error) {}
  }

  //Find temp surface by id
  async findTempSurfaceById(id: number) {
    try {
      return await this.tempSurfaceRepository.findOne({ where: { id: id } });
    } catch (error) {}
  }

  //Find all temp surface with state pending
  async findAllTempSurfacePending(pagination: Pagination) {
    try {
      return await this.tempSurfaceRepository.find({
        where: { state: pagination.state },
      });
    } catch (error) {}
  }

  //Update state temp surface when aceept
  async updateStateTempSurface(id: number) {
    try {
      const tempSurface = await this.findTempSurfaceById(id);
      if (!tempSurface) {
        throw new Error('Request edit space not found');
      }
      const data = { ...tempSurface, state: RequestState.ACCEPTED };
      return await this.tempSurfaceRepository.save(data);
    } catch (error) {}
  }

  //Update state temp surface when reject
  async rejectStateTempSurface(id: number) {
    try {
      const tempSurface = await this.findTempSurfaceById(id);
      if (!tempSurface) {
        throw new Error('Request edit space not found');
      }
      const data = { ...tempSurface, state: RequestState.DECLINED };
      await this.tempSurfaceRepository.save(data);
      return {
        message: 'Reject temp surface successfully',
      };
    } catch (error) {}
  }

  //Decline temp surface all
  async declineTempSurfaceAll(id: number) {
    try {
      const tempSurface = await this.findTempSurfaceById(id);
      if (!tempSurface) {
        throw new Error('Request edit space not found');
      }
      await this.rejectStateTempSurface(tempSurface.id);
      return {
        message: 'Reject temp surface all successfully',
      };
    } catch (error) {}
  }

  //Accept temp surface all
  async acceptTempSurfaceAll(id: number) {
    try {
      const tempSurface = await this.findTempSurfaceById(id);
      if (!tempSurface) {
        throw new Error('Request edit space not found');
      }
      console.log(tempSurface);
      const data = {
        height: tempSurface.height,
        width: tempSurface.width,
        imgUrl: tempSurface.imgUrl,
        expiryDate: tempSurface.expiryDate,
        surfaceType: tempSurface.surfaceType,
        space: tempSurface.space,
      };
      if (tempSurface.surface) {
        //Kiểm tra condition update hay condition create
        console.log(tempSurface.surface);
        //Condition update
        //Cập nhật lại giá trị của surface
        const surfaceUpdate = await this.surfaceService.updateSurface(
          tempSurface.surface.id,
          data,
        );
        await this.updateStateTempSurface(tempSurface.id);
      } else {
        console.log('null');
        //Condition create
        //Tạo mới surface
        const surfaceCreate = await this.surfaceService.createSurface(data);
        await this.updateStateTempSurface(tempSurface.id);
      }
    } catch (error) {}
  }
}
