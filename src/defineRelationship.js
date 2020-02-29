/* eslint-disable func-names */
const getInstanceByLocalKey = (foreignModel, localField) => function () {
  return foreignModel.source.get(this[localField])
}
const getInstanceListByLocalKey = (foreignModel, localField) => function () {
  return this[localField].map((foreignKey) => foreignModel.source.get(foreignKey))
}

const getInstanceByRelationKey = (foreignModel, foreignField) => function () {
  return [...foreignModel.source.values()]
    .find((foreignInstance) => foreignInstance[foreignField] === this.id)
}
const getInstanceByRelationKeyList = (foreignModel, foreignField) => function () {
  return [...foreignModel.source.values()]
    .find((foreignInstance) => foreignInstance[foreignField].includes(this.id))
}

const getInstanceListByRelationKey = (foreignModel, foreignField) => function () {
  return [...foreignModel.source.values()]
    .filter((foreignInstance) => foreignInstance[foreignField] === this.id)
}
const getInstanceListByRelationKeyList = (foreignModel, foreignField) => function () {
  return [...foreignModel.source.values()]
    .filter((foreignInstance) => foreignInstance[foreignField].includes(this.id))
}

const defineRelationship = (model) => Object.defineProperties(
  model.prototype,
  Object.values(model.fields)
    .filter((it) => it.isForeignEntity)
    .reduce((
      acc,
      {
        field,
        foreignField,
        foreignModel,
        localField,
        isEnum,
      },
    ) => {
      if (localField !== undefined) {
        acc[field] = {
          get: !isEnum
            ? getInstanceByLocalKey(foreignModel, localField)
            : getInstanceListByLocalKey(foreignModel, localField),
        }
      } else if (foreignField !== undefined) {
        if (!foreignModel.fields[foreignField].isEnum) {
          acc[field] = {
            get: !isEnum
              ? getInstanceByRelationKey(foreignModel, foreignField)
              : getInstanceListByRelationKey(foreignModel, foreignField),
          }
        } else {
          acc[field] = {
            get: !isEnum
              ? getInstanceByRelationKeyList(foreignModel, foreignField)
              : getInstanceListByRelationKeyList(foreignModel, foreignField),
          }
        }
      } else if (process.env.NODE_ENV === 'development') {
        throw new Error('TODO')
      }

      // // one to one
      // acc[field] = {
      //   get: localField !== undefined
      //     ? getInstanceByLocalKey(foreignModel, localField)
      //     : getInstanceByRelationKey(foreignModel, foreignField),
      // }

      // // one to many
      // acc[field] = {
      //   get: localField !== undefined
      //     ? getInstanceListByLocalKey(foreignModel, localField)
      //     : getInstanceListByRelationKey(foreignModel, foreignField),
      // }

      // // many to one
      // acc[field] = {
      //   get: localField !== undefined
      //     ? getInstanceByLocalKey(foreignModel, localField)
      //     : getInstanceByRelationKeyList(foreignModel, foreignField),
      // }

      // // many to many
      // acc[field] = {
      //   get: localField !== undefined
      //     ? getInstanceListByLocalKey(foreignModel, localField)
      //     : getInstanceListByRelationKeyList(foreignModel, foreignField),
      // }

      return acc
    }, {}),
)

export default defineRelationship
