<template>
  <div class="orders-page">
    <h1>
      Мои заказы
    </h1>
    <div
        class="orders"
        v-if="orders.length"
    >
      <div
          class="order-card"
          v-for="order in orders"
          :key="order.id"
      >
        <div class="order-header">
          <h2>
            Заказ №{{ order.id }}
          </h2>
          <span>
{{ order.order_price }} ₽
</span>
        </div>
        <div class="products">
          <div
              v-for="(id,index) in order.products"
              :key="index"
              class="product"
          >
            {{ getProductName(id) }}
          </div>
        </div>
      </div>
    </div>
    <div
        v-else
        class="empty"
    >
      Заказов пока нет
    </div>
  </div>
</template>

<script>

export default {
  computed: {
    orders() {
      return this.$store.getters.orders;
    },
    products() {
      return this.$store.getters.products;
    }
  },
  methods: {
    getProductName(id) {
      const product = this.products.find(
          p => p.id === id
      );
      return product
          ? product.name
          : "Товар";
    }
  },

  mounted() {
    this.$store.dispatch("GET_ORDERS");
    this.$store.dispatch("GET_PRODUCTS");
  }
}
</script>

<style scoped>

.orders-page {
  max-width: 1100px;
  margin: 40px auto;
}

h1 {
  font-size: 32px;
  margin-bottom: 30px;
}

.order-card {
  background: white;
  border-radius: 20px;
  padding: 25px;
  margin-bottom: 20px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, .06);
  animation: show .3s;
}

.order-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.order-header span {
  font-size: 26px;
  font-weight: 700;
  color: #5e00ff;
}

.products {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.product {
  background: #f3f4f6;
  padding: 10px 16px;
  border-radius: 12px;
  font-size: 14px;
}

.empty {
  text-align: center;
  margin-top: 100px;
  font-size: 28px;
  color: #999;
}

@keyframes show {

  from {
    opacity: 0;
    transform: translateY(20px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>