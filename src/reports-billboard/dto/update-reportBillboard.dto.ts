import { FormReport } from "src/entity/form-report.entity";
import { Surfaces } from "src/entity/surfaces.entity";

export class UpdateReportBillboard {
  name: string;
  email: string;
  phone: string;
  content: string;
  imgUrl: string;
  formReport: FormReport;
  surface: Surfaces;
}
