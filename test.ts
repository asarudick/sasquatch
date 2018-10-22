export class Foo {
  constructor ($rootScope: ng.IRootScopeService, $timeout: ng.ITimeoutService, $window: ng.IWindowService, $q: ng.IQService) {

  }
}

function Bar (
  $rootScope: ng.IRootScopeService
) {
  'ngInject';
}
