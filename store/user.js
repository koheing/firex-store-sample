import {
  findFirestore,
  firestoreMutations,
  subscribeFirestore
} from 'firex-store'
import { firestore } from '../plugins/firebase'

export const state = () => ({
  user: null
})

export const getters = {
  user: (state) => state.user
}

export const mutations = {
  ...firestoreMutations({ statePropName: 'user', type: 'document' })
}

export const actions = {
  SUBSCRIBE: ({ state, commit }, { uid }) => {
    const ref = firestore.collection('/users').doc(uid)
    const onCompleted = () => {
      console.log('can fetch user data')
    }

    subscribeFirestore({
      state,
      commit,
      ref,
      options: {
        onCompleted
      }
    })
  },
  CREATE_IF_NOT_EXIST: async ({ state, commit }, { user }) => {
    const ref = firestore.collection('/users').doc(user.uid)
    const tmp = await findFirestore({
      ref
    })

    if (tmp != null) return
    await firestore
      .collection('/users')
      .doc(user.uid)
      .set({
        displayName: user.displayName || 'None',
        email: user.email || 'test@gmail.com'
      })
  },
  UPDATE: async ({ state, commit }, { user }) => {
    await firestore
      .collection('/users')
      .doc(user.docId)
      .set({ displayName: user.displayName, email: user.email })
  }
}
