import { RequestState } from "src/common/enums/request-state.enum";

export class PaginationRequestSpace {
    page: number;
    limit: number;
    ward: number;
    district: number;
    state: RequestState;
}