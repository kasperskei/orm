/* eslint-disable func-names */
const getInstanceByLocalKey = (db, foreignModel, localField) => function () {
  return db.entities[foreignModel.name].get(this[localField])
}
const getInstanceListByLocalKey = (db, foreignModel, localField) => function () {
  return this[localField].map((foreignKey) => db.entities[foreignModel.name].get(foreignKey))
}

const getInstanceByRelationKey = (db, foreignModel, foreignField) => function () {
  return [...db.entities[foreignModel.name].values()]
    .find((foreignInstance) => foreignInstance[foreignField] === this.id)
}
const getInstanceByRelationKeyList = (db, foreignModel, foreignField) => function () {
  return [...db.entities[foreignModel.name].values()]
    .find((foreignInstance) => foreignInstance[foreignField].includes(this.id))
}

const getInstanceListByRelationKey = (db, foreignModel, foreignField) => function () {
  return [...db.entities[foreignModel.name].values()]
    .filter((foreignInstance) => foreignInstance[foreignField] === this.id)
}
const getInstanceListByRelationKeyList = (db, foreignModel, foreignField) => function () {
  return [...db.entities[foreignModel.name].values()]
    .filter((foreignInstance) => foreignInstance[foreignField].includes(this.id))
}

const defineRelationship = (db, model) => Object.defineProperties(
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
            ? getInstanceByLocalKey(db, foreignModel, localField)
            : getInstanceListByLocalKey(db, foreignModel, localField),
        }
      } else if (foreignField !== undefined) {
        if (!foreignModel.fields[foreignField].isEnum) {
          acc[field] = {
            get: !isEnum
              ? getInstanceByRelationKey(db, foreignModel, foreignField)
              : getInstanceListByRelationKey(db, foreignModel, foreignField),
          }
        } else {
          acc[field] = {
            get: !isEnum
              ? getInstanceByRelationKeyList(db, foreignModel, foreignField)
              : getInstanceListByRelationKeyList(db, foreignModel, foreignField),
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
