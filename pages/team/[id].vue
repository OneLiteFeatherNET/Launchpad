<template>
  <v-row class="pt-14">
    <v-col class="justify-center d-flex" cols="12">
     <v-avatar size="300">
        <v-img cover :src="member?.profile" />
      </v-avatar> 
    </v-col>

    <v-col cols="12" class="text-center text-h2 pt-4 pb-10 poppins">
      {{ member?.username }}

      <p class="text-h5">
        {{ $t(`pages.team.role.${member?.role}`) }}
      </p>
    </v-col>

    <v-col cols="12" class="pt-14 mt-14 pb-14 bg-primary">
      <v-container>
        <span class="poppins text-h3">
          {{ $t("pages.team.aboutMe") }}
        </span>

        <div class="mt-4" v-html="member?.description" />
      </v-container>
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
import { TeamMember } from "~/composables/types";
const member: Ref<TeamMember | undefined> = ref(undefined as TeamMember | undefined);

member.value = {} as TeamMember;
</script>
