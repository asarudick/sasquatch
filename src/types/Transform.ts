import { SourceFile } from 'ts-morph';

export type Transform = (sources: SourceFile[], options: any) => void;
