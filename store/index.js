export const actions = {
  async nuxtServerInit({ state, dispatch }) {
    await dispatch('auth/IS_AUTHORIZED')
  }
}
