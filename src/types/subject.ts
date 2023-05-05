export interface IFind {
  items: IItem[];
  pageInfo: IPageInfo;
}

export interface IItem {
  subjectId: string;
  title: string;
  universityId: string;
  createdAt: string;
  updatedAt: string;
  university: IUniversity;
}

export interface IUniversity {
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
