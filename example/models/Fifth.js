import { Model } from '../../src'
// import First from './First'

export default class Fifth extends Model {
  static get fields() {
    return {
      id: {
        primaryKey: true,
      },

      parentId: {
        isForeignKey: true,
        foreignModel: 'Fifth',
      },

      parent: {
        isForeignEntity: true,
        foreignModel: 'Fifth',
        localField: 'parentId',
      },

      childList: {
        isForeignEntity: true,
        foreignField: 'parentId',
        foreignModel: 'Fifth',
        isEnum: true,
      },
    }
  }
}
