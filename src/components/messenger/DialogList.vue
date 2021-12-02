<template>
  <div class="dialogs-list">
    <message-counter />
    <message-preview
      v-for="dialog in dialogList"
      :key="dialog.id"
      :subject="dialog.subject"
      :last-message-date="dialog.lastMessage.created"
      :last-message-text="dialog.lastMessage.text"
      :active="String(dialog.id) === String(activeDialogId)"
      class="dialogs-list__item"
      @click.native="openDialog(dialog.id)"
    />
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { GET_DIALOG_LIST } from "@/store/actions";

import MessagePreview from "@/components/messenger/DialogPreview";
import MessageCounter from "@/components/messenger/MessageCounter";

export default {
  name: "DialogList",
  components: {
    "message-preview": MessagePreview,
    "message-counter": MessageCounter,
  },
  computed: {
    ...mapGetters("messenger", ["dialogList", "activeDialogId"]),
  },
  async mounted() {
    await this[GET_DIALOG_LIST]();
  },
  methods: {
    ...mapActions("messenger", [GET_DIALOG_LIST]),
    openDialog(id) {
      if (String(id) !== this.activeDialogId) this.$router.push("/" + id);
    },
  },
};
</script>

<style scoped lang="scss">
@use "src/assets/scss/variables" as *;

.dialogs-list {
  background-color: $dialog-list-background-color;
  width: 40%;
  height: 100%;
  overflow: auto;

  &__item {
    border-top: 1px solid $border-color;

    &:last-of-type {
      border-bottom: 1px solid $border-color;
    }
  }
}
</style>
