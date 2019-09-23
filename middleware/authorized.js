export default ({ store, redirect }) => {
  if (store.getters['auth/uid'] == null) {
    redirect('/login')
  }
}
