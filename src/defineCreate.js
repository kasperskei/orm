/* eslint-disable max-len */
/* eslint-disable new-cap */
/* eslint-disable no-param-reassign */
/* eslint-disable no-return-assign */
import createAddValue from './utils/createAddValue'
import createGetValueList from './utils/createGetValueList'

const defineCreate = (db, model) => {
  // const fieldList = Object.values(model.fields)
  // const foreignEntityList = fieldList.filter((it) => it.isForeignEntity)
  // const foreignKeyList = fieldList.filter((it) => it.isForeignKey)

  // const addRelationshipDataList = foreignEntityList
  //   .map(({
  //     field,
  //     foreignField,
  //     foreignModel,
  //     localField,
  //     isEnum,
  //   }) => {
  //     const localFieldIsEnum = model.fields[localField]?.isEnum ?? false
  //     const foreignFieldIsEnum = foreignModel.fields[foreignField]?.isEnum ?? false

  //     const updateLocalTarget = createAddValue(localFieldIsEnum, false)
  //     const updateForeignTarget = createAddValue(foreignFieldIsEnum, false)

  //     const updateLocalData = !isEnum
  //       ? (data, foreignData) => updateLocalTarget(data, localField, foreignData.id)
  //       : (data, foreignDataList) => foreignDataList.map((foreignData) => updateLocalTarget(data, localField, foreignData.id))

  //     const updateForeignData = !isEnum
  //       ? (data, foreignData) => updateForeignTarget(foreignData, foreignField, data.id)
  //       : (data, foreignDataList) => foreignDataList.map((foreignData) => updateForeignTarget(foreignData, foreignField, data.id))

  //     const updateAllData = (() => {
  //       const arr = []

  //       if (localField !== undefined) {
  //         arr.push(updateLocalData)
  //       }

  //       if (foreignField !== undefined) {
  //         arr.push(updateForeignData)
  //       }

  //       return (data, foreignData) => arr.map((func) => func(data, foreignData))
  //     })()

  //     return (data) => {
  //       const foreignData = data[field]

  //       if (foreignData === undefined) return

  //       updateAllData(data, foreignData)

  //       foreignModel.insert(foreignData)
  //     }
  //   })

  const addRelationshipList = Object.values(model.fields)
    .filter(({ isForeignKey, foreignField }) => isForeignKey && foreignField !== undefined)
    .map(({
      field,
      foreignField,
      foreignModel,
      isEnum,
    }) => {
      const addForeignKey = createAddValue(foreignModel.fields[foreignField].isEnum)
      const getForeignKeyList = createGetValueList(isEnum)

      return (data) => getForeignKeyList(data, field)
        .forEach((foreignKey) => {
          const foreignInstance = db.entities[foreignModel.name].get(foreignKey)
          if (foreignInstance !== undefined) {
            addForeignKey(foreignInstance, foreignField, data.id)
          }
        })
        // .map((foreignKey) => db.entities[foreignModel.name].get(foreignKey))
        // .filter((foreignInstance) => foreignInstance !== undefined)
        // .forEach((foreignInstance) => addForeignKey(foreignInstance, foreignField, target.id))
    })

  Object.defineProperty(model, 'insert', {
    value(...dataList) {
      dataList
        .flat()
        .forEach((data) => {
          // addRelationshipDataList.forEach((add) => add(data))
          addRelationshipList.forEach((add) => add(data))
          db.entities[model.name].set(data.id, new model(data))
        })
    },
  })

  return model
}

export default defineCreate
