import * as cache from '../cache'

const localStorage = {}

localStorage.get = function (key, callback) {
  try {
    return callback(null, cache.get(key))
  } catch (e) {
    return callback(e)
  }
}

localStorage.set = function (key, value, callback) {
  try {
    if (key && value) {
      cache.set(key, value)
    }
    return callback()
  } catch (e) {
    return callback(e)
  }
}

function clearValuesForKey (keyArray, append) {
  if (!append && keyArray && keyArray.length) keyArray.push('')
  const keys = cache.getKeys()
  let storage = cache.getStorage()
  if (!keyArray || !keyArray.length) {
    keys.forEach((key) => {
      delete storage[key]
    })
  } else {
    const _key = keyArray.join('.')
    for (let i = 0, _i = keys.length; i < _i; i++) {
      if (keys[i] && keys[i].indexOf(_key) === 0) delete storage[keys[i]]
    }
  }
}

localStorage.clearByContentType = function () {
  try {
    if (arguments.length === 2 || arguments.length === 3) {
      let args = Array.prototype.slice.call(arguments)
      let callback = args.splice(-1, 1).pop()
      let valueArray = []
      valueArray.push.apply(valueArray, args)
      clearValuesForKey(valueArray)
      return callback()
    }
  } catch (e) {
    return callback(e)
  }
}

localStorage.clearByQuery = function (query, callback) {
  try {
    const keys = cache.getKeys()
    let storage = cache.getStorage()
    for (let i = 0, _i = keys.length; i < _i; i++) {
      if (keys[i] && ~keys[i].indexOf(query)) {
        delete storage[keys[i]]
      }
    }
    return callback()
  } catch (e) {
    return callback(e)
  }
}

localStorage.clearAll = function (callback) {
  try {
    clearValuesForKey()
    return callback()
  } catch (e) {
    return callback(e)
  }
}

export {
  localStorage
}
