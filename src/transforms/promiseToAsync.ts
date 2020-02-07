// import { getAllFunctions } from '../util';
import {
  SyntaxKind,
  ExpressionStatement,
  SourceFile,
  CallExpression,
  PropertyAccessExpression,
  VariableDeclarationKind,
  ArrowFunction,
  VariableDeclaration,
  Block,
  FunctionExpression,
  Statement,
} from 'ts-morph';

function hasThenCallExpression(expression: CallExpression): boolean {
  return !!expression
    .getDescendantsOfKind(SyntaxKind.PropertyAccessExpression)
    .find(p => isThenPropertyAccessExpression(p));
}

function isThenPropertyAccessExpression(
  expression: PropertyAccessExpression,
): boolean {
  return expression.getName() === 'then';
}

function getCaller(expression) {}

function getThenCalls(es: ExpressionStatement): CallExpression[] {
  return (
    es
      .getDescendantsOfKind(SyntaxKind.CallExpression)

      // Filter out ones that don't have a .then() call.
      .filter(c => {
        return !!isThenPropertyAccessExpression(
          c.getExpression() as PropertyAccessExpression,
        );
      })
  );
}
function getThenStatements(source: SourceFile): ExpressionStatement[] {
  // Get all 'then' statements.
  return (
    source
      .getDescendantsOfKind(SyntaxKind.ExpressionStatement)
      // Find the ones where there is a .then() call.
      .filter((es: ExpressionStatement) => {
        return !!es
          .getDescendantsOfKind(SyntaxKind.CallExpression)

          // Filter out ones that don't have a .then() call.
          .filter(c => {
            return !!hasThenCallExpression(c);
          }).length;
      })
  );
}

export function promiseToAsync(sources: SourceFile[], options) {
  sources.forEach((source: SourceFile) => {
    // Find .then() calls.
    const statements = getThenStatements(source);

    statements.forEach(statement => {
      // Get properties of the then call.
      const calls: CallExpression[] = getThenCalls(statement);

      if (!calls.length) return;

      // First then call.
      const call: CallExpression = calls[0];

      // Reference to then property access.
      const expression = call.getExpression() as PropertyAccessExpression;

      // The arguments passed to then().
      const args: any = call.getArguments();

      // The arrow function. e.g. promise.then(() => {})
      const fn: FunctionExpression = args.length && args[0];

      let s: Statement;

      if (fn) {
        // Create awaited assignment statement with all args as destructured assignment.
        s = source.addVariableStatement({
          declarationKind: VariableDeclarationKind.Const, // defaults to "let"
          declarations: [
            {
              // Move the variable from argument list in the then arrow function
              // to a constant reference.
              name: args.getParameters()[0].toString(),

              // 'await' and the name of the promise being awaited.
              initializer: 'await ' + expression.getExpression().getFullText(),
            },
          ],
        });
      } else {
        s = source.addStatements([
          'await ' + expression.getExpression().getFullText(),
        ])[0];
      }

      // The containing parent block.
      const parent: Block = statement.getParent() as Block;

      // Copy the body of the function expression to below the new await expression.
      parent.insertStatements(
        s.getChildIndex(),
        fn.getStatementsWithComments().map(i => i.toString()),
      );

      // Clean up.
      statement.remove();

      // If only 1 argument, don't wrap with destructuring.
    });
  });
}
// export default (sources, options) => {
//   sources.forEach(source => {
//     const classes = source.getClasses();
//
//     classes.forEach(c => {
//       const constructors = c.getConstructors();
//       constructors.forEach(constructor => {
//         const body = constructor.getBody();
//         const statements = body.getStatements();
//
//         // Find ngInject
//         const ngInject = statements.find((statement: Statement) => {
//           return statement.getText().includes("'ngInject'");
//         });
//
//         if (!ngInject) {
//           return;
//         }
//
//         ngInject.remove();
//
//         const arr = constructor.getParameters().map(param => param.getName());
//
//         const prop = c.addProperty({
//           isStatic: true,
//           name: '$inject',
//           type: 'string[]',
//         });
//         const expression =
//           '[' + arr.map(i => "'" + i.toString() + "'").join(', ') + ']';
//         prop.setInitializer(expression);
//       });
//     });
//   });
// };
