const randomNumber = Math.random() * 100
const randomNumberAsString = (Math.random() * 100).toFixed(0)

export function getRandomNumber() {
  return +randomNumber.toFixed(0)
}

export function getRandomNumberAsString() {
  return randomNumber.toFixed(0)
}
