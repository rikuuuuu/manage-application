export const strict = false

export const state = () => ({
  user: null,
  auth: false,
})

export const getters = {
  auth: (state) => state.auth,
  isAuthenticated(state) {
    return !!state.user
  },
}

export const mutations = {
  changeAuth(state, auth) {
    state.auth = auth
  },
  setUser(state, payload) {
    state.user = payload
  },
}

export const actions = {
  setUser({ commit }, payload) {
    commit('setUser', payload)
  },
}
