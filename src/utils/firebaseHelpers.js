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
      firebase.database().ref('users/' + res.uid).set(user);
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

export const getList = uid => {
  let arr = [];
  const listRef = firebase.database().ref('lists/' + uid);
  listRef.on('value', snap => {
    const list = snap.val();
    for (var item in list) {
      if (list.hasOwnProperty(item)) {
        arr.push(list[item]);
      }
    }
    return arr;
  })
};
