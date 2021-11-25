<template>
  <div class="messages-counter">
    <h1 class="messages-counter__label">Сообщения</h1>
    <p class="messages-counter__length">{{ messageAmount }}</p>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "MessageCounter",
  computed: {
    ...mapGetters("messenger", ["messageAmount"]),
  },
};
</script>

<style scoped lang="scss">
.messages-counter {
  padding: 1.5rem 1.25rem 1rem;
  display: flex;
  align-items: center;
  &__label {
    font-size: 0.875rem;
    margin-right: 0.625rem;
  }
  &__length {
    font-size: 0.875rem;
  }
}
</style>
