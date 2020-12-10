import { EmailSummary } from './email-summary';

export interface Email extends EmailSummary {
  to: string;
  text: string;
  html: string;
}
