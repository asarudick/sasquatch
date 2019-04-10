import Report from '../reporting/Report';

export default interface Reporter {
  report(): Iterable<string>;
}
