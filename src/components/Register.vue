<template>
  <form class="register" @submit.prevent="register">
    <h1>Sign up</h1>
    <label>ФИО</label>
    <input type="text" required v-model="fio">
    <label>Email</label><input type="email" required v-model="email">
    <label>Password</label>
    <input type="password" required v-model="password">
    <hr>
    <button type="submit">Register</button>
  </form>
</template>

<script>
export default {
  data() {
    return {
      fio: "",
      email: "",
      password: "",
    };
  },

  methods: {
    register() {
      const userData = {
        fio: this.fio,
        email: this.email,
        password: this.password,
      };
      console.log(userData);

      this.$store
          .dispatch("REGISTER_REQUEST", userData)
          .then(() => this.$router.push("/"))
          .catch((error) => {
            console.error(error);
            alert("Ошибка регистрации");
          });
    },
  },
};
</script>

<style scoped>
.register {
  display: flex;
  flex-direction: column;
  width: 300px;
  margin: 0 auto;
}

.register input,
.register button {
  border: 1px solid #000000;
  border-radius: 5px;
}
hr {
  margin: 10px 0;
}
</style>