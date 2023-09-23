// Example 1:

// Input: temperatures = [73,74,75,71,69,72,76,73]
// Output: [1,1,4,2,1,1,0,0]
// Example 2:

// Input: temperatures = [30,40,50,60]
// Output: [1,1,1,0]
// Example 3:

// Input: temperatures = [30,60,90]
// Output: [1,1,0]

function dailyTemperatures(temp) {
  let result = new Array(temp.length).fill(0);
  let stack = [];
  for (let i = 0; i < temp.length; i++) {
    while (stack.length && temp[i] > temp[stack[stack.length - 1]]) {
      let value = stack.pop();
      result[value] = i - value;
    }
    stack.push(i);
  }
  [2, 3];
  return result;
}
console.log(dailyTemperatures([73, 74, 75, 71, 69, 72, 76, 73]));
