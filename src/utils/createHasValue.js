const isValue = (target, field, value) => target[field] === value

const hasValue = (target, field, value) => target[field].includes(value)

const createHasValue = (isEnum) => (isEnum ? hasValue : isValue)

export default createHasValue
