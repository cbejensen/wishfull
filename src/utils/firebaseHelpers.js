import * as firebase from 'firebase'
var config = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: 'wishfull.firebaseapp.com',
  databaseURL: 'https://wishfull.firebaseio.com',
  storageBucket: 'project-4729593249156139744.appspot.com'
}
firebase.initializeApp(config)

const storageRef = firebase.storage().ref()

export const uploadFile = (file, path) => {
  return storageRef.child(path).put(file)
}

export const getFile = path => {
  return storageRef.child(path).getDownloadURL()
}

export const createUser = user => {
  return firebase
    .auth()
    .createUserWithEmailAndPassword(user.email, user.password)
    .then(
      auth => {
        const avatar = user.avatar
        delete user.avatar
        delete user.password
        return firebase
          .database()
          .ref(`users/${auth.uid}`)
          .set(user)
          .then(newUser => {
            if (avatar) {
              return new Promise((resolve, reject) => {
                const uploadTask = storageRef
                  .child(`images/avatars/${auth.uid}`)
                  .put(avatar)
                return uploadTask.on(
                  'state_changed',
                  snap => {
                    // observe state change events such as progress, pause, and resume
                    var progress =
                      (snap.bytesTransferred / snap.totalBytes) * 100
                    console.log('Upload is ' + progress + '% done')
                    switch (snap.state) {
                      case firebase.storage.TaskState.PAUSED:
                        console.log('Upload is paused')
                        break
                      case firebase.storage.TaskState.RUNNING:
                        console.log('Upload is running')
                        break
                      default:
                        break
                    }
                  },
                  err => {
                    reject(err)
                  },
                  () => {
                    resolve('success')
                  }
                )
              })
            }
            return 'success'
          })
      },
      err => {
        throw err
      }
    )
}

export const getUser = uid => {
  const ref = firebase.database().ref(`users/${uid}`)
  return ref.once('value').then(
    snap => {
      let user = snap.val()
      user.uid = uid
      return user
    },
    err => {
      throw err
    }
  )
}

export const addWish = (wish, uid) => {
  const wishRef = firebase
    .database()
    .ref(`lists/${uid}`)
    .push()
  return wishRef.update(wish).then(
    res => {
      return res
    },
    err => {
      throw err
    }
  )
}

export const updateWish = (uid, wishId, wish) => {
  return firebase
    .database()
    .ref(`/lists/${uid}/${wishId}`)
    .update(wish)
}

export const getWishList = uid => {
  const listRef = firebase.database().ref(`lists/${uid}`)
  return listRef.once('value').then(
    snap => {
      return snap.val()
    },
    err => {
      throw err
    }
  )
}

export function getWish(uid, itemId) {
  const ref = firebase.database().ref(`lists/${uid}/${itemId}`)
  return ref.once('value').then(
    snap => {
      return snap.val()
    },
    err => {
      throw err
    }
  )
}

export const getAllWishLists = () => {
  const ref = firebase.database().ref('lists')
  return ref.once('value').then(
    snap => {
      return snap.val()
    },
    err => {
      throw err
    }
  )
}

export const addWishComment = (uid, userId, wishId, comment) => {
  console.log(uid, userId, wishId, comment)
  const newKey = firebase
    .database()
    .ref()
    .child(`/comments/${wishId}`)
    .push().key
  const updates = {}
  updates[`/comments/${wishId}/${newKey}`] = {
    message: comment,
    timestamp: Date.now(),
    author: uid
  }
  updates[`/notifications/${userId}/${newKey}`] = {
    type: 'WISH_COMMENT',
    wishId,
    timestamp: Date.now()
  }
  updates[`/lists/${userId}/${wishId}/comments`] = {
    [newKey]: newKey
  }
  updates[`/lists/${userId}/${wishId}/newActivity`] = true
  return firebase
    .database()
    .ref()
    .update(updates)
    .then(res => res, err => err)
}

export function getFulfilledWishIds(uid) {
  const ref = firebase.database().ref(`users/${uid}/fulfilled`)
  return ref.once('value').then(
    snap => {
      return snap.val()
    },
    err => {
      throw err
    }
  )
}

export async function getFufilledWishes(uid) {
  const wishes = []
  const fulfilled = await getFulfilledWishIds(uid)
  for (let wishId in fulfilled) {
    if (fulfilled.hasOwnProperty(wishId)) {
      const wish = await getWish(fulfilled[wishId].uid, wishId)
      if (wish) {
        wish.uid = fulfilled[wishId].uid
        wish.id = wishId
        wish.pricePaid = fulfilled[wishId].price
        wishes.push(wish)
      }
    }
  }
  return wishes
}

export const updateFulfillment = (uid, wishId, fulfiller, fulfilled, price) => {
  const shouldFulfill = fulfilled ? true : null
  const updates = {}
  const fulfillmentInfo = {
    uid,
    timestamp: Date.now(),
    price: price || null
  }
  updates[`lists/${uid}/${wishId}/fulfilled`] = shouldFulfill && fulfiller
  updates[`users/${fulfiller}/fulfilled/${wishId}`] =
    shouldFulfill && fulfillmentInfo
  const ref = firebase.database().ref()
  return ref.update(updates).then(
    res => {
      return true
    },
    err => {
      throw err
    }
  )
}

export const deleteWish = (uid, wishId) => {
  const path = `lists/${uid}/${wishId}`
  firebase
    .database()
    .ref(path)
    .remove()
}

export const getFriendIds = uid => {
  const usersRef = firebase.database().ref(`users/${uid}/friends`)
  return usersRef.once('value').then(
    snap => {
      return snap.val()
    },
    err => {
      throw err
    }
  )
}

export const getFriends = uid => {
  return getFriendIds(uid).then(ids => {
    if (!ids) return [] // no friends
    let promises = Object.keys(ids).map(id => {
      return getUser(id).then(user => {
        user.uid = id
        return user
      })
    })
    return Promise.all(promises).then(friends => {
      return friends
    })
  })
}

export const getAllUsers = () => {
  const usersRef = firebase.database().ref('users')
  return usersRef.once('value').then(
    snap => {
      return snap.val()
    },
    err => {
      throw err
    }
  )
}

export const getFriendStatus = (uid, friendId) => {
  const ref = firebase.database().ref(`users/${uid}/friends/${friendId}`)
  return ref.once('value').then(
    snap => {
      return snap.val()
    },
    err => {
      throw err
    }
  )
}

export const toggleFriend = (uid, friendId) => {
  const ref = firebase.database().ref(`users/${uid}/friends/${friendId}`)
  return ref.once('value').then(
    snap => {
      if (snap.val()) {
        ref.remove()
        return false
      } else {
        return ref.set(true).then(
          res => {
            return true
          },
          err => {
            throw err
          }
        )
      }
    },
    err => {
      throw err
    }
  )
}

// SEARCH

const filterUsersByName = (str, users, exclusions) => {
  let filteredUsers = []
  let matches = 0
  str = str.toLowerCase()
  for (const user of users) {
    let name = user.firstName + ' ' + user.lastName
    name = name.toLowerCase()
    if (name.indexOf(str) !== -1) {
      let excluded = false
      if (exclusions) {
        for (const e of exclusions) {
          if (user.uid === e) {
            excluded = true
            break
          }
        }
      }
      if (!excluded) {
        filteredUsers.push(user)
        matches++
      }
    }
    if (matches === 5) break
  }
  return filteredUsers
}

const filterWishesByTitle = (str, wishes) => {
  let filteredWishes = []
  wishes.forEach(wish => {
    str = str.toLowerCase()
    let title = wish.title.toLowerCase()
    if (title.indexOf(str) !== -1) {
      filteredWishes.push(wish)
    }
  })
  return filteredWishes
}

export const searchFriends = (str, uid, exclusions) => {
  return getFriendIds(uid).then(
    friendIds => {
      if (!friendIds) return [] // no friends
      let promiseArray = []
      for (var key in friendIds) {
        if (friendIds.hasOwnProperty(key)) {
          promiseArray.push(getUser(key))
        }
      }
      return Promise.all(promiseArray).then(
        friends => {
          const filteredFriends = filterUsersByName(str, friends, exclusions)
          return filteredFriends
        },
        err => {
          console.log(err)
        }
      )
    },
    err => {
      console.log(err)
    }
  )
}

export const searchUsers = (str, exclusions) => {
  return getAllUsers().then(users => {
    const usersArray = Object.keys(users).map(key => {
      users[key].uid = key
      return users[key]
    })
    const filteredUsers = filterUsersByName(str, usersArray, exclusions)
    return filteredUsers
  })
}

export const searchUsersNotFriends = (str, uid) => {
  return getFriendIds(uid).then(
    friendIds => {
      if (!friendIds) {
        // if no friends yet
        return searchUsers(str)
      } else {
        const arr = Object.keys(friendIds).map(id => id)
        return searchUsers(str, arr).then(users => users)
      }
    },
    err => {
      throw err
    }
  )
}

export const searchWishes = (str, uid) => {
  return getWishList(uid).then(
    list => {
      const wishes = Object.keys(list).map(wishId => {
        list[wishId].id = wishId
        return list[wishId]
      })
      const filteredWishes = filterWishesByTitle(str, wishes)
      return filteredWishes
    },
    err => {
      throw err
    }
  )
}

export const search = (query, category, uid) => {
  if (category === 'friends') {
    return searchFriends(query, uid)
  } else if (category === 'users') {
    return searchUsers(query)
  } else if (category === 'wishes') {
    return searchWishes(query, uid)
  }
}
