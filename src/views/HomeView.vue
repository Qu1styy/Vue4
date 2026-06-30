<template>
  <button @click="logout">Выйти</button>
  <div class="products">
    <div
        class="product-card"
        v-for="product in products"
        :key="product.id"
    >
      <div class="product-image">
        <img
            :src="`http://lifestealer86.ru/${product.image}`"
            :alt="product.name"
        >
      </div>

      <div class="product-body">
        <h3>{{ product.name }}</h3>

        <p>{{ product.description }}</p>

        <div class="price">
          {{ product.price }} ₽
        </div>

        <button class="buy-btn">
          В корзину
        </button>
      </div>
    </div>
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
  },
  computed: {
    products() {
      return this.$store.getters.products;
    },
  },
  mounted() {
    this.$store.dispatch("GET_PRODUCTS");
  },
}
</script>

<style scoped>
.products{
  display:grid;
  grid-template-columns:repeat(auto-fill,minmax(260px,1fr));
  gap:22px;
}

.product-card{
  display:flex;
  flex-direction:column;

  background:#fff;
  border-radius:16px;
  overflow:hidden;

  border:1px solid #ececec;

  transition:.25s;
}

.product-card:hover{
  transform:translateY(-4px);
  box-shadow:0 8px 25px rgba(0,0,0,.08);
}

.product-image{
  height:260px;

  display:flex;
  justify-content:center;
  align-items:center;

  padding:20px;
}

.product-image img{
  width:100%;
  height:100%;

  object-fit:contain;
}

.product-body{
  display:flex;
  flex-direction:column;
  flex:1;

  padding:18px;
}

.product-body h3{
  margin:0;

  font-size:18px;
  font-weight:600;

  color:#202020;

  display:-webkit-box;
  -webkit-line-clamp:2;
  -webkit-box-orient:vertical;

  overflow:hidden;
}

.product-body p{
  margin:12px 0;

  color:#6b7280;

  font-size:14px;
  line-height:1.45;

  display:-webkit-box;
  -webkit-line-clamp:3;
  -webkit-box-orient:vertical;

  overflow:hidden;
}

.price{
  margin-top:auto;

  font-size:28px;
  font-weight:700;

  color:#111827;
}

.buy-btn{
  margin-top:16px;

  width:100%;
  height:46px;

  border:none;
  border-radius:10px;

  background:#005bff;
  color:white;

  font-size:16px;
  font-weight:600;

  cursor:pointer;

  transition:.2s;
}

.buy-btn:hover{
  background:#0046d5;
}

</style>
