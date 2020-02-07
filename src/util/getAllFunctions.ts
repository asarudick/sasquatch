export function getAllFunctions(source) {
  const scopedFunctions = source.getFunctions();
  const classes = source.getClasses();
  const constructors = classes.reduce(
    (memo, c) => [...memo, ...c.getConstructors()],
    [],
  );
  const instanceMethods = classes.reduce(
    (memo, c) => [...memo, ...c.getInstanceMethods()],
    [],
  );
  const staticMethods = classes.reduce(
    (memo, c) => [...memo, ...c.getStaticMethods()],
    [],
  );

  // Group together.
  return [
    ...scopedFunctions,
    ...constructors,
    ...instanceMethods,
    ...staticMethods,
  ];
}
