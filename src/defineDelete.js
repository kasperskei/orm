/* eslint-disable no-param-reassign */
import createHasValue from './utils/createHasValue'
import createRemoveValue from './utils/createRemoveValue'

const defineDelete = (model) => {
  const removeRelationshipList = Object.values(model.fields)
    .filter(({ isForeignKey, foreignField }) => isForeignKey && foreignField !== undefined)
    .map(({
      foreignField,
      foreignModel,
    }) => {
      const hasForeignKey = createHasValue(foreignModel.fields[foreignField].isEnum)
      const removeForeignKey = createRemoveValue(foreignModel.fields[foreignField].isEnum)

      return (id) => foreignModel.source
        .forEach((foreignInstance) => {
          if (hasForeignKey(id)) {
            removeForeignKey(foreignInstance, foreignField, id)
          }
        })

      // return (id) => [...foreignModel.source.values()]
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
            model.source.delete(id)
          })
      },
    },

    deleteAll: {
      value() {
        return model.delete(...model.source.keys())
      },
    },
  })

  return model
}

export default defineDelete
