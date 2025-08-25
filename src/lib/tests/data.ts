import { OptionId, TestMeta, TestPayload } from './types';

export const tests: TestMeta[] = [
  { id: 'rag-basics', title: 'RAG Basics', questionCount: 25 },
  { id: 'ai-fundamentals', title: 'AI Fundamentals', questionCount: 15 },
];

const makeQ = (i: number, text: string, correct: OptionId): TestPayload['questions'][number] => ({
  id: `q${i}`,
  text,
  options: [
    { id: 'A', text: 'To generate images from text prompts' },
    { id: 'B', text: 'To improve factual accuracy of LLMs by retrieving external documents' },
    { id: 'C', text: 'To replace machine learning models with databases' },
    { id: 'D', text: 'To reduce model training costs by compressing parameters' },
  ],
  correctId: correct,
});

export const testPayloads: Record<string, TestPayload> = {
  'rag-basics': {
    id: 'rag-basics',
    title: 'RAG Basics',
    questions: Array.from({ length: 25 }).map((_, idx) =>
      makeQ(idx + 1, 'What is the main purpose of Retrieval-Augmented Generation (RAG)?', 'B')
    ),
  },
  'ai-fundamentals': {
    id: 'ai-fundamentals',
    title: 'AI Fundamentals',
    questions: Array.from({ length: 15 }).map((_, idx) =>
      makeQ(idx + 1, 'Which is a supervised learning task?', 'B')
    ),
  },
};

