import * as firebase from 'firebase';
var config = {
  apiKey: "AIzaSyCcpmz6SLB1nWt3j4x7HwVFoiohdXSRRo4",
  authDomain: "wishfull.firebaseapp.com",
  databaseURL: "https://wishfull.firebaseio.com",
  storageBucket: "project-4729593249156139744.appspot.com",
};
firebase.initializeApp(config);

const storageRef = firebase.storage().ref();

export const createUser = user => {
  if (user.firstName === '') {
    throw 'First name is required.';
  } else if (user.lastName === '') {
    throw 'Last name is required.';
  } else {
    return firebase.auth()
    .createUserWithEmailAndPassword(user.email, user.password)
    .then(res => {
      user.password = null;
      firebase.database().ref(`users/${res.uid}`).set(user);
      return res;
    }, err => {
      throw err;
    });
  }
}

export const getUser = uid => {
  const ref = firebase.database().ref(`users/${uid}`);
  return ref.once('value').then(snap => {
    let user = snap.val();
    user.uid = uid;
    return user;
  }, err => {
    throw err;
  })
}

export const addWish = (wish, uid) => {
  const wishRef = firebase.database().ref(`lists/${uid}`).push();
  return wishRef.update(wish).then(res => {
    return res;
  }, err => {
    throw err;
  })
}

export const updateWish = (uid, wishRef, wish) => {
  return firebase.database().ref(`/lists/${uid}/${wishRef}`).update(wish)
  .then(res => {
    return res;
  }, err => {
    throw err;
  })
}

export const getList = uid => {
  const listRef = firebase.database().ref(`lists/${uid}`);
  return listRef.once('value').then(snap => {
    return snap.val()
  }, err => {
    throw err;
  })
};

export const getWish = (uid, itemId) => {
  return getList(uid).then(list => {
    return list[itemId];
  }, err => {
    throw err;
  })
}

export const fulfillWish = (uid, wishId, fulfiller) => {
  const path = `lists/${uid}/${wishId}`;
  const ref = firebase.database().ref(path);
  return ref.update({fulfilled: fulfiller}).then(res => {
    return res;
  }, err => {
    throw err;
  })
}

export const deleteWish = (uid, wishId) => {
  const path = `lists/${uid}/${wishId}`;
  firebase.database().ref(path).remove();
}

export const getFriendIds = uid => {
  const usersRef = firebase.database().ref(`users/${uid}/friends`);
  return usersRef.once('value').then(snap => {
    return snap.val();
  }, err => {
    throw err;
  });
}

export const getAllUsers = () => {
  const usersRef = firebase.database().ref('users');
  return usersRef.once('value').then(snap => {
    return snap.val();
  }, err => {
    throw err;
  })
}

export const updateFriend = (uid, friendId) => {
  const ref = firebase.database().ref(`users/${uid}/friends/${friendId}`);
  return ref.once('value').then(snap => {
    if (snap.val()) {
      ref.remove();
    } else {
      ref.set(true).then(res =>{
        return res;
      }, err => {
        throw err;
      })
    }
  }, err => {
    throw err;
  })
}

export const uploadFile = (file, path) => {
  return storageRef.child(path).put(file).then(snap => {
    return snap;
  }, err => {
    throw err;
  });
}

export const getFile = path => {
  return storageRef.child(path).getDownloadURL().then(url => {
    return url;
  }, err => {
    throw err;
  })
}

// SEARCH

export const searchFriends = (str, uid) => {
  return getFriendIds(uid).then(friendIds => {
    let promiseArray = [];
    for (var key in friendIds) {
      if (friendIds.hasOwnProperty(key)) {
        promiseArray.push(getUser(key))
      }
    }
    return Promise.all(promiseArray).then(friends => {
      const filteredFriends = filterUsersByName(str, friends);
      return filteredFriends;
    }, err => {
      console.log(err)
    })
  }, err => {
    console.log(err)
  })
}

export const searchUsers = (str) => {
  return getAllUsers().then(users => {
    const usersArray = Object.keys(users).map(key => users[key])
    const filteredUsers = filterUsersByName(str, usersArray);
    return filteredUsers;
  })
}

export const searchWishes = (str, uid) => {
  return getList(uid).then(list => {
    console.log('LIST:', list)
    const wishes = Object.keys(list).map(wishId => {
      list[wishId].id = wishId;
      return list[wishId];
    })
    const filteredWishes = filterWishesByTitle(str, wishes)
    return filteredWishes
  }, err => {
    console.log(err);
  })
}

const filterUsersByName = (str, users) => {
  let filteredUsers = [];
  let matches = 0;
  for (const user of users) {
    let name = user.firstName + ' ' + user.lastName;
    str = str.toLowerCase();
    name = name.toLowerCase();
    if (name.indexOf(str) !== -1) {
      filteredUsers.push(user);
      matches++;
    }
    if (matches === 5) break;
  };
  return filteredUsers;
}

const filterWishesByTitle = (str, wishes) => {
  let filteredWishes = [];
  wishes.forEach(wish => {
    str = str.toLowerCase();
    let title = wish.title.toLowerCase();
    if (title.indexOf(str) !== -1) {
      filteredWishes.push(wish);
    }
  })
  return filteredWishes;
}

export const search = (query, category, uid) => {
  if (category === 'friends') {
    return searchFriends(query, uid).then(res => {
      return res;
    }, err => {
      return err;
    });
  } else if (category === 'users') {
    return searchUsers(query).then(res => {
      return res;
    }, err => {
      return err;
    });
  } else if (category === 'wishes') {
    return searchWishes(query, uid).then(res => {
      return res;
    }, err => {
      return err;
    });
  }
}
