export class Simplify{
    static applyIdentityLaw(expression) {
        expression = expression.replace(/A\+0/g, 'A');
        expression = expression.replace(/A\*1/g, 'A');
        return expression;
      }
      
      static applyDominationLaw(expression) {
        expression = expression.replace(/A\+1/g, '1');
        expression = expression.replace(/A\*0/g, '0');
        return expression;
      }
      
      static applyIdempotentLaw(expression) {
        expression = expression.replace(/A\+A/g, 'A');
        expression = expression.replace(/A\*A/g, 'A');
        return expression;
      }
      
      static applyComplementLaw(expression) {
        expression = expression.replace(/A\+\~A/g, '1');
        expression = expression.replace(/A\*\~A/g, '0');
        return expression;
      }
      
      static applyDoubleNegationLaw(expression) {
        expression = expression.replace(/\~\~A/g, 'A');
        return expression;
      }
      
      static applyCommutativeLaw(expression) {
        expression = expression.replace(/(A\+B)|(B\+A)/g, '$2$1');
        expression = expression.replace(/(A\*B)|(B\*A)/g, '$2$1');
        return expression;
      }
      
      static applyAssociativeLaw(expression) {
        expression = expression.replace(/(A\+(B\+C))|((A\+B)\+C)/g, '$2$1');
        expression = expression.replace(/(A\*(B\*C))|((A\*B)\*C)/g, '$2$1');
        return expression;
      }
      
      static applyDistributiveLaw(expression) {
        expression = expression.replace(/(A\*(B\+C))|((A\*B)\+(A\*C))/g, '$2$1');
        expression = expression.replace(/(A\+(B\*C))|((A\+B)\*(A\+C))/g, '$2$1');
        return expression;
      }
      
      static applyDeMorgansLaw(expression) {
        expression = expression.replace(/\~\(A\+B\)/g, '(~A*~B)');
        expression = expression.replace(/\~\(A\*B\)/g, '(~A+~B)');
        return expression;
      }
}