<template>
  <div class="messages-counter">
    <h1 class="messages-counter__label">Сообщения</h1>
    <p class="messages-counter__count">{{ messageCount }}</p>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "MessageCounter",
  computed: {
    ...mapGetters("messenger", ["messageCount"]),
  },
};
</script>

<style scoped lang="scss">
@use "src/assets/scss/mixins" as *;
@use "src/assets/scss/variables" as *;

.messages-counter {
  padding: 1.5rem 1.25rem 1rem;
  display: flex;
  align-items: center;
  &__label {
    @include main-text;
    margin-right: 0.625rem;
    color: $messages-label-color;
  }
  &__count {
    @include main-text;
    color: $messages-count-color;
  }
}
</style>
