import * as firebase from 'firebase';

function throwError(err) {
  return Promise.reject(err).then(err => {}, err => {
    throw Error(err);
  })
}

export const createUser = user => {
  if (user.firstName === '') {
    return throwError('First name is required.')
  } else if (user.lastName === '') {
    return throwError('Last name is required.')
  } else {
    return firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
    .then(res => {
      user.password = null;
      firebase.database().ref(`users/${res.uid}`).set(user);
      return res;
    }, err => {
      throw Error(err.message);
    });
  }
}

export const addWish = (wish, uid) => {
  const wishRef = firebase.database().ref(`lists/${uid}/`).push();
  return wishRef.set(wish).then(res => {
    return 'success';
  }, err => {
    throw Error(err.message);
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
  return listRef.once('value').then(function(snap) {
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
