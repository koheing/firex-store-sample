import {
  firestoreMutations,
  firestoreUnsubscribeAction,
  FirestoreUnsubscriber,
  FirestoreSubscriber,
  actionTypes
} from 'firex-store'
import { firestore } from '../plugins/firebase'

export const state = () => ({
  comments: [],
  isLoaded: false
})

export const getters = {
  comments: (state) => state.comments,
  isLoaded: (state) => state.isLoaded
}

export const mutations = {
  ...firestoreMutations('collection'),
  INITIALIZED: (state) => {
    state.comments = []
  },
  SET_LOAD_STATE: (state, isLoaded) => {
    state.isLoaded = isLoaded
  }
}

export const actions = {
  [actionTypes.collection.SUBSCRIBE]: ({ state, commit }) => {
    FirestoreSubscriber.from(
      firestore.collection('/comments').orderBy('date', 'asc')
    )
      .bindTo('comments')
      .subscribe(state, commit, {
        mapper: (data) => ({
          message: data.message,
          date: data.date,
          user: {
            docId: data.user.docId,
            displayName: data.user.displayName
          }
        }),
        afterMutationCalled: (payload) => {
          if (typeof payload.isLast === 'undefined') {
            return
          }
          commit('SET_LOAD_STATE', payload.isLast)
        }
      })
  },
  ...firestoreUnsubscribeAction(FirestoreUnsubscriber.unbind('comments'), {
    type: 'collection'
  }),
  CREATE: (_, { comment }) => {
    firestore.collection('/comments').add(comment)
  }
}
