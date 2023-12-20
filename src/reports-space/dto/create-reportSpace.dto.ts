import { FormReport } from 'src/entity/form-report.entity';
import { Spaces } from 'src/entity/spaces.entity';

export class CreateReportSpaceDto {
  name: string;
  email: string;
  phone: string;
  content: string;
  imgUrl: string;
  formReport: FormReport;
  space: Spaces;
}
