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
  FunctionDeclaration,
  Node,
  Expression,
} from 'ts-morph';

function hasThenCallExpression(expression: CallExpression): boolean {
  return !!expression
    .getDescendantsOfKind(SyntaxKind.PropertyAccessExpression)
    .find(p => isThenPropertyAccessExpression(p));
}

function isThenPropertyAccessExpression(
  expression: PropertyAccessExpression,
): boolean {
  return expression.getName && expression.getName() === 'then';
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

      // The arguments passed to then().
      const args = call.getArguments();

      // The arrow function. e.g. promise.then(() => {})
      const fn: FunctionExpression =
        args.length && (args[0] as FunctionExpression);

      let s: Statement;

      // Reference to then property access.
      const expression = call.getExpression() as PropertyAccessExpression;

      // The containing parent block.
      const block: Block = statement.getParent() as Block;

      const params = fn.getParameters();

      // We only care to declare a variable is there is a corresponding
      // parameter in a function passed to the then() call.1
      if (fn && params.length) {
        // Create awaited assignment statement with all args as an assignment.
        // TODO: Account for multiple params with destructuring
        s = block.insertVariableStatement(statement.getChildIndex(), {
          declarationKind: VariableDeclarationKind.Const, // defaults to "let"
          declarations: [
            {
              // Move the variable from argument list in the then arrow function
              // to a constant reference.
              name: params[0].getName(),

              // 'await' and the name of the promise being awaited.
              initializer: 'await ' + expression.getExpression().getText(),
            },
          ],
        });
      } else {
        s = block.addStatements([
          'await ' + expression.getExpression().getText(),
        ])[0];
      }

      // Copy the body of the function expression to below the new await expression.
      fn &&
        block.insertStatements(
          s.getChildIndex() + 1,
          fn.getStatementsWithComments().map((s: Statement) => s.getText()),
        );

      const functionDeclaration: FunctionDeclaration = block.getParent() as FunctionDeclaration;
      functionDeclaration.toggleModifier('async', true);

      // Clean up.
      statement.remove();
    });
  });
}
