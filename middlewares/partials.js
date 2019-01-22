import { Stack } from '../models/contentstack'

export const partials = (req, res, next) => {
  const types = ['header', 'footer']
  const bucket = []
  types.forEach((type) => {
    bucket.push(fetchEntries(type))
  })
  return Promise.all(bucket).then((output) => {
    bucket.forEach((type, index) => {
      res.locals.partials[type] = output[index]
    })
    return next()
  })
}

const fetchEntries = (uid) => {
  return new Promise((resolve, reject) => {
    return Stack.ContentType(uid).Query()
      .toJSON()
      .find()
      .then(resolve)
      .catch(reject)
  })
}
