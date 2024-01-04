import { RequestState } from "src/common/enums/request-state.enum";

export class Pagination {
    page: number;
    limit: number;
    state: RequestState;
}