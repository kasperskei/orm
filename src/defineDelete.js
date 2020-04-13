/* eslint-disable no-param-reassign */
import createHasValue from './utils/createHasValue'
import createRemoveValue from './utils/createRemoveValue'

const defineDelete = (db, model) => {
  const removeRelationshipList = Object.values(model.fields)
    .filter(({ isForeignKey, foreignField }) => isForeignKey && foreignField !== undefined)
    .map(({
      foreignField,
      foreignModel,
    }) => {
      const hasForeignKey = createHasValue(foreignModel.fields[foreignField].isEnum)
      const removeForeignKey = createRemoveValue(foreignModel.fields[foreignField].isEnum)

      return (id) => db.entities[foreignModel.name]
        .forEach((foreignInstance) => {
          if (hasForeignKey(id)) {
            removeForeignKey(foreignInstance, foreignField, id)
          }
        })

      // return (id) => [...db.entities[foreignModel.name].values()]
      //   .filter((foreignInstance) => hasForeignKey(foreignInstance, foreignField, id))
      //   .forEach((foreignInstance) => removeForeignKey(foreignInstance, foreignField, id))
    })

  Object.defineProperties(model, {
    delete: {
      value(...dataList) {
        dataList
          .flat()
          // .map((data) => (data instanceof model ? data.id : data))
          .forEach((id) => {
            removeRelationshipList.forEach((remove) => remove(id))
            db.entities[model.name].delete(id)
          })
      },
    },

    deleteAll: {
      value() {
        return model.delete(...db.entities[model.name].keys())
      },
    },
  })

  return model
}

export default defineDelete
