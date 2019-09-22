import {
  firestoreMutations,
  firestoreSubscribeActions,
  firestoreUnsubscribeActions
} from 'firex-store'
import { firestore } from '../plugins/firebase'

export const state = () => ({
  comments: []
})

export const getters = {
  comments: (state) => state.comments
}

export const mutations = {
  ...firestoreMutations({ statePropName: 'comments', type: 'collection' }),
  INITIALIZED: (state) => {
    state.comments = []
  }
}

export const actions = {
  ...firestoreSubscribeActions({
    ref: firestore.collection('/comments').orderBy('date', 'asc'),
    options: {
      mapper: (data) => ({
        id: data.docId,
        message: data.message,
        date: data.date,
        user: {
          docId: data.user.docId,
          displayName: data.user.displayName
        }
      })
    }
  }),
  ...firestoreUnsubscribeActions({ type: 'collection' }),
  CREATE: ({ state }, { comment }) => {
    firestore.collection('/comments').add(comment)
  }
}
