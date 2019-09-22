<template>
  <v-list-item>
    <v-list-item-avatar>
      <div class="circle">{{ comment.user.displayName[0] }}</div>
    </v-list-item-avatar>

    <v-list-item-content>
      <v-list-item-title>{{ comment.user.displayName }}</v-list-item-title>
      <v-list-item-subtitle
        >{{ comment.message }}
        <p class="time">
          {{ comment.date | dateFormatter }}
        </p></v-list-item-subtitle
      >
    </v-list-item-content>
  </v-list-item>
</template>
<script>
export default {
  filters: {
    dateFormatter(timestamp) {
      const date = new Date(timestamp.seconds * 1000)
      const hours = date.getHours()
      const minutes = '0' + date.getMinutes()
      const seconds = '0' + date.getSeconds()

      return hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2)
    }
  },
  props: {
    comment: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped>
.send {
  position: fixed;
  z-index: 3;
  bottom: 37px;
  left: 0;
}

.text-field {
  margin-left: 20px;
}

.send-button {
  margin-left: 20px;
}

.text-align-center {
  text-align: center;
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
