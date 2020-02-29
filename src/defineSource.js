const defineSource = (db, model) => Object.defineProperties(model, {
  source: {
    value: db.entities[model.name],
  },

  fields: {
    value: Object.entries(model.fields ?? {})
      .reduce((acc, [field, options]) => {
        acc[field] = {
          field,
          ...options,
        }

        if ('foreignModel' in options) {
          const foreignModel = typeof options.foreignModel === 'string'
            ? db.models[options.foreignModel]
            : options.foreignModel

          if (process.env.NODE_ENV === 'development') {
            if (foreignModel === undefined) {
              throw new Error(`The "${options.foreignModel}" model was not registered in the database`)
            }
          }

          Object.assign(acc[field], { foreignModel })
        }

        return acc
      }, {}),
  },
})

export default defineSource
