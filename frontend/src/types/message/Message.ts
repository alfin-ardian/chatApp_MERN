import { type Meta, type Pagination } from "..";

export interface MessageData {
  id: string;
}

export interface MessageFetchState {
  loading: boolean;
  data: any | null;
  error: string | null;
}

export interface MessageFetchAction {
  type: string;
  data: any | null;
}

export interface MessageResponse {
  meta: Meta;
  data: any | null;
  paginate: Pagination;
}
