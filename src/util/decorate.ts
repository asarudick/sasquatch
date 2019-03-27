export function decorate(fn) {
  return function(target, name, descriptor) {
    const original = descriptor.value;

    if (typeof original !== 'function') {
      return descriptor;
    }

    descriptor.value = function(...args) {
      fn(() => original.apply(this, args), args);
    };
  };
}
