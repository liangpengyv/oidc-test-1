const TOKEN_KEY = 'token'

const utility = {
  setToken: (token) => {
    localStorage.setItem(TOKEN_KEY, token)
  },
  getToken: () => {
    const token = localStorage.getItem(TOKEN_KEY)
    return token ? token : ''
  },
}

export default utility
