export const actions = {
  async nuxtServerInit({ state, dispatch }) {
    await dispatch('auth/SET_AUTH_STATE')
  }
}
