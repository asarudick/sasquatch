import { AnalysisReport } from '../reporting/';
import { SourceFile } from 'ts-morph';

export type Analyzer = (
  sources: SourceFile[],
  options: any,
) => IterableIterator<AnalysisReport>;
