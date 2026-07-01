<template>
  <div id="app">
    <header class="header">
      <div class="container navbar">

        <router-link class="logo" to="/">
          Shop
        </router-link>

        <nav>
          <template v-if="isAuthenticated">
            <router-link to="/">Главная</router-link>
            <router-link to="/cart">Корзина</router-link>
            <router-link to="/logout" class="logout">
              Выйти
            </router-link>
          </template>

          <template v-else>
            <router-link to="/login">Вход</router-link>
            <router-link to="/register">Регистрация</router-link>
          </template>
        </nav>

      </div>
    </header>

    <main class="container">
      <router-view v-slot="{ Component }">
        <transition name="page" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>

  </div>
</template>

<script>
export default {
  computed: {
    isAuthenticated() {
      return this.$store.getters.isAuthenticated;
    },
  },
};
</script>

<style>

@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

*{
  margin:0;
  padding:0;
  box-sizing:border-box;
}

body{
  font-family:Inter,sans-serif;
  background:#f5f7fb;
  color:#1f2937;
}

.container{
  width:min(1280px,95%);
  margin:auto;
}

.header{

  position:sticky;
  top:0;

  z-index:100;

  background:white;

  box-shadow:0 4px 20px rgba(0,0,0,.05);

  margin-bottom:35px;

}

.navbar{

  height:72px;

  display:flex;
  justify-content:space-between;
  align-items:center;

}

.logo{

  font-size:28px;

  font-weight:700;

  text-decoration:none;

  color:#005bff;

}

nav{

  display:flex;

  gap:14px;

}

nav a{

  text-decoration:none;

  color:#4b5563;

  font-weight:500;

  padding:10px 18px;

  border-radius:10px;

  transition:.25s;

}

nav a:hover{

  background:#edf4ff;

  color:#005bff;

}

nav a.router-link-exact-active{

  background:#005bff;

  color:white;

}

.logout{

  background:#ef4444;

  color:white;

}

.logout:hover{

  background:#dc2626;

  color:white;

}

/* Появление страниц */

.page-enter-active,
.page-leave-active{

  transition:.3s;

}

.page-enter-from{

  opacity:0;

  transform:translateY(20px);

}

.page-leave-to{

  opacity:0;

  transform:translateY(-20px);

}

</style>