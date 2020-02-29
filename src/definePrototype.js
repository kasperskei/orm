/* eslint-disable new-cap */
const definePrototype = (model) => Object.defineProperties(model.prototype, {
  // clone: {
  //   value() {
  //     return new model(this)
  //   },
  // },

  update: {
    value(data) {
      model.update({ ...data, id: this.id })
    },
  },

  delete: {
    value() {
      model.delete(this.id)
    },
  },
})

export default definePrototype
