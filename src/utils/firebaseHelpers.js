import * as firebase from 'firebase';

export const createUser = function(user) {
  function throwError(err) {
    return Promise.reject(err).then(err => {}, err => {
      throw Error(err);
    })
  }
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
