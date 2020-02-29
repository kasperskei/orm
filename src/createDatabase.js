import defineCreate from './defineCreate'
import definePrototype from './definePrototype'
import defineUpdate from './defineUpdate'
import defineDelete from './defineDelete'
import defineRead from './defineRead'
import defineRelationship from './defineRelationship'
import defineSource from './defineSource'

const createDatabase = (models) => {
  const db = {
    entities: {},
    models: {},
  }

  models
    .map((model) => {
      db.entities[model.name] = new Map()
      db.models[model.name] = model
      return model
    })
    .map((model) => {
      defineSource(db, model)
      return model
    })
    .map((model) => {
      defineCreate(db, model)
      defineRead(db, model)
      defineUpdate(db, model)
      defineDelete(db, model)
      definePrototype(db, model)
      defineRelationship(db, model)
      return model
    })

  return db
}

export default createDatabase
