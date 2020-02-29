const getValueList = (target, field) => (target[field] !== undefined ? [target[field]] : [])

const getValueListFromEnum = (target, field) => target[field] ?? []

const createGetValueList = (isEnum) => (isEnum ? getValueListFromEnum : getValueList)

export default createGetValueList
