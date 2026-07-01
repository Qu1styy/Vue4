<template>
  <div class="cart-page">

    <h1>Корзина</h1>

    <div v-if="cart.length">

      <div
          class="cart-item"
          v-for="item in groupedCart"
          :key="item.id"
      >

        <div class="cart-image">
          <img
              :src="getImage(item.product_id)"
              :alt="item.name"
          >
        </div>

        <div class="cart-info">
          <h2>{{ item.name }}</h2>
          <p>{{ item.description }}</p>
        </div>

        <div class="cart-right">

          <div class="cart-price">
            {{ item.price * item.quantity }} ₽
          </div>

          <div class="quantity">

            <button
                class="quantity-btn"
                @click="decrease(item)"
            >
              −
            </button>

            <span>{{ item.quantity }}</span>

            <button
                class="quantity-btn"
                @click="increase(item)"
            >
              +
            </button>

          </div>

        </div>

      </div>

      <div class="cart-total">
        <h2>Итого</h2>

        <span>{{ total }} ₽</span>
      </div>

    </div>

    <div v-else class="empty">

      Корзина пуста

    </div>

  </div>
</template>

<script>
export default {
  methods: {
    getImage(productId) {
      const product = this.products.find(p => p.id === productId);

      if (!product) {
        return "";
      }

      return `http://lifestealer86.ru/${product.image}`;
    },
    increase(item) {

      this.$store.dispatch("ADD_TO_CART", item.product_id)
          .then(() => this.$store.dispatch("GET_CART"));

    },

    decrease(item) {

      const id = item.ids[item.ids.length - 1];

      this.$store.dispatch("REMOVE_FROM_CART", id)
          .then(() => this.$store.dispatch("GET_CART"));

    }

  },

  computed: {
    groupedCart() {
      const grouped = {};

      this.cart.forEach((item) => {
        if (!grouped[item.product_id]) {
          grouped[item.product_id] = {
            ...item,
            quantity: 1,
            ids: [item.id],
          };
        } else {
          grouped[item.product_id].quantity++;
          grouped[item.product_id].ids.push(item.id);
        }
      });

      return Object.values(grouped);
    },

    total() {
      return this.groupedCart.reduce((sum, item) => {
        return sum + item.price * item.quantity;
      }, 0);
    },

    cart() {
      return this.$store.getters.cart;
    },

    products() {
      return this.$store.getters.products;
    }
  },
  mounted() {
    this.$store.dispatch("GET_CART");
    this.$store.dispatch("GET_PRODUCTS");
  }


};
</script>

<style scoped>

.cart-page{

  max-width:1200px;

  margin:40px auto;

}


/* заголовок */

.cart-page h1{

  font-size:32px;

  font-weight:700;

  margin-bottom:30px;

  color:#111827;

}



/* список */

.cart-item{

  display:flex;

  align-items:center;

  gap:25px;

  background:white;

  border-radius:20px;

  padding:22px;

  margin-bottom:20px;

  border:1px solid #f3f4f6;

  box-shadow:
      0 5px 20px rgba(0,0,0,.05);

  transition:.3s;

  animation:show .35s;

}


.cart-item:hover{

  transform:translateY(-4px);

  box-shadow:
      0 15px 35px rgba(0,0,0,.1);

}



/* картинка */

.cart-image{

  width:150px;

  height:150px;

  background:#fafafa;

  border-radius:16px;

  padding:15px;

  display:flex;

  align-items:center;

  justify-content:center;

}


.cart-image img{

  width:100%;

  height:100%;

  object-fit:contain;

  transition:.3s;

}


.cart-item:hover img{

  transform:scale(1.05);

}



/* инфо */

.cart-info{

  flex:1;

}


.cart-info h2{

  font-size:20px;

  margin-bottom:10px;

  color:#111827;

}


.cart-info p{

  color:#6b7280;

  font-size:14px;

  line-height:1.5;

}



/* правая часть */

.cart-right{

  display:flex;

  flex-direction:column;

  align-items:flex-end;

  gap:20px;

}



.cart-price{

  font-size:28px;

  font-weight:700;

  color:#111827;

}



/* количество */

.quantity{

  display:flex;

  align-items:center;

  gap:14px;

  background:#f3f4f6;

  padding:5px;

  border-radius:14px;

}


.quantity-btn{

  width:42px;

  height:42px;

  border:none;

  border-radius:12px;

  background:#005BFF;

  color:white;

  font-size:22px;

  cursor:pointer;

  transition:.25s;

}


.quantity-btn:hover{

  background:#0046d5;

  transform:scale(1.05);

}


.quantity span{

  width:35px;

  text-align:center;

  font-size:18px;

  font-weight:700;

}



/* итог */


.cart-total{

  margin-top:40px;

  background:white;

  border-radius:20px;

  padding:25px;

  display:flex;

  justify-content:space-between;

  align-items:center;

  box-shadow:
      0 5px 20px rgba(0,0,0,.06);

}


.cart-total h2{

  font-size:24px;

}


.cart-total span{

  font-size:34px;

  font-weight:700;

  color:#005BFF;

}



/* пустая корзина */


.empty{

  height:300px;

  display:flex;

  justify-content:center;

  align-items:center;

  font-size:28px;

  color:#9ca3af;

}



/* адаптив */

@media(max-width:700px){


  .cart-item{

    flex-direction:column;

    align-items:flex-start;

  }


  .cart-right{

    width:100%;

    align-items:flex-start;

  }


  .cart-image{

    width:100%;

    height:220px;

  }


}



/* анимация */

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