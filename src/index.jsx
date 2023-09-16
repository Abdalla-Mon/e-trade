// Input: tokens = ["2","1","+","3","*"]
// Output: 9
// Input: tokens = ["4",2,"+"]
// Output: 6
// Input: tokens = ["0","17","+","5","+"]
// Output: 22
let operators = {
  "+": (a, b) => a + b,
  "-": (a, b) => a - b,
  "*": (a, b) => a * b,
  "/": (a, b) => Math.trunc(a / b),
};

function evalRPN(tokens) {
  return loop(tokens);
}

function loop(stack) {
  let index = 0;
  while (stack.length > 1) {
    const isOperator = () => stack[index] in operators;
    while (!isOperator()) index++;

    stack[index] = checking(stack, index);
    stack.splice(index - 2, 2);
    index--;
  }
  return stack;
}
function checking(stack, index) {
  let prev = stack[index - 2];
  let operator = stack[index];
  let next = stack[index - 1];
  const operation = operators[operator];
  if (operation === undefined) {
    return null;
  }
  return operation(+prev, +next);
}
