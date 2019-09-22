import { auth } from '../plugins/firebase'

export const state = () => ({
  uid: null
})

export const getters = {
  uid: (state) => state.uid
}

export const mutations = {
  set: (state, { uid }) => {
    state.uid = uid
  }
}

export const actions = {
  LOGIN_WITH_EMAIL_AND_PASSWORD: async (
    { commit, dispatch },
    { email, password }
  ) => {
    const user = await auth
      .signInWithEmailAndPassword(email, password)
      .then((result) => result.user)
      .catch((error) => {
        console.error(error)
        return null
      })

    if (!user) return false
    commit('set', { uid: user.uid })

    return dispatch('user/CREATE_IF_NOT_EXIST', { user }, { root: true })
      .then(() => true)
      .catch((_) => false)
  },
  IS_AUTHORIZED: ({ state, commit }) => {
    const user = new Promise((resolve, reject) => {
      auth.onAuthStateChanged((user) => {
        resolve(user || false)
      })
    })

    if (user !== null && state.uid === null) {
      commit('set', { uid: user.id })
    }
  }
}
