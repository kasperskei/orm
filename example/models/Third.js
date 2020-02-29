import { Model } from '../../src'
// import First from './First'

export default class Third extends Model {
  static get fields() {
    return {
      id: {
        primaryKey: true,
      },

      firstId: {
        isForeignKey: true,
        foreignField: 'thirdIdList',
        foreignModel: 'First',
      },

      first: {
        isForeignEntity: true,
        foreignField: 'thirdIdList',
        foreignModel: 'First',
        localField: 'firstId',
      },
    }
  }
}
