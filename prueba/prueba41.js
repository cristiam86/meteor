/*
  4. Imagina que tienes un array con números enteros (positivos y negativos) en cualquier orden.
  Encuentra una posición X y una posición Y tal que la suma de los elementos del array,
  desde X hasta Y sea la máxima posible para ese array.
*/

function sumMax (nums) {
  let sumTotal = nums.reduce((acc, elem) => acc + elem, 0)
  let position = {x: 0, y: nums.length}

  for (var i = 0; i < nums.length; i++) {
    let sum = nums[i]
    for (var j = i + 1; j < nums.length; j++) {
      sum += nums[j]
      if (sum >= sumTotal) {
        position = {x: i, y: j}
        sumTotal = sum
      }
    }
  }

  return position
}

console.log(sumMax([1, 4, 5, -9, -8, 6, 3, 4, -85, -99, 45, -80, -1, -80, 56]))
