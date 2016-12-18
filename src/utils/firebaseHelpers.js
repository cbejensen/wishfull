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

function verifyWish(wish) {
  wish.price = verifyPrice(wish.price);
  wish.priority = parseInt(wish.priority);
  const url = verifyUrl(wish.url);
  return url ? true : false;
}

function verifyUrl(value) {
  return /^(https?|ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(value);
}

function verifyPrice(val) {
  if (typeof val === 'number') {
    return val
  } else {
    const start = val.substring(0, 1);
    if (start === '$') {
      val = val.substring(1);
      return +val;
    }
    return +val;
  }
}

export const addWish = (wish, uid) => {
  const verified = verifyWish(wish);
  if (verified) {
    const wishRef = firebase.database().ref(`lists/${uid}`).push();
    return wishRef.update(wish).then(res => {
      return res;
    }, err => {
      throw err;
    })
  } else {
    return new Error('Error');
  }
}

export const updateWish = (uid, wishRef, wish) => {
  console.log(wish)
  const verified = verifyWish(wish);
  if (verified) {
    return firebase.database().ref(`/lists/${uid}/${wishRef}`).set(wish)
    .then(res => {
      return res;
    }, err => {
      throw err;
    })
  } else {
    return new Error('Error');
  }
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
