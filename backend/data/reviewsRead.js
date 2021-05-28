import reviews from '../data/reviews.js'

export const readReviews = (users) => {
  const objIds = users
    .map((user, index) => {
      if (index <= 3) return
      return user._id
    })
    .filter((id) => {
      return id !== undefined
    })

  const objData = users.filter((user) => {
    return objIds.find((id) => id === user._id)
  })

  const objIdNeed = Math.floor(reviews.length / objIds.length) + 1

  const objArray = Array(objIdNeed)
    .fill(objIds)
    .reduce((acc, val) => acc.concat(val))
    .sort(() => Math.random() - 0.5)

  Array(objIdNeed)

  const reviewsArray = reviews
    .sort(() => Math.random() - 0.5)
    .map((review, index) => {
      const userInfo = objData.find((data) => {
        if (data._id === objArray[index]) return data
      })

      return {
        ...review,
        name: userInfo.name,
        user: userInfo._id,
      }
    })

  var reviewArrays = []

  for (let i = 0, curr = 0; i < 25; i++) {
    var rand = Math.floor(Math.random() * 7) + 1
    var set = reviewsArray.slice(curr, curr + rand)
    curr = curr + rand
    if (set.length != 0) reviewArrays.push(set)
  }

  return reviewArrays
}
