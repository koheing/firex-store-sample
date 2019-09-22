export default async ({ store, redirect }) => {
  await store.dispatch('auth/IS_AUTHORIZED')
  if (store.state.auth.uid == null) {
    redirect('/login')
  }
}
