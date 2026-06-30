<template>
  <button @click="logout">Выйти</button>
  <div class="home">

  </div>

</template>

<script>
// @ is an alias to /src


export default {
  methods: {
    logout() {
      this.$store.dispatch("LOGOUT")
          .then(() => {
            this.$router.push("/login");
          });
    },
  },
  name: 'HomeView',
  components: {
  }
}
</script>
