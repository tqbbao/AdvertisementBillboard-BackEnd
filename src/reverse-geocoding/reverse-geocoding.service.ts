import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { DistrictsService } from 'src/districts/districts.service';
import { WardsService } from 'src/wards/wards.service';

@Injectable()
export class ReverseGeocodingService {
  constructor(
    private readonly httpService: HttpService,
    private readonly wardsService: WardsService,
    private readonly districtsService: DistrictsService,
  ) {}
  async reverseGeocoding(lat: number, long: number) {
    const dataGeocoding = this.httpService
      .get(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${long},${lat}.json?access_token=pk.eyJ1Ijoibmh1dHBoYW1kZXYiLCJhIjoiY2xvbGcwZm5sMG1lMDJpbnJuemNmYm1xYyJ9.w9hEet44dcjmTnu7LWUkWQ`,
      )
      .toPromise();
    //   .pipe(map((response) => response.data));

    const resultGeoCoding = (await dataGeocoding).data;
    // //Latitude and longitude
    // const [longitude, latitude] = resultGeoCoding.query;
    // //Ward 
    // const wardId = await this.wardsService.findByIdGeo(resultGeoCoding.features[1].id);
    // const ward = {
    //   id: wardId[0].id,
    //   name: resultGeoCoding.features[1].text,
    // };
    // //District
    // const districtId = await this.districtsService.findByIdGeo(resultGeoCoding.features[3].id);
    // const district = {
    //   id: districtId[0].id,
    //   name: resultGeoCoding.features[3].text,
    // };
    // //Address
    // const address = resultGeoCoding.features[0].properties.address? resultGeoCoding.features[0].properties.address : resultGeoCoding.features[0].place_name;

    // //Full address
    // const fullAddress = `${address}, ${ward.name}, ${district.name}`;

    return {
      phuong: resultGeoCoding.features[1].id,
      quan: resultGeoCoding.features[3].id,
      namephuong: resultGeoCoding.features[1].text,
      namequan: resultGeoCoding.features[3].text,

      // latitude,
      // longitude,
      // ward,
      // district,
      // address,
      // fullAddress,
    }
  }
}
