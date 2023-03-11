// export const usePreloader = (query) => {
//   const promise = new Promise((resolve, reject) => {
//     // resolve with data from server
//     const data = useSanityData(query)
//     // if there is no data, reject the promise
//     if (!data) {
//       reject()
//     }

//     // if there is data, resolve the promise
//     resolve()

//     // return data
//     return data
//   })

//   return promise
// }

export const usePreloader = () => {
  return useState('hasLaoaded', () => false)
}
