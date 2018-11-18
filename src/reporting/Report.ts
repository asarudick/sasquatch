export default class Report {
  constructor(
    public message: string,
    public file: string,
    public start: number,
    public end: number,
  ) {}
}
