<template>
  <div class="auth-page">

    <div class="auth-card">

      <h1>Добро пожаловать</h1>
      <p>Войдите в свой аккаунт</p>

      <form @submit.prevent="login">

        <div class="input-group">
          <label>Email</label>
          <input
              type="email"
              v-model="email"
              placeholder="Введите email"
              required
          >
        </div>
        <div class="input-group">
          <label>Пароль</label>
          <input
              type="password"
              v-model="password"
              placeholder="Введите пароль"
              required
          >
        </div>
        <button type="submit">
          Войти
        </button>
      </form>
      <router-link
          to="/register"
          class="bottom-link"
      >
        Нет аккаунта? Зарегистрироваться
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    login() {
      const userData = {
        email: this.email,
        password: this.password,
      };
      this.$store
          .dispatch("AUTH_REQUEST", userData)
          .then(() => {
            this.$router.push("/");
          });
    }
  }
};
</script>

<style scoped>

.auth-page {
  min-height: calc(100vh - 140px);
  display: flex;
  justify-content: center;
  align-items: center;
}

.auth-card {
  width: 420px;
  background: white;
  border-radius: 22px;
  padding: 40px;
  box-shadow: 0 15px 45px rgba(0, 0, 0, .08);
  animation: show .4s;
}

.auth-card h1 {
  text-align: center;
  margin-bottom: 8px;
}

.auth-card p {
  text-align: center;
  color: #777;
  margin-bottom: 35px;
}

.input-group {
  margin-bottom: 22px;
}

label {
  display: block;
  margin-bottom: 8px;
  font-weight: 600;
}

input {
  width: 100%;
  height: 52px;
  padding: 0 18px;
  border: 2px solid #ececec;
  border-radius: 12px;
  font-size: 15px;
  transition: .2s;
}

input:focus {
  outline: none;
  border-color: #5e00ff;
}

button {
  width: 100%;
  height: 52px;
  border: none;
  border-radius: 12px;
  background: #5e00ff;
  color: white;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: .2s;
}

button:hover {
  background: #0047d6;
  transform: translateY(-2px);
}

.bottom-link {
  display: block;
  margin-top: 25px;
  text-align: center;
  text-decoration: none;
  color: #5e00ff;
}

@keyframes show {

  from {
    opacity: 0;
    transform: translateY(25px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>