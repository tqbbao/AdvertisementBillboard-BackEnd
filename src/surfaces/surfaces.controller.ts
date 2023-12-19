import { Controller, Get } from '@nestjs/common';
import { SurfacesService } from './surfaces.service';

@Controller('surfaces')
export class SurfacesController {
    constructor(
        private surfacesService: SurfacesService,
    ) {}


    @Get()
    async findAll() {
        return await this.surfacesService.findAll();
    }
}
