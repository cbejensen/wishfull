import * as firebase from 'firebase';

function throwError(err) {
  return Promise.reject(err).then(err => {}, err => {
    throw Error(err);
  })
}

export const getAuth = () => {
  return firebase.auth().onAuthStateChanged(user => {
    return user;
  }, err => {
    return err;
  });
}

export const createUser = user => {
  if (user.firstName === '') {
    return throwError('First name is required.')
  } else if (user.lastName === '') {
    return throwError('Last name is required.')
  } else {
    return firebase.auth()
    .createUserWithEmailAndPassword(user.email, user.password)
    .then(res => {
      user.password = null;
      firebase.database().ref(`users/${res.uid}`).set(user);
      return res;
    }, err => {
      return err;
    });
  }
}

export const getUser = uid => {
  const ref = firebase.database().ref(`users/${uid}`);
  return ref.once('value').then(snap => {
    return snap.val();
  }, err => {
    return err;
  })
}

export const addWish = (wish, uid) => {
  const wishRef = firebase.database().ref(`lists/${uid}`).push();
  return wishRef.set(wish).then(res => {
    return res;
  }, err => {
    return err;
  })
}

export const updateWish = (uid, wishRef, wish) => {
  return firebase.database().ref(`/lists/${uid}/${wishRef}`).set(wish)
  .then(res => {
    return res;
  }, err => {
    return err;
  })
}

export const getList = uid => {
  const listRef = firebase.database().ref(`lists/${uid}`);
  return listRef.once('value').then(snap => {
    return snap.val()
  }, err => {
    return err;
  })
};

export const getWish = (uid, itemId) => {
  console.log(uid, itemId)
  return getList(uid).then(list => {
    return list[itemId];
  }, err => {
    return err;
  })
}

export const getFriends = uid => {
  // let array = [];
  // const getFriend = id => {
  //   const friendsRef = firebase.database().ref(`users/${id}`);
  //   friendsRef.once('value').then(friendSnap => {
  //     return friendSnap.val();
  //   })
  // }
  const usersRef = firebase.database().ref(`users/${uid}/friends`);
  return usersRef.once('value').then(snap => {
    console.log(snap.val())
    return snap.val();
  }, err => {
    return err;
  });
}
