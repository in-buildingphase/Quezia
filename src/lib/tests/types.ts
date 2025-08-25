export type OptionId = 'A' | 'B' | 'C' | 'D';

export interface Option {
  id: OptionId;
  text: string;
}

export interface Question {
  id: string;
  text: string;
  options: Option[];
  correctId?: OptionId; // present only in dummy data (server wouldn't expose in prod)
}

export interface TestMeta {
  id: string;
  title: string;
  questionCount: number;
}

export interface TestPayload {
  id: string;
  title: string;
  questions: Question[];
}

export interface TestProgress {
  index: number; // 0-based
  selections: Record<string, OptionId | undefined>; // questionId -> optionId
  marked: Record<string, boolean>; // questionId -> marked for review
  startedAt: number;
  submittedAt?: number;
}

