<template>
  <div class="container">
    <div v-if="!!product">
      <a-page-header class="product-header" :title="product.title">
        <template #tags>
          <a-tag color="blue">{{ capitalize(product.category) }}</a-tag>
        </template>
        <template #extra>
          <a-rate :value="Math.round(product.rating.rate)" disabled />
        </template>
        <a-row class="product-info">
          <a-col :xs="24" :md="4">
            <a-statistic title="Price" prefix="$" :value="product.price" />
          </a-col>
          <a-col :xs="24" :md="20">
            <p>{{ product.description }}</p>
          </a-col>
        </a-row>
      </a-page-header>

      <div class="content center">
        <img class="product-image" :src="product.image" :alt="product.title" />
      </div>
    </div>

    <div class="loader center" v-else>
      <a-spin tip="Loading..." />
    </div>
  </div>
</template>

<script>
import { capitalize } from "shared/utils";

export default {
  props: {
    productId: String,
  },
  data() {
    return {
      product: null,
    };
  },
  methods: {
    capitalize,
  },
  mounted() {
    const productId = this.productId || location.pathname.split("/")[1] || "1"; // Quick way to work in isolation
    fetch(`${process.env.BASE_URL}/products/${productId}`)
      .then((response) => response.json())
      .then((product) => {
        this.product = product;
      });
  },
};
</script>

<style scoped>
.container {
  max-width: 1200px;
  margin: 0 auto;
}
.content {
  margin-top: 32px;
}
.center {
  display: flex;
  justify-content: center;
  align-items: center;
}
.product-image {
  max-height: 400px;
  max-width: 100%;
}
.loader {
  height: 100%;
}
.product-header {
  border: 1px solid rgb(235, 237, 240);
}
@media (max-width: 479px) {
  .container >>> .ant-page-header-heading-left {
    flex-direction: column;
    align-items: flex-start;
  }
  .container >>> .ant-page-header-heading-title {
    width: 100%;
  }
}
</style>