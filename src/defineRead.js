const defineRead = (model) => Object.defineProperties(model, {
  size: {
    get() {
      return model.source.size
    },
  },

  keys: {
    get() {
      return [...model.source.keys()]
    },
  },

  values: {
    get() {
      return [...model.source.values()]
    },
  },

  entries: {
    get() {
      return [...model.source.entries()]
    },
  },

  get: {
    value(primaryKey) {
      return model.source.get(primaryKey)
    },
  },

  has: {
    value(primaryKey) {
      return model.source.has(primaryKey)
    },
  },
})

export default defineRead
