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
    return snap.val();
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

export const getFriends = uid => {
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
