import services from '../data/angular-services';

export default (sources, options) => {
  sources.forEach(source => {
    // Replace in functions.
    // const functions = source.getFunctions();
    //
    // functions.forEach(f => {
    //   const body = f.getBody();
    //   const statements = body.getStatements();
    //
    //   // Find ngInject
    //   const ngInject = statements.find(statement => {
    //     return statement.getExpression().getText() === "'ngInject'";
    //   });
    //
    //   if (!ngInject) {
    //     return;
    //   }
    //
    //   ngInject.remove();
    //
    //   // Replace param types if ngInject was found.
    //   const arr = f.getParameters().map(param => param.getName());
    //   // console.log(ngInject);
    //   f.addProperty({ isStatic: true, name: '$inject', type: '[]' });
    // });

    const classes = source.getClasses();

    classes.forEach(c => {
      const constructors = c.getConstructors();
      constructors.forEach(constructor => {
        const body = constructor.getBody();
        const statements = body.getStatements();

        // Find ngInject
        const ngInject = statements.find(statement => {
          return statement.getExpression().getText() === "'ngInject'";
        });

        if (!ngInject) {
          return;
        }

        ngInject.remove();

        const arr = constructor.getParameters().map(param => param.getName());

        const prop = c.addProperty({
          isStatic: true,
          name: '$inject',
          type: 'string[]',
        });
        const expression =
          '[' + arr.map(i => "'" + i.toString() + "'").join(', ') + ']';
        prop.setInitializer(expression);
      });
    });
  });
};
