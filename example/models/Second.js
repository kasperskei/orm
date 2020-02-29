import { Model } from '../../src'
// import First from './First'

export default class Second extends Model {
  static get fields() {
    return {
      id: {
        primaryKey: true,
      },

      firstId: {
        isForeignKey: true,
        foreignField: 'secondId',
        foreignModel: 'First',
      },

      first: {
        isForeignEntity: true,
        foreignField: 'secondId',
        foreignModel: 'First',
        localField: 'firstId',
      },
    }
  }
}
