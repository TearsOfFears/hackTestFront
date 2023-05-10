export interface IFind {
  items: Item[];
  pageInfo: PageInfo;
}

export interface IItemQuestion {
  questionId: string;
  question: string;
  variants: string[];
  answerId: string;
  subjectId: string;
  createdAt: string;
  updatedAt: string;
  answer: Answer;
  subject: Subject;
}

export interface Answer {
  answerId: string;
  answerChatGpt: string;
  answerFromHuman: string;
  isHumanValidAnswer: boolean;
  isGptValidAnswer: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Subject {
  subjectId: string;
  title: string;
  universityId: string;
  createdAt: string;
  updatedAt: string;
}

export interface PageInfo {
  pageTotal: number;
  pageSize: number;
  pageIndex: number;
}
