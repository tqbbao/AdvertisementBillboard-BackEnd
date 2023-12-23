import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { WardsService } from 'src/wards/wards.service';

@Injectable()
export class ReverseGeocodingService {
  constructor(
    private readonly httpService: HttpService,
    private readonly wardsService: WardsService,
  ) {}
  async reverseGeocoding(lat: number, long: number) {
    const dataGeocoding = this.httpService
      .get(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${long},${lat}.json?access_token=pk.eyJ1Ijoibmh1dHBoYW1kZXYiLCJhIjoiY2xvbGcwZm5sMG1lMDJpbnJuemNmYm1xYyJ9.w9hEet44dcjmTnu7LWUkWQ`,
      )
      .toPromise();
    //   .pipe(map((response) => response.data));

    const re = (await dataGeocoding).data;
    const [longitude, latitude] = re.query;
    const address = re.features[0].properties.address;
    const wardName = re.features[0].context[0].text;
    const districtName = re.features[0].context[2].text;
    const fullAddress = `${address}, ${wardName}, ${districtName}`;

    //const wardData = await this.wardsService.findByName(wardName);
    return {
      latitude,
      longitude,
      address,
      // ward: {id: wardData.id},
      wardName,
      // district: {id: wardData.district.id},
      districtName,
      fullAddress,
    };
  }
}
