import axios from 'axios'

export function emailWishComment(wishTitle, message, emailTo) {
  console.log(wishTitle, message, emailTo)
  const body = JSON.stringify({ wishTitle, message, emailTo })
  return fetch(
    'https://shielded-plateau-25567.herokuapp.com/api/1/email-alert/wish-comment/',
    {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      },
      body
    }
  )
    .then(res => res.json().then(data => data))
    .catch(err => err)
}
