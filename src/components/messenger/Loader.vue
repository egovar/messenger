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
@use "src/assets/scss/variables" as *;

.loader {
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: $main-background-color;
  &__icon {
    width: 25%;
  }
}
</style>
