<template>
  <v-row>
    <v-col cols="12" class="text-center text-h2 pt-14 pb-10 poppins">
      {{ $t("pages.team.title") }}
    </v-col>
  </v-row>

  <div class="pb-16 pt-8" v-for="(role, i) in roles" :key="i" :style="style(i)">
    <v-container style="max-width: 1300px">
      <v-row cols="12">
        <v-col cols="12" class="text-center text-h3 poppins">
          {{ $t(`pages.team.role.${role}`) }}
        </v-col>

        <v-col class="mt-6 d-flex justify-center align-center" cols="12" sm="6" md="4" v-for="member in membersOfRole(role)"
          :key="member.id">
          <NuxtLink class="member ml-4 mr-4 pt-4" :to="localePath(`/team/${member.username}`)">
            <v-row class="elevation-2 justify-center flex-direction-column">
              <v-img 
                :src="member.profile" />

              <div class="pt-4 pl-4 pr-4 pb-4 text-center bg-accent">
                <div class="poppins text-h5 text-center">{{ member.username }}</div>
                {{ member.role }}
              </div>
            </v-row>
          </NuxtLink>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script setup lang="ts">
import { ref, Ref } from "vue";
import { TeamMember } from "~/composables/types";

const localePath = useLocalePath();

const members = ref([] as TeamMember[]);
const roles = ref(["administrator", "content", "moderator"]);

members.value = [{
  description: "Administrator",
  profile: "https://cdn.discordapp.com/avatars/1234567890/1234567890.png",
  role: "administrator",
  username: "Administrator",
}];

const membersOfRole = computed(() => (role: string) => members.value.filter((member) => member.role === role)) 

const style = computed(
  () => (index: number) =>
    index % 2 === 1 ? { backgroundColor: "rgb(var(--v-theme-primary))" } : {},
);
</script>

<style lang="scss">
.member {
  cursor: pointer;
  max-width: 90vw;
  width: 300px;

  .v-row {
    .v-img {
      width: 300px;
      height: 300px;
      max-height: 90vw;
    }

    >div {
      width: 100%;
    }
  }
}
</style>
