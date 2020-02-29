import { Model } from '../../src'
// import First from './First'

export default class Fourth extends Model {
  static get fields() {
    return {
      id: {
        primaryKey: true,
      },

      firstIdList: {
        isForeignKey: true,
        foreignField: 'fourthIdList',
        foreignModel: 'First',
        isEnum: true,
      },

      firstList: {
        isForeignEntity: true,
        foreignField: 'fourthIdList',
        foreignModel: 'First',
        localField: 'firstIdList',
        isEnum: true,
      },
    }
  }
}
