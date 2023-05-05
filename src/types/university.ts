export interface IList {
  items: IItem[];
  pageInfo: IPageInfo;
}

export interface IItem {
  universityId: string;
  title: string;
  createdAt: string;
  updatedAt: string;
}

export interface IPageInfo {
  pageTotal: number;
  pageSize: number;
  pageIndex: number;
}
