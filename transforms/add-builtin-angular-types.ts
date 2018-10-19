import services from '../data/services';

export default (sources) => {
  sources.forEach((source) => {
    const classes = source.getClasses();

    classes.forEach((c) => {
      const constructors = c.getConstructors();

      constructors.forEach((constructor: any) => {
        const params = constructor.getParameters();

        params.forEach((param) => {
          const name = param.getName();
          const paramType = services[name];

          if (!paramType) {
            return;
          }
          param.setType(paramType);
          // param.remove();
          // constructor.addParameter({
          //   name,
          //   type: paramType
          // });
        });
      });
    });
  });
};
