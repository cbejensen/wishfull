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
  } else if (user.password !== user.confirmPassword) {
    return throwError('Passwords do not match.')
  } else {
    return firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
    .then(res => {
      firebase.database().ref('users/' + res.uid).set(user);
      return res;
    }, err => {
      throw Error(err.message);
    });
  }
}
