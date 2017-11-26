export function validateWish(wish) {
  return new Promise((resolve, reject) => {
    if (!validateUrl(wish.url)) {
      reject(Error('The url is invalid.'))
    }
    if (!validatePrice(wish.price)) {
      reject(Error('The price is invalid.'))
    }
    resolve('Success!')
  })
}

export function validateUrl(url) {
  if (url) {
    const reg = /https?:\/\/.*\.\b/
    return reg.test(url)
  }
  return true
}

export function validatePrice(price) {
  if (price) {
    const reg = /^\d+$/
    return reg.test(price)
  }
  return true
}
