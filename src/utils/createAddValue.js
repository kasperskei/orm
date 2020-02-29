// /* eslint-disable no-param-reassign */
// const addValue = (target, field, value) => {
//   target[field] = value
// }

// const addValueToEnumRequired = (target, field, value) => {
//   if (!target[field].includes(value)) {
//     target[field].push(value)
//   }
// }

// const addValueToEnum = (target, field, value) => {
//   if (target[field] === undefined) {
//     target[field] = [value]
//   } else {
//     addValueToEnumRequired(target, field, value)
//   }
// }

// const createAddValue = (isEnum = false, isRequired = true) => {
//   if (!isEnum) return addValue
//   if (!isRequired) return addValueToEnum
//   return addValueToEnumRequired
// }

// export default createAddValue

/* eslint-disable no-param-reassign */
const addValue = (target, field, value) => {
  target[field] = value
}

const addValueToEnum = (target, field, value) => {
  if (!target[field].includes(value)) {
    target[field].push(value)
  }
}

const createAddValue = (isEnum) => (isEnum ? addValueToEnum : addValue)

export default createAddValue
