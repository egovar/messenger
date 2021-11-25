<template>
  <div
    class="dialog__message message"
    :class="sender === userName ? 'message_self' : null"
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
import { formatDateString } from "@/utils/formatDate";

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
      return formatDateString(this.time);
    },
  },
};
</script>

<style scoped lang="scss">
.message {
  width: 100%;
  margin-bottom: 1.25rem;
  display: flex;
  flex-direction: column;
  &__bubble {
    font-size: 0.875rem;
    line-height: 143%;
    margin-bottom: 0.5rem;
    max-width: 60%;
    word-break: break-word;
    white-space: pre-wrap;
  }
  &__info {
    display: flex;
    align-items: baseline;
  }
  &__sender {
    font-size: 0.8125rem;
    margin-right: 0.75rem;
    line-height: 140%;
  }
  &__time {
    font-size: 0.625rem;
    line-height: 140%;
  }
  &_self {
    align-items: flex-end;
    > .message__bubble {
      border-radius: 0.5rem 0.5rem 0 0.5rem;
      background-color: #e9f5f4;
      padding: 1rem 1rem 1rem 1.5rem;
    }
  }
  &:not(&_self) {
    align-items: flex-start;
    > .message__bubble {
      border-radius: 0.5rem 0.5rem 0.5rem 0;
      background-color: #f6f7f9;
      padding: 1rem 1.5rem 1rem 1rem;
    }
  }
}
</style>
