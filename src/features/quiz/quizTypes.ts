export interface QuestionOption {
  label: string,
  key: string,
  nextQuestion?: string,
  img_url?: string;
  [key: string]: string | number | null | undefined
}

export interface Question {
  type: string,
  label: string,
  key: string,
  options?: QuestionOption[]
}