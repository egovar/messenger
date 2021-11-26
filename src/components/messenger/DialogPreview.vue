<template>
  <div class="dialog-preview" :class="active ? 'dialog-preview_active' : null">
    <h2 class="dialog-preview__subject">
      {{ subject }}
    </h2>
    <p class="dialog-preview__date">
      {{ formattedLastMessageDate }}
    </p>
    <p class="dialog-preview__text">
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
@use "src/assets/scss/mixins" as *;

.dialog-preview {
  padding: 1.25rem 1.25rem 1.25rem 1.5rem;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  align-items: center;
  cursor: pointer;

  &__subject {
    @include main-text;
    color: $dialog-subject-color;
    font-weight: 500;
    width: 70%;
  }

  &__date {
    @include date-text;
    color: $date-color;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  &__text {
    @include medium-text;
    color: $preview-message-color;
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
    background-color: $main-background-color;
    border-left: 2px solid $primary-color;
    padding-left: calc(1.5rem - 2px);
    > .dialog-preview__date {
      color: $preview-message-color;
    }
  }
}
</style>
