<template>
  <div
    class="message-preview"
    :class="active ? 'message-preview_active' : null"
  >
    <h2 class="message-preview__subject">
      {{ subject }}
    </h2>
    <p class="message-preview__date">
      {{ formattedLastMessageDate }}
    </p>
    <p class="message-preview__text">
      {{ lastMessageText }}
    </p>
  </div>
</template>

<script>
import { formatDateString } from "@/utils/formatDate";

export default {
  props: {
    subject: {
      type: String,
      default: "Без темы",
    },
    lastMessageDate: {
      type: String,
      default: "",
    },
    lastMessageText: {
      type: String,
      default: "",
    },
    active: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    formattedLastMessageDate() {
      return formatDateString(this.lastMessageDate, 2);
    },
  },
};
</script>

<style scoped lang="scss">
@use "src/assets/scss/variables" as *;

.message-preview {
  padding: 1.25rem 1.25rem 1.25rem 1.5rem;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  align-items: center;
  cursor: pointer;

  &__subject {
    color: $dialog-subject-color;
    font-weight: 500;
    line-height: 143%;
    font-size: 0.875rem;
    width: 70%;
  }

  &__date {
    color: $preview-date-color;
    font-size: 0.625rem;
    line-height: 140%;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  &__text {
    color: $preview-message-color;
    font-size: 0.8125rem;
    line-height: 138%;
    height: 2.25rem;
    word-break: break-word;

    // 2 strings

    overflow: hidden;
    text-overflow: ellipsis;
    display: -moz-box;
    -moz-box-orient: vertical;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    line-clamp: 2;
    box-orient: vertical;
  }

  &_active,
  &:hover {
    background-color: $active-preview-background-color;
    border-left: 2px solid $primary;
    padding-left: calc(1.5rem - 2px);
  }
}
</style>
