<template>
  <v-row class="pt-14">
    <v-col class="justify-center d-flex" cols="12">
     <v-avatar size="300">
        <v-img cover :src="getThumbnail(member.profile, { format: 'auto' })" />
      </v-avatar> 
    </v-col>

    <v-col cols="12" class="text-center text-h2 pt-4 pb-10 poppins">
      {{ member.username }}

      <p class="text-h5">
        {{ $t(`pages.team.role.${member.role}`) }}
      </p>
    </v-col>

    <v-col cols="12" class="pt-14 mt-14 bg-primary">
      <v-container>
        <div class="text-center"  v-html="member.description" />
      </v-container>
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
import { TeamMember } from "~/composables/types";

const { getItemById } = useDirectusItems();
const { getThumbnail } = useDirectusFiles();
const { t } = useI18n();
const route = useRoute();
const member: Ref<TeamMember | undefined> = ref(undefined as TeamMember | undefined);

member.value = await getItemById<TeamMember>({
  collection: "profiles",
  id: route.params.id as string
});
</script>
