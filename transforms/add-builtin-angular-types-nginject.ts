import services from '../data/services';

export default (sources) => {
  sources.forEach((source) => {
    const functions = source.getFunctions();

    functions.forEach((f) => {
      const body = f.getBody();
      const statements = body.getStatements();

      // Find ngInject
      const hasNgInject = statements.some((statement) => {
        return statement.getExpression().getText() === '\'ngInject\'';
      });

      if (!hasNgInject) {
        return;
      }

      // Replace param types if ngInject was found.
      const params = f.getParameters();

      params.forEach((param) => {
        const name = param.getName();
        const paramType = services[name];

        if (!paramType) {
          return;
        }
        param.setType(paramType);
      });
    });
  });
};
