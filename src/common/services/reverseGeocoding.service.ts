import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { map } from 'rxjs';
import { WardsService } from 'src/wards/wards.service';

@Injectable()
export class ReverseGeocoding {
  constructor(private readonly httpService: HttpService) {}

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
    const ward = re.features[0].context[0].text;
    const district = re.features[0].context[2].text;
    const fullAddress = `${address}, ${ward}, ${district}`;

    return {
      latitude,
      longitude,
      address,
      ward,
      district,
      fullAddress,
    };
  }
}
