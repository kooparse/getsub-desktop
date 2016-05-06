import OS from 'opensubtitles'
const os = new OS()


/**
 * Bind opensubtitles computeHash method
 *
 * @param {String} File's path
 * @return {String} Computed hash string is returned
 */
const computeHash = async (path) => {
  return await new Promise((resolve, reject) => {
    os.computeHash(path, (err, size) => {
      if (err) reject(err)
      else resolve(size)
    })
  })
}


/**
 * Bind opensubtitles checkMovieHash method
 *
 * @param {Array} Array of files size
 * @return {Array} Array of object with file infos
 */
const checkMovieHash = async (sizes) => {
  return await new Promise ((resolve, reject) => {
    os.checkMovieHash(sizes, (err, res) => {
      if (err) reject(err)
      else resolve(res.data)
    })
  })
}


/**
 * Bind opensubtitles login method
 * With filtered response (only Token)
 *
 * @return {String} Token is returned
 */
const login = async () => {
  return new Promise((resolve, reject) => {
    os.api.LogIn((err, res) => {
      if (err) reject(err)
      else resolve(res.token)
    }, null, null, null, 'OSTestUserAgent')
  })
}


/**
 * Bind opensubtitles search for subtitles method
 *
 * @param {String} Token
 * @param {Array} Query (see http://bit.ly/22B0NX4)
 * @return {Array} List of subtitle objects
 */
const searchSubtitles = async (token, query) => {
  return new Promise((resolve, reject) => {
    os.api.SearchSubtitles((err, res) => {
      if (err) reject(err)
      else resolve(res.data)
    }, token, query)
  })
}


export {
  computeHash,
  checkMovieHash,
  searchSubtitles,
  login
}
