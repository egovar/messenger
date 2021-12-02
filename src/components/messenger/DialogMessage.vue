<template>
  <div
    class="dialog__message message"
    :class="isSelf(sender) ? 'message_self' : null"
  >
    <p class="message__bubble">{{ text }}</p>
    <div class="message__info">
      <h3 class="message__sender">{{ sender }}</h3>
      <p class="message__time">{{ formattedSendingTime }}</p>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { formatDate } from "@/utils/formatDate";

export default {
  props: {
    text: {
      type: String,
      default: "",
    },
    sender: {
      type: String,
      default: "",
    },
    time: {
      type: String,
      default: "",
    },
  },
  computed: {
    ...mapGetters(["userName"]),
    formattedSendingTime() {
      return formatDate(this.time);
    },
  },
  methods: {
    isSelf(sender) {
      return sender === this.userName;
    },
  },
};
</script>

<style scoped lang="scss">
@use "src/assets/scss/mixins" as *;
@use "src/assets/scss/variables" as *;

.message {
  width: 100%;
  margin-bottom: 1.25rem;
  display: flex;
  flex-direction: column;
  &__bubble {
    @include main-text;
    margin-bottom: 0.5rem;
    max-width: 60%;
    word-break: break-word;
    white-space: pre-wrap;
    color: $message-text-color;
  }
  &__info {
    display: flex;
    align-items: baseline;
  }
  &__sender {
    @include medium-text;
    color: $message-sender-color;
    margin-right: 0.75rem;
  }
  &__time {
    @include date-text;
    color: $date-color;
  }
  &_self {
    align-items: flex-end;
    > .message__bubble {
      border-radius: 0.5rem 0.5rem 0 0.5rem;
      background-color: $self-message-background-color;
      color: $self-message-text-color;
      padding: 1rem 1rem 1rem 1.5rem;
    }
  }
  &:not(&_self) {
    align-items: flex-start;
    > .message__bubble {
      border-radius: 0.5rem 0.5rem 0.5rem 0;
      background-color: $message-background-color;
      color: $message-text-color;
      padding: 1rem 1.5rem 1rem 1rem;
    }
  }
}
</style>
