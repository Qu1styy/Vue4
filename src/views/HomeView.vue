<template>
  <div class="catalog">

    <div class="catalog-header">
      <h1>Каталог товаров</h1>
    </div>

    <div class="products">

      <article
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

        <div class="product-content">

          <div class="price">

            {{ product.price }} ₽

          </div>

          <h3>

            {{ product.name }}

          </h3>

          <p>

            {{ product.description }}

          </p>

          <div class="card-bottom">

            <template v-if="isAuthenticated">

              <button
                  v-if="!isInCart(product.id)"
                  class="buy-btn"
                  @click="addToCart(product.id)"
              >
                В корзину
              </button>

              <div
                  v-else
                  class="quantity"
              >

                <button
                    @click="decrease(product.id)"
                >
                  −
                </button>

                <span>

                  {{ getQuantity(product.id) }}

                </span>

                <button
                    @click="increase(product.id)"
                >
                  +

                </button>

              </div>

            </template>

            <router-link
                v-else
                to="/login"
                class="login-btn"
            >
              Войти для покупки
            </router-link>

          </div>

        </div>

      </article>

    </div>

  </div>
</template>

<script>
export default {
  name: 'HomeView',
  methods: {
    isInCart(productId) {
      return this.cart.some(item => item.product_id === productId);
    },
    getQuantity(productId) {
      return this.cart.filter(item => item.product_id === productId).length;
    },
    addToCart(id) {
      this.$store.dispatch("ADD_TO_CART", id)
          .then(() => this.$store.dispatch("GET_CART"));
    },
    increase(productId) {
      this.$store.dispatch("ADD_TO_CART", productId)
          .then(() => this.$store.dispatch("GET_CART"));
    },
    decrease(productId) {
      const item = this.cart.find(cartItem => cartItem.product_id === productId);
      if (!item) return;
      this.$store.dispatch("REMOVE_FROM_CART", item.id)
          .then(() => this.$store.dispatch("GET_CART"));
    }
  },
  computed: {
    isAuthenticated() {
      return this.$store.getters.isAuthenticated;
    },
    products() {
      return this.$store.getters.products;
    },
    cart() {
      return this.$store.getters.cart;
    },
  },
  mounted() {
    this.$store.dispatch("GET_PRODUCTS");
    this.$store.dispatch("GET_CART");
  },
}
</script>

<style scoped>

.catalog{
  max-width:1400px;
  margin:0 auto;
}

.catalog-header{
  display:flex;
  justify-content:space-between;
  align-items:center;
  margin-bottom:35px;
}

.catalog-header h1{
  font-size:34px;
  font-weight:700;
  color:#1f2937;
}

.catalog-header span{
  padding:8px 16px;
  background:#eef2ff;
  color:#4f46e5;
  border-radius:999px;
  font-weight:600;
  font-size:14px;
}

.products{
  display:grid;
  grid-template-columns:repeat(auto-fill,minmax(285px,1fr));
  gap:24px;
}

.product-card{

  display:flex;
  flex-direction:column;

  background:#fff;

  border-radius:22px;

  overflow:hidden;

  transition:.3s;

  border:1px solid #ececec;

  animation:card .35s ease;

  box-shadow:
      0 5px 18px rgba(0,0,0,.05);

}

.product-card:hover{

  transform:translateY(-8px);

  box-shadow:
      0 20px 45px rgba(0,0,0,.12);

}

.product-image{

  height:280px;

  padding:28px;

  display:flex;

  justify-content:center;

  align-items:center;

  background:
      linear-gradient(
          180deg,
          #fafafa,
          #f5f5f5
      );

}

.product-image img{

  width:100%;

  height:100%;

  object-fit:contain;

  transition:.35s;

}

.product-card:hover img{

  transform:scale(1.08);

}

.product-content{

  display:flex;

  flex-direction:column;

  flex:1;

  padding:22px;

}

.price{

  font-size:32px;

  font-weight:700;

  color:#111827;

  margin-bottom:14px;

}

.product-content h3{

  font-size:18px;

  font-weight:600;

  color:#111827;

  margin-bottom:12px;

  line-height:1.4;

  display:-webkit-box;

  -webkit-line-clamp:2;

  -webkit-box-orient:vertical;

  overflow:hidden;

}

.product-content p{

  color:#6b7280;

  line-height:1.5;

  font-size:14px;

  display:-webkit-box;

  -webkit-line-clamp:3;

  -webkit-box-orient:vertical;

  overflow:hidden;

  margin-bottom:20px;

}

.card-bottom{

  margin-top:auto;

}

.buy-btn{

  width:100%;

  height:50px;

  border:none;

  border-radius:14px;

  background:#005BFF;

  color:white;

  font-size:16px;

  font-weight:600;

  cursor:pointer;

  transition:.25s;

}

.buy-btn:hover{

  background:#0046d5;

  transform:translateY(-2px);

  box-shadow:0 10px 25px rgba(0,91,255,.25);

}

.buy-btn:active{

  transform:scale(.98);

}

.quantity{

  display:flex;

  align-items:center;

  justify-content:space-between;

  height:52px;

  background:#005BFF;

  border-radius:14px;

  padding:0 6px;

}

.quantity button{

  width:40px;

  height:40px;

  border:none;

  border-radius:10px;

  background:white;

  color:#005BFF;

  font-size:24px;

  font-weight:700;

  cursor:pointer;

  transition:.2s;

}

.quantity button:hover{

  transform:scale(1.08);

  background:#f3f4f6;

}

.quantity span{

  color:white;

  font-size:18px;

  font-weight:700;

}

.login-btn{

  display:flex;

  justify-content:center;

  align-items:center;

  width:100%;

  height:50px;

  text-decoration:none;

  border-radius:14px;

  background:#111827;

  color:white;

  font-weight:600;

  transition:.25s;

}

.login-btn:hover{

  background:#1f2937;

  transform:translateY(-2px);

}

@keyframes card{

  from{

    opacity:0;

    transform:translateY(25px);

  }

  to{

    opacity:1;

    transform:translateY(0);

  }

}

@media (max-width:768px){

  .catalog-header{

    flex-direction:column;

    align-items:flex-start;

    gap:12px;

  }

  .catalog-header h1{

    font-size:28px;

  }

  .products{

    grid-template-columns:repeat(auto-fill,minmax(220px,1fr));

    gap:16px;

  }

  .product-image{

    height:220px;

  }

}

</style>