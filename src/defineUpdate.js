/* eslint-disable max-len */
/* eslint-disable no-param-reassign */
/* eslint-disable no-return-assign */
/* eslint-disable new-cap */
import createAddValue from './utils/createAddValue'
import createGetValueList from './utils/createGetValueList'
import createRemoveValue from './utils/createRemoveValue'
import getDiffArray from './utils/getDiffArray'

const defineUpdate = (db, model) => {
  const fieldList = Object.values(model.fields).filter((it) => !it.isForeignEntity)
  // const foreignEntityList = fieldList.filter((it) => it.isForeignEntity)
  // const foreignKeyList = fieldList.filter((it) => it.isForeignKey)

  const updateRelationshipHash = Object.values(model.fields)
    .filter(({ isForeignKey, foreignField }) => isForeignKey && foreignField !== undefined)
    .reduce((acc, {
      field,
      foreignField,
      foreignModel,
      isEnum,
    }) => {
      const addForeignKey = createAddValue(foreignModel.fields[foreignField].isEnum)
      const removeForeignKey = createRemoveValue(foreignModel.fields[foreignField].isEnum)
      const getForeignKeyList = createGetValueList(isEnum)
      const foreignSource = db.entities[foreignModel.name]

      acc[field] = (instance, data) => {
        if (!(field in data)) return

        const [
          foreignKeyListAdded,
          foreignKeyListRemoved,
        ] = getDiffArray(
          getForeignKeyList(instance, field),
          getForeignKeyList(data, field),
        )

        foreignKeyListRemoved
          .forEach((foreignKey) => {
            const foreignInstance = foreignSource.get(foreignKey)
            if (foreignInstance !== undefined) {
              removeForeignKey(foreignInstance, foreignField, instance.id)
            }
          })

        foreignKeyListAdded
          .forEach((foreignKey) => {
            const foreignInstance = foreignSource.get(foreignKey)
            if (foreignInstance !== undefined) {
              addForeignKey(foreignInstance, foreignField, instance.id)
            }
          })
      }

      return acc
    }, {})

  Object.defineProperty(model, 'update', {
    value(...dataList) {
      // .map((data) => db.entities[model.name].get(data.id))
      // .filter((instance) => instance !== undefined)
      dataList.flat().forEach((data) => {
        const instance = db.entities[model.name].get(data.id)

        if (instance === undefined) return

        fieldList
          .forEach(({ field, isForeignKey }) => {
            if (field in data) {
              if (isForeignKey) {
                updateRelationshipHash[field](instance, data)
              }
              instance[field] = data[field]
            }
          })

        // fieldList
        //   .filter(({ field }) => field in data)
        //   .forEach(({
        //     field,
        //     isForeignKey,
        //     isForeignEntity,
        //     foreignField,
        //     foreignModel,
        //     localField,
        //     isEnum,
        //   }) => {
        //     const newValue = data[field]

        //     if (isForeignEntity) {
        //       const foreignInstance = db.entities[foreignModel.name].get(newValue.id)
        //       const instanceOfForeign = db.entities[model.name].get(foreignInstance[foreignField])

        //       if (localField !== undefined && instance[localField] === undefined) {
        //         instance[localField] = newValue.id
        //       }

        //       if (foreignField !== undefined && newValue[foreignField] === undefined) {
        //         newValue[foreignField] = instance.id
        //       }

        //       instanceOfForeign[localField] = null

        //       foreignModel.update(newValue)

        //       return
        //     }

        //     if (isForeignKey) {
        //       const target = instance

        //       const addForeignKey = createAddValue(foreignModel.fields[foreignField].isEnum)
        //       const removeForeignKey = createRemoveValue(foreignModel.fields[foreignField].isEnum)
        //       const getForeignKeyList = createGetValueList(isEnum)

        //       const getInstanceList = (keyList) => keyList
        //         .map((foreignKey) => db.entities[foreignModel.name].get(foreignKey))
        //         .filter((foreignInstance) => foreignInstance !== undefined)

        //       const [
        //         foreignInstanceListAdded,
        //         foreignInstanceListRemoved,
        //       ] = getDiffArray(
        //         getForeignKeyList(target, field) |> getInstanceList,
        //         getForeignKeyList(data, field) |> getInstanceList,
        //       )

        //       foreignInstanceListRemoved
        //         .forEach((foreignInstance) => removeForeignKey(foreignInstance, foreignField, target.id))

        //       foreignInstanceListAdded
        //         .forEach((foreignInstance) => addForeignKey(foreignInstance, foreignField, target.id))
        //     }

        //     instance[field] = newValue
        //   })
      })
    },
  })

  return model
}

export default defineUpdate
