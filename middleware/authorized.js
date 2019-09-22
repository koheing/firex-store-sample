export default async ({ store, redirect }) => {
  await store.dispatch('auth/SET_AUTH_STATE')
  if (store.state.auth.uid == null) {
    redirect('/login')
  }
}
