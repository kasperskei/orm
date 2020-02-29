import defineCreate from './defineCreate'
import definePrototype from './definePrototype'
import defineUpdate from './defineUpdate'
import defineDelete from './defineDelete'
import defineRead from './defineRead'
import defineRelationship from './defineRelationship'
import defineSource from './defineSource'

class Database {
  constructor(...modelList) {
    this.entities = {}
    this.models = {}

    modelList
      .flat()
      .map((model) => {
        this.entities[model.name] = new Map()
        this.models[model.name] = model
        return model
      })
      .map((model) => {
        defineSource(this)(model)
        return model
      })
      .map((model) => {
        defineCreate(model)
        defineRead(model)
        defineUpdate(model)
        defineDelete(model)
        definePrototype(model)
        defineRelationship(model)
        return model
      })
  }
}

export default Database
