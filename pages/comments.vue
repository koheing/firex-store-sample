<template>
  <v-layout row wrap pl-5 pr-5>
    <v-flex xs12 class="comments">
      <v-list>
        <v-list-item v-for="comment in comments" :key="comment.date.seconds">
          <v-list-item-avatar>
            <div class="circle">{{ comment.user.displayName[0] }}</div>
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title>{{
              comment.user.displayName
            }}</v-list-item-title>
            <v-list-item-subtitle
              >{{ comment.message }}
              <p class="time">
                {{ comment.date | dateFormatter }}
              </p></v-list-item-subtitle
            >
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-flex>
    <v-card class="text-field" width="100%">
      <v-layout row wrap>
        <v-flex xs10>
          <v-text-field
            v-model="message"
            placeholder="input message"
            class="text"
          ></v-text-field>
        </v-flex>
        <v-flex xs2 align-self-center>
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
import { actionTypes } from 'firex-store'

export default {
  middleware: 'authorized',
  data: () => ({
    message: '',
    commentsForView: []
  }),
  async fetch({ store }) {
    store.commit('comment/INITIALIZED') // if you unsubscribed, remove this code, please
    await store.dispatch(`comment/${actionTypes.COLLECTION_SUBSCRIBE}`)
  },
  computed: {
    ...mapGetters({
      comments: 'comment/comments',
      user: 'user/user'
    })
  },
  created() {
    this.commentsForView = this.comments
  },
  destroyed() {
    this.$store.dispatch(`comment/${actionTypes.COLLECTION_UNSUBSCRIBE}`)
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
  },
  filters: {
    dateFormatter(timestamp) {
      const date = new Date(timestamp.seconds * 1000)
      const hours = date.getHours()
      const minutes = '0' + date.getMinutes()
      const seconds = '0' + date.getSeconds()

      return hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2)
    }
  }
}
</script>

<style scoped>
.text-field {
  position: fixed;
  z-index: 3;
  bottom: 37px;
  left: 0;
}

.text {
  margin-left: 20px;
}

.send-button {
  margin-left: 20px;
}

.circle {
  display: inline-block;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #349fcb;
  text-align: center;
  line-height: 40px;
}

.time {
  position: absolute;
  right: 0;
  padding-right: 12px;
}

.comments {
  padding-bottom: 70px;
}
</style>
