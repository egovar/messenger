<template>
  <section class="loader">
    <img
      src="../../assets/icons/loader.svg"
      class="loader__icon"
      alt="Иконка загрузки"
    />
  </section>
</template>

<script>
export default {
  name: "Loader",
};
</script>

<style scoped lang="scss">
.loader {
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
  &__icon {
    width: 25%;
  }
}
</style>
