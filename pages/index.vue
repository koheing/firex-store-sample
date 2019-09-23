<template>
  <v-layout column justify-center align-center>
    <v-flex xs12 sm8 md6>
      <div class="text-center">
        <logo />
        <vuetify-logo />
      </div>
      <v-card>
        <v-card-title class="headline"> Hello!! Your profile is</v-card-title>
        <v-card-text>
          <v-text-field v-model="userForUpdated.displayName" label="name">
          </v-text-field>
          <v-text-field
            v-model="userForUpdated.email"
            label="email"
            :disabled="true"
          >
          </v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn color="primary" nuxt :disabled="isLoading" @click="moveTo">
            Fix name And next
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import { mapGetters } from 'vuex'
import Logo from '~/components/Logo.vue'
import VuetifyLogo from '~/components/VuetifyLogo.vue'

export default {
  middleware: 'authorized',
  components: {
    Logo,
    VuetifyLogo
  },
  data: () => ({
    userForUpdated: { displayName: '', email: '' },
    isLoading: false
  }),
  async fetch({ store }) {
    await store.dispatch('user/SUBSCRIBE', { uid: store.getters['auth/uid'] })
  },
  computed: {
    ...mapGetters({
      user: 'user/user'
    })
  },
  created() {
    this.userForUpdated = { ...this.user }
  },
  methods: {
    moveTo() {
      this.isLoading = true
      if (this.userForUpdated.displayName === this.user.displayName) {
        this.$router.replace({ name: 'comments' })
        return
      }
      this.$store
        .dispatch('user/UPDATE', {
          user: this.userForUpdated
        })
        .then(() => {
          this.$router.replace({ name: 'comments' })
        })
        .catch((_) => (this.isLoading = false))
    }
  },
  watch: {
    user: {
      handler(newValue) {
        this.userForUpdated = { ...this.user }
      },
      deep: true
    }
  }
}
</script>
