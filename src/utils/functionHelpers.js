export const makeCancelablePromise = promise => {
  let hasCanceled_ = false
  const wrappedPromise = new Promise((resolve, reject) => {
    promise.then(
      res => hasCanceled_ ? reject({isCanceled: true}) : resolve(res),
      err => hasCanceled_ ? reject({isCanceled: true}) : reject(err)
    )
  })
  return {
    promise: wrappedPromise,
    cancel() {
      hasCanceled_ = true
    },
  }
}
