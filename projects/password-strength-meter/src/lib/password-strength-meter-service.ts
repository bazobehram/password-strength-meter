export interface FeedbackResult {
  score: number;
  feedback: { warning: string; suggestions: string[] };
}

export abstract class IPasswordStrengthMeterService {
  abstract score(password: string): number;

  abstract scoreWithFeedback(password: string): FeedbackResult;

  abstract scoreAsync(password: string): Promise<number>;

  abstract scoreWithFeedbackAsync(password: string): Promise<FeedbackResult>;
}
