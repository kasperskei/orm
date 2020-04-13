const defineRead = (db, model) => Object.defineProperties(model, {
  size: {
    get() {
      return db.entities[model.name].size
    },
  },

  keys: {
    get() {
      return [...db.entities[model.name].keys()]
    },
  },

  values: {
    get() {
      return [...db.entities[model.name].values()]
    },
  },

  entries: {
    get() {
      return [...db.entities[model.name].entries()]
    },
  },

  get: {
    value(primaryKey) {
      return db.entities[model.name].get(primaryKey)
    },
  },

  has: {
    value(primaryKey) {
      return db.entities[model.name].has(primaryKey)
    },
  },
})

export default defineRead
