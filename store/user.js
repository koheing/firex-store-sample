import { from, firestoreMutations, to } from 'firex-store'
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
    await to(firestore.collection('/users').doc(user.id)).set(user, {
      mapper: (data) => ({
        displayName: data.displayName || 'None',
        email: data.email || 'test@gmail.com'
      })
    })
  },
  UPDATE: async (_, { user }) => {
    await to(firestore.collection('/users').doc(user.docId))
      .transaction()
      .mergeSet(user, {
        mapper: (data) => ({
          displayName: data.displayName,
          email: data.email
        }),
        completionHandler: () => console.log('completed')
      })
  }
}
