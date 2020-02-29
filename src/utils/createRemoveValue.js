/* eslint-disable no-param-reassign */
// // eslint-disable-next-line no-unused-vars
// const removeValue = (target, field, value) => {
//   target[field] = null
// }

// const removeValueToEnumRequired = (target, field, value) => {
//   const index = target[field].indexOf(value)
//   if (index !== -1) {
//     target[field].splice(index, 1)
//   }
// }

// const removeValueToEnum = (target, field, value) => {
//   if (target[field] === undefined) {
//     target[field] = []
//   } else {
//     removeValueToEnumRequired(target, field, value)
//   }
// }

// const createRemoveValue = (isEnum = false, isRequired = true) => {
//   if (!isEnum) return removeValue
//   if (!isRequired) return removeValueToEnum
//   return removeValueToEnumRequired
// }

// export default createRemoveValue

// eslint-disable-next-line no-unused-vars
const removeValue = (target, field, value) => {
  target[field] = null
}

const removeValueFromEnum = (target, field, value) => {
  const index = target[field].indexOf(value)
  if (index !== -1) {
    target[field].splice(index, 1)
  }
}

const createRemoveValue = (isEnum) => (isEnum ? removeValueFromEnum : removeValue)

export default createRemoveValue
