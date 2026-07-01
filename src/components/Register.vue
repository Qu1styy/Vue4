<template>
  <div class="auth-page">

    <div class="auth-card">

      <h1>Создать аккаунт</h1>
      <p>Заполните данные для регистрации</p>

      <form @submit.prevent="register">

        <div class="input-group">
          <label>ФИО</label>
          <input
              type="text"
              v-model="fio"
              placeholder="Иванов Иван Иванович"
              required
          >
        </div>

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
          Зарегистрироваться
        </button>

      </form>

      <router-link
          to="/login"
          class="bottom-link"
      >
        Уже есть аккаунт? Войти
      </router-link>

    </div>

  </div>
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

      this.$store
          .dispatch("REGISTER_REQUEST", userData)
          .then(() => {

            this.$router.push("/");

          });

    }

  }

};
</script>

<style scoped>

.auth-page{

  min-height:calc(100vh - 140px);

  display:flex;

  justify-content:center;

  align-items:center;

}

.auth-card{

  width:450px;

  background:white;

  border-radius:22px;

  padding:40px;

  box-shadow:0 15px 45px rgba(0,0,0,.08);

  animation:show .4s;

}

.auth-card h1{

  text-align:center;

  margin-bottom:8px;

}

.auth-card p{

  text-align:center;

  color:#777;

  margin-bottom:35px;

}

.input-group{

  margin-bottom:20px;

}

label{

  display:block;

  margin-bottom:8px;

  font-weight:600;

}

input{

  width:100%;

  height:52px;

  border:2px solid #ececec;

  border-radius:12px;

  padding:0 18px;

  font-size:15px;

  transition:.2s;

}

input:focus{

  outline:none;

  border-color:#005BFF;

}

button{

  width:100%;

  height:52px;

  margin-top:10px;

  border:none;

  border-radius:12px;

  background:#005BFF;

  color:white;

  font-size:16px;

  font-weight:600;

  cursor:pointer;

  transition:.25s;

}

button:hover{

  background:#0047d6;

  transform:translateY(-2px);

}

.bottom-link{

  display:block;

  text-align:center;

  margin-top:25px;

  text-decoration:none;

  color:#005BFF;

}

@keyframes show{

  from{

    opacity:0;

    transform:translateY(20px);

  }

  to{

    opacity:1;

    transform:translateY(0);

  }

}

</style>