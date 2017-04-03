/*
  3. Escribe un algoritmo que pueda dividir un número A por un número B sin utilizar el operador de división.
*/

function division (n1, n2) {
  if (n2 === 0) return 'The divider can not be 0'
  if (n1 === 0) return 0

  let rest = (n1 < 0) ? n1 * -1 : n1
  let divider = (n2 < 0) ? n2 * -1 : n2
  let result = (n2 < 0 && n1 > 0 || n2 > 0 && n1 < 0) ? '-' : ''

  let i = 0
  do {
    if (rest >= divider) {
      let dividend = 0
      do {
        rest -= divider
        dividend++
      } while (rest >= divider)
      result += (i === 0) ? dividend + '.' : dividend
    }

    if (rest < divider && rest > 0) {
      rest = rest * 10
    }

    i = (rest === 0 || i > 6) ? -1 : i + 1
  } while (i !== -1)

  return result
}

console.log(division(1501, 5))
