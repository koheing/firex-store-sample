import { from, firestoreMutations } from 'firex-store'
import { firestore } from '../plugins/firebase'

export const state = () => ({
  user: null
})

export const getters = {
  user: (state) => state.user
}

export const mutations = {
  ...firestoreMutations('document')
}

export const actions = {
  SUBSCRIBE: ({ state, commit }, { uid }) => {
    const ref = firestore.collection('/users').doc(uid)
    const completionHandler = () => {
      console.log('can fetch user data')
    }

    from(ref)
      .bindTo('user')
      .subscribe(state, commit, {
        completionHandler,
        afterMutationCalled: (payload) =>
          console.log(`${payload.data.docId} fetched`)
      })
  },
  CREATE_IF_NOT_EXIST: async (_, { user }) => {
    const ref = firestore.collection('/users').doc(user.uid)
    const tmp = await from(ref)
      .once()
      .find()

    if (tmp != null && tmp.docId) return
    await firestore
      .collection('/users')
      .doc(user.uid)
      .set({
        displayName: user.displayName || 'None',
        email: user.email || 'test@gmail.com'
      })
  },
  UPDATE: async (_, { user }) => {
    await firestore
      .collection('/users')
      .doc(user.docId)
      .set({ displayName: user.displayName, email: user.email })
  }
}
