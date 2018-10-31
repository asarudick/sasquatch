export class Foo {
  constructor(
    $rootScope: ng.IRootScopeService,
    $timeout: ng.ITimeoutService,
    $window: ng.IWindowService,
    $q: ng.IQService,
  ) {
  }

  static $inject: string[] = ['$rootScope', '$timeout', '$window', '$q'];
}
//
// function Bar($rootScope: ng.IRootScopeService) {
//   'ngInject';
// }
