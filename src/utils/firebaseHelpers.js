import * as firebase from 'firebase'
var config = {
  apiKey: "AIzaSyCcpmz6SLB1nWt3j4x7HwVFoiohdXSRRo4",
  authDomain: "wishfull.firebaseapp.com",
  databaseURL: "https://wishfull.firebaseio.com",
  storageBucket: "project-4729593249156139744.appspot.com",
}
firebase.initializeApp(config)

const storageRef = firebase.storage().ref()

export const createUser = user => {
  return firebase.auth()
  .createUserWithEmailAndPassword(user.email, user.password)
  .then(auth => {
    const avatar = user.avatar
    delete user.avatar
    delete user.password
    return firebase.database().ref(`users/${auth.uid}`).set(user).then(newUser => {
      if (avatar) {
        return new Promise((resolve, reject) => {
          const uploadTask = storageRef.child(`images/avatars/${auth.uid}`).put(avatar)
          return uploadTask.on('state_changed', snap => {
            // observe state change events such as progress, pause, and resume
            var progress = (snap.bytesTransferred / snap.totalBytes) * 100
            console.log('Upload is ' + progress + '% done')
            switch (snap.state) {
              case firebase.storage.TaskState.PAUSED: // or 'paused'
                console.log('Upload is paused')
                break
              case firebase.storage.TaskState.RUNNING: // or 'running'
                console.log('Upload is running')
                break
            }
          }, err => {
            reject(err);
          }, () => {
            resolve('success')
          })
        })
        uploadFile(avatar, `images/avatars/${auth.uid}`).then(snap => {
          getFile(`images/avatars/${auth.uid}`).then(res => {
            console.log(res)
            return 'success'
          }, err => {
            console.log(err)
            return 'hey'
          })
        })
      }
      return 'success'
    })
  }, err => {
    throw err
  })
}

export const getUser = uid => {
  const ref = firebase.database().ref(`users/${uid}`)
  return ref.once('value').then(snap => {
    let user = snap.val()
    user.uid = uid
    return user
  }, err => {
    throw err
  })
}

export const addWish = (wish, uid) => {
  const wishRef = firebase.database().ref(`lists/${uid}`).push()
  return wishRef.update(wish).then(res => {
    return res
  }, err => {
    throw err
  })
}

export const updateWish = (uid, wishRef, wish) => {
  return firebase.database().ref(`/lists/${uid}/${wishRef}`).update(wish)
  .then(res => {
    return res
  }, err => {
    throw err
  })
}

export const getList = uid => {
  const listRef = firebase.database().ref(`lists/${uid}`)
  return listRef.once('value').then(snap => {
    return snap.val()
  }, err => {
    throw err
  })
}

export const getWish = (uid, itemId) => {
  return getList(uid).then(list => {
    return list[itemId]
  }, err => {
    throw err
  })
}

export const fulfillWish = (uid, wishId, fulfiller) => {
  const path = `lists/${uid}/${wishId}`
  const ref = firebase.database().ref(path)
  return ref.update({fulfilled: fulfiller}).then(res => {
    return res
  }, err => {
    throw err
  })
}

export const deleteWish = (uid, wishId) => {
  const path = `lists/${uid}/${wishId}`
  firebase.database().ref(path).remove()
}

export const getFriendIds = uid => {
  const usersRef = firebase.database().ref(`users/${uid}/friends`)
  return usersRef.once('value').then(snap => {
    return snap.val()
  }, err => {
    throw err
  })
}

export const getAllUsers = () => {
  const usersRef = firebase.database().ref('users')
  return usersRef.once('value').then(snap => {
    return snap.val()
  }, err => {
    throw err
  })
}

export const updateFriend = (uid, friendId) => {
  const ref = firebase.database().ref(`users/${uid}/friends/${friendId}`)
  return ref.once('value').then(snap => {
    if (snap.val()) {
      ref.remove()
    } else {
      ref.set(true).then(res =>{
        return res
      }, err => {
        throw err
      })
    }
  }, err => {
    throw err
  })
}

export const uploadFile = (file, path) => {
  return storageRef.child(path).put(file).then(snap => {
    return snap
  }, err => {
    throw err
  })
}

export const getFile = path => {
  return storageRef.child(path).getDownloadURL().then(url => {
    return url
  }, err => {
    throw err
  })
}

// SEARCH

export const searchFriends = (str, uid, exclusions) => {
  return getFriendIds(uid).then(friendIds => {
    let promiseArray = []
    for (var key in friendIds) {
      if (friendIds.hasOwnProperty(key)) {
        promiseArray.push(getUser(key))
      }
    }
    return Promise.all(promiseArray).then(friends => {
      const filteredFriends = filterUsersByName(str, friends, exclusions)
      return filteredFriends
    }, err => {
      console.log(err)
    })
  }, err => {
    console.log(err)
  })
}

export const searchUsers = (str, uid, exclusions) => {
  console.log(str, uid, exclusions)
  return getAllUsers().then(users => {
    const usersArray = Object.keys(users).map(key => {
      users[key].uid = key
      return users[key]
    })
    const filteredUsers = filterUsersByName(str, usersArray, exclusions)
    return filteredUsers
  })
}

export const searchWishes = (str, uid) => {
  return getList(uid).then(list => {
    const wishes = Object.keys(list).map(wishId => {
      list[wishId].id = wishId
      return list[wishId]
    })
    const filteredWishes = filterWishesByTitle(str, wishes)
    return filteredWishes
  }, err => {
    console.log(err)
  })
}

const filterUsersByName = (str, users, exclusions) => {
  console.log(str, users, exclusions)
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
            console.log(name)
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

export const search = (query, category, uid) => {
  if (category === 'friends') {
    return searchFriends(query, uid).then(res => {
      return res
    }, err => {
      return err
    })
  } else if (category === 'users') {
    return searchUsers(query).then(res => {
      return res
    }, err => {
      return err
    })
  } else if (category === 'wishes') {
    return searchWishes(query, uid).then(res => {
      return res
    }, err => {
      return err
    })
  }
}
