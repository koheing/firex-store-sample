<template>
  <v-layout row wrap pl-5 pr-5>
    <v-flex xs12 class="comments">
      <div class="text-center">
        <v-progress-circular
          :size="70"
          :width="10"
          color="primary"
          indeterminate
          v-if="!isLoaded"
        ></v-progress-circular>
      </div>
      <v-list v-if="isLoaded">
        <comment
          v-for="comment in comments"
          :key="comment.date.seconds"
          :comment="comment"
        >
        </comment>
      </v-list>
    </v-flex>
    <v-card class="send elevation-8" width="100%">
      <v-layout row wrap align-content-space-between justify-space-between>
        <v-flex xs10>
          <v-text-field
            v-model="message"
            placeholder="input message"
            class="text-field"
          ></v-text-field>
        </v-flex>
        <v-flex xs2 align-self-center class="text-center">
          <v-btn
            class="send-button"
            color="primary"
            :disabled="message.length === 0"
            @click="pushComment"
            >send</v-btn
          >
        </v-flex>
      </v-layout>
    </v-card>
  </v-layout>
</template>
<script>
import { mapGetters } from 'vuex'
import { from, actionTypes } from 'firex-store'
import CommentVue from '../components/Comment.vue'
import { firestore } from '../plugins/firebase'

export default {
  middleware: 'authorized',
  components: {
    comment: CommentVue
  },
  data: () => ({
    message: ''
  }),
  async asyncData({ store }) {
    const user = await from(
      firestore.collection('/users').doc(store.getters['auth/uid'])
    )
      .once()
      .find({ completionHandler: () => console.log('can fetch') })
    return { user }
  },
  async fetch({ store }) {
    // store.commit('comment/INITIALIZED') //  if you'd like to unsubscribe, comment out, please
    await store.dispatch(`comment/${actionTypes.COLLECTION_SUBSCRIBE}`)
  },
  computed: {
    ...mapGetters({
      comments: 'comment/comments',
      isLoaded: 'comment/isLoaded'
    })
  },
  destroyed() {
    // this.$store.dispatch(`comment/${actionTypes.COLLECTION_UNSUBSCRIBE}`) // iif you'd like to unsubscribe, comment out, please
  },
  methods: {
    pushComment() {
      const comment = {
        message: this.message,
        date: new Date(),
        user: this.user
      }
      this.$store.dispatch('comment/CREATE', { comment })
      this.message = ''
    }
  }
}
</script>

<style scoped>
.send {
  position: fixed;
  z-index: 3;
  bottom: 36px;
  left: 0;
}

.text-field {
  margin-left: 20px;
  width: 100%;
}

.send-button {
  margin-left: 20px;
}

.comments {
  padding-bottom: 70px;
}
</style>
