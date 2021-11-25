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
      @click.native="openDialog(dialog.id)"
      class="dialogs-list__item"
    />
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import MessagePreview from "@/components/messenger/DialogPreview";
import MessageCounter from "@/components/messenger/MessageCounter";
import { GET_DIALOG_LIST } from "@/store/actions";

export default {
  name: "DialogList",
  computed: {
    ...mapGetters("messenger", ["dialogList", "activeDialogId"]),
  },
  methods: {
    ...mapActions("messenger", [GET_DIALOG_LIST]),
    openDialog(id) {
      this.$router.push("/" + id);
    },
  },
  async mounted() {
    await this[GET_DIALOG_LIST]();
  },
  components: {
    "message-preview": MessagePreview,
    "message-counter": MessageCounter,
  },
};
</script>

<style scoped lang="scss">
@use "src/assets/scss/variables" as *;
.dialogs-list {
  background-color: $dialog-list-background;
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
