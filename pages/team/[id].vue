<template>
  <div>
    {{ member }}
  </div>
</template>

<script setup lang="ts">
import { TeamMember } from "~/composables/types";

const { t } = useI18n();
const route = useRoute();
const member: Ref<TeamMember> = ref(undefined as TeamMember | undefined);

onMounted(() => {
  const prefix = `pages.team.members.${route.params.id}`;
  if (t(`${prefix}.name`) !== `${prefix}.name`) {
    member.value = {
      name: t(`${prefix}.name`),
      category: t(`${prefix}.category`),
      position: t(`${prefix}.position`),
    };
  }
});
</script>
