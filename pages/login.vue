<template>
  <v-content>
    <v-container fluid fill-height>
      <v-layout align-center justify-center>
        <v-flex xs12 sm8>
          <v-card class="elevation-12">
            <v-progress-linear
              id="form"
              :indeterminate="isAuthorizing"
              :hidden="!isAuthorizing"
            ></v-progress-linear>
            <v-card-text>
              <v-alert v-show="hasError" type="error">
                Error Occured
              </v-alert>
              <v-form ref="form" v-model="valid">
                <v-text-field
                  v-model="email"
                  label="mail"
                  :rules="emailRules"
                  required
                ></v-text-field>
                <v-text-field
                  v-model="password"
                  label="Password"
                  type="password"
                  :rules="passwordRules"
                  required
                ></v-text-field>
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-btn
                id="login"
                color="primary"
                large
                block
                :disabled="isDisableButton"
                @click="login"
              >
                Login
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-content>
</template>

<script>
export default {
  data() {
    return {
      valid: false,
      isAuthorizing: false,
      hasError: false,
      email: '',
      emailRules: [(v) => !!v || 'required'],
      password: '',
      passwordRules: [(v) => !!v || 'required']
    }
  },
  computed: {
    isDisableButton() {
      return this.isAuthorizing || !this.valid
    }
  },
  methods: {
    async login() {
      if (!this.$refs.form.validate()) {
        return
      }
      this.isAuthorizing = true
      this.hasError = false
      const isSucceeded = await this.$store.dispatch(
        `auth/LOGIN_WITH_EMAIL_AND_PASSWORD`,
        {
          email: this.email,
          password: this.password
        }
      )
      if (isSucceeded) {
        this.moveTo()
      } else {
        this.isAuthorizing = false
        this.hasError = true
      }
    },
    moveTo() {
      this.$router.replace({ name: 'index' })
    }
  }
}
</script>
