const KEY = 'bloggappUser'

const saveUser = (user) => {
  localStorage.setItem(KEY, JSON.stringify(user))
}

const loadUser = () => {
  console.log('logged user', JSON.parse(window.localStorage.getItem(KEY)))
  return JSON.parse(window.localStorage.getItem(KEY))
}

const removeUser = () => {
  localStorage.removeItem(KEY)
}

export default {
  saveUser, loadUser, removeUser
}