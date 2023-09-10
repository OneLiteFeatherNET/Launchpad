<template>
  <v-menu class="ml-10">
    <template #activator="{ props }">
      <slot :props="props">
        <v-btn variant="tonal" v-bind="props">
          <v-icon icon="mdi-human-greeting" class="mr-2" />
          {{ $t("layout.navigation.item.join") }}
        </v-btn>
      </slot>
    </template>

    <v-list>
      <v-list-item
        prepend-icon="mdi-monitor"
        @click="copyAddress('OneLiteFeather.net')"
      >
        <v-list-item-title> Java</v-list-item-title>
      </v-list-item>

      <v-list-item
        prepend-icon="mdi-cellphone"
        @click="copyAddress('OneLiteFeather.com')"
      >
        <v-list-item-title> Bedrock</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script setup lang="ts">
import { useClipboard } from "#imports";
import { useEmitter } from "~/store/emitter";

const emitter = useEmitter();

const copyAddress = async (address: string) => {
  // access the clipboard
  const { copy } = useClipboard();
  await copy(address);

  emitter.emit({
    content: "layout.navigation.copy",
    type: "success",
  });
};
</script>
