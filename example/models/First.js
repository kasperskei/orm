import { Model } from '../../src'
// import Second from './Second'

export default class First extends Model {
  static get fields() {
    return {
      id: {
        primaryKey: true,
      },

      secondId: {
        isForeignKey: true,
        foreignField: 'firstId',
        foreignModel: 'Second',
      },

      thirdIdList: {
        isForeignKey: true,
        foreignField: 'firstId',
        foreignModel: 'Third',
        isEnum: true,
      },

      fourthIdList: {
        isForeignKey: true,
        foreignField: 'firstIdList',
        foreignModel: 'Fourth',
        isEnum: true,
      },

      second: {
        isForeignEntity: true,
        foreignField: 'firstId',
        foreignModel: 'Second',
        localField: 'secondId',
      },

      thirdList: {
        isForeignEntity: true,
        foreignField: 'firstId',
        foreignModel: 'Third',
        localField: 'thirdIdList',
        isEnum: true,
      },

      fourthList: {
        isForeignEntity: true,
        foreignField: 'firstIdList',
        foreignModel: 'Fourth',
        localField: 'fourthIdList',
        isEnum: true,
      },
    }
  }
}
