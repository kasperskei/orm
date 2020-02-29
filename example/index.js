import { createDatabase } from '../src'

import First from './models/First'
import Second from './models/Second'
import Third from './models/Third'
import Fourth from './models/Fourth'
import Fifth from './models/Fifth'


const database = createDatabase(First, Second, Third, Fourth, Fifth)

/**
 * Добавление нормализованных данных
 * - Без внешних ключей
 * - С единственным внешним ключем
 * - С внешними ключами
 */
First.insert([
  {
    id: 1,
  },
  {
    id: 2,
  },
  {
    id: 3,
    secondId: 3,
    thirdIdList: [3],
    fourthIdList: [3],
  },
  {
    id: 4,
    secondId: 4,
    thirdIdList: [4],
    fourthIdList: [4],
  },
])
Second.insert([
  {
    id: 1,
  },
  {
    id: 2,
    firstId: 2,
  },
  {
    id: 3,
  },
  {
    id: 4,
    firstId: 4,
  },
])
Third.insert([
  {
    id: 1,
  },
  {
    id: 2,
    firstId: 2,
  },
  {
    id: 3,
  },
  {
    id: 4,
    firstId: 4,
  },
])
Fourth.insert([
  {
    id: 1,
  },
  {
    id: 2,
    firstIdList: [2],
  },
  {
    id: 3,
  },
  {
    id: 4,
    firstIdList: [4],
  },
])
Fifth.insert([
  {
    id: 1,
  },
  {
    id: 2,
    parentId: 1,
  },
  {
    id: 3,
    parentId: 1,
  },
  {
    id: 4,
    parentId: 2,
  },
])

/**
 * Добавление вложенных данных
 * - Без внешних ключей
 * - С внешним ключем в ребенке
 * - С внешним ключем в родителе
 * - С внешними ключами
 */
// First.insert([
//   {
//     id: 1,
//     second: {
//       id: 1,
//     },
//     thirdList: [{
//       id: 1,
//     }],
//     fourthList: [{
//       id: 1,
//     }],
//   },
//   {
//     id: 2,
//     second: {
//       id: 2,
//       firstId: 2,
//     },
//     thirdList: [{
//       id: 2,
//       firstId: 2,
//     }],
//     fourthList: [{
//       id: 2,
//       firstIdList: [2],
//     }],
//   },
//   {
//     id: 3,
//     secondId: 3,
//     thirdIdList: [3],
//     fourthIdList: [3],
//     second: {
//       id: 3,
//     },
//     thirdList: [{
//       id: 3,
//     }],
//     fourthList: [{
//       id: 3,
//     }],
//   },
//   {
//     id: 4,
//     secondId: 4,
//     thirdIdList: [4],
//     fourthIdList: [4],
//     second: {
//       id: 4,
//       firstId: 4,
//     },
//     thirdList: [{
//       id: 4,
//       firstId: 4,
//     }],
//     fourthList: [{
//       id: 4,
//       firstIdList: [4],
//     }],
//   },
// ])
// Fifth.insert([
//   {
//     id: 1,
//     childList: [
//       {
//         id: 2,
//         parentId: 1,
//         childList: [
//           {
//             id: 4,
//           },
//         ],
//       },
//       {
//         id: 3,
//       },
//     ],
//   },
// ])
// Fifth.insert([
//   {
//     id: 1,
//     childList: [
//       {
//         id: 2,
//         parentId: 1,
//         childList: [
//           {
//             id: 4,
//           },
//         ],
//       },
//       {
//         id: 3,
//       },
//     ],
//   },
//   {
//     id: 7,
//     parent: {
//       id: 6,
//       parent: {
//         id: 5,
//       },
//     },
//     childList: [
//       {
//         id: 8,
//         parentId: 7,
//       },
//     ],
//   },
// ])

/**
 * Добавление новых данных и установление связей с существующими данными
 * Исходный объект не имеет связей
 */
// First.insert([
//   {
//     id: 1,
//   },
// ])
// Second.insert([
//   {
//     id: 1,
//     firstId: 1,
//   },
// ])
// Third.insert([
//   {
//     id: 1,
//     firstId: 1,
//   },
// ])
// Fourth.insert([
//   {
//     id: 1,
//     firstIdList: [1],
//   },
// ])

window.First = First
window.Second = Second
window.Third = Third
window.Fourth = Fourth
window.Fifth = Fifth

window.first = First.get(4)
window.second = Second.get(4)
window.third = Third.get(4)
window.fourth = Fourth.get(4)
window.fifth = Fifth.get(4)

window.database = database


// First.get(4).delete()
first.update({ id: 5, secondId: 2 })

console.log(database)
Object.entries(database.entities)
  .forEach(([name, entity]) => console.log(name, Array.from(entity.values())))


// const xxx = new Map()
// const yyy = []
const len = 1000000

// for (let i = 0; i < len; i++) {
//   xxx.set(i, i)
//   yyy.push({ id: i })
// }

const timer = (func) => {
  const t0 = performance.now()
  func()
  const t1 = performance.now()
  return t1 - t0
}

// const x = [...xxx.values()]
// Array.from(xxx.values())

// timer(() => {
//   for (let i = 0; i < len; i++) {
//     yyy.find(it => it.id === i)
//   }
// }) |> console.log

// timer(() => {
//   for (let i = 0; i < len; i++) {
//     yyy[xxx.get(i)]
//   }
// }) |> console.log

// timer(() => {
//   for (let i = 0; i < len; i++) {
//     xxx.get(i)
//   }
// }) |> console.log

// timer(() => {
//   for (let i = 0; i < len; i++) {
//     yyy[i]
//   }
// }) |> console.log


// const xxx = new Map()
// for (let i = 0; i < len; i++) {
//   xxx.set(i, { id: i })
// }
// const yyy = { xxx }

// timer(() => {
//   [...xxx.keys()]
//     .map((foreignKey) => xxx.get(foreignKey))
//     .filter((foreignInstance) => foreignInstance !== undefined)
//     .forEach((foreignInstance) => 1 + 1)
// }) |> console.log

// timer(() => {
//   [...xxx.keys()]
//     .forEach((foreignKey) => {
//       const foreignInstance = xxx.get(foreignKey)
//       if (foreignInstance !== undefined) {
//         1 + 1
//       }
//     })
// }) |> console.log

// timer(() => {
//   [...xxx.values()]
//     .filter((foreignInstance) => foreignInstance !== undefined)
//     .forEach((foreignInstance) => 1 + 1)
// }) |> console.log

// timer(() => {
//   [...xxx.values()]
//     .forEach((foreignInstance) => {
//       if (foreignInstance !== undefined) {
//         1 + 1
//       }
//     })
// }) |> console.log

// timer(() => {
//   [...xxx.values()]
//     .forEach((foreignInstance) => {
//       if (foreignInstance !== undefined) {
//         1 + 1
//       }
//     })
// }) |> console.log

// timer(() => {
//   xxx
//     .forEach((foreignInstance) => {
//       if (foreignInstance !== undefined) {
//         1 + 1
//       }
//     })
// }) |> console.log
