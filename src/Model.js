class Model {
  constructor(data) {
    Object.values(this.constructor.fields)
      .filter(({ isForeignEntity }) => !isForeignEntity)
      .forEach(({ field, isEnum }) => {
        const defaultValue = isEnum ? [] : undefined
        this[field] = data[field] ?? defaultValue
      })
  }
}

export default Model
