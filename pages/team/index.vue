<template>
  <v-row>
    <v-col cols="12" class="text-center text-h2 pt-14 pb-10 poppins">
      {{ $t("pages.team.title") }}
    </v-col>
  </v-row>

  <div class="pb-10 pt-8" v-for="(category, i) in categories" :key="i" :style="style(i)">
    <v-container style="max-width: 1300px">
      <v-row cols="12">
        <v-col cols="12" class="text-left text-h3 poppins">
          {{ category.name }}
        </v-col>

        <v-col class="d-flex justify-center align-center" cols="12" sm="6" md="4" v-for="(member, i) in category.members"
          :key="i" @click="router.push(localePath(`/team/${i}`))">
          <v-row class="member justify-center flex-direction-column">
            <!-- TODO: REPLACE ME -->
            <img
              src="https://kagi.com/proxy/6l3com.png?c=kPRFzVRYJ3F-DHkv6vwSytzNKq9h6QGBKl1ypujiLd9Je-4aRF9TpqbxFpEQ6u13" />

            <div class="mt-4 text-center">
              <div class="poppins text-h5 text-center">{{ member.name }}</div>
              {{ member.position }}
            </div>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script setup lang="ts">
import { ref, Ref } from "vue";
import { TeamMember, TeamCategory } from "~/composables/types";

const router = useRouter();
const localePath = useLocalePath();
const { t } = useI18n();
const categories: Ref<TeamCategory[]> = ref([]);

onMounted(() => {
  // parse all the members out of the locale
  let index = 0;
  const members: TeamMember[] = [];

  while (true) {
    const member = `pages.team.members.${index}`;
    if (t(`${member}.name`) === `${member}.name`) break;

    members.push({
      name: t(`${member}.name`),
      category: t(`${member}.category`),
      position: t(`${member}.position`),
    });

    index++;
  }

  // group them by category
  categories.value = Object.values(
    members.reduce((acc: { [key: string]: TeamCategory }, member) => {
      const key = member.category;
      if (!acc[key]) {
        acc[key] = { name: key, members: [] };
      }
      acc[key].members.push(member);
      return acc;
    }, {}),
  );
});

const style = computed(
  () => (index: number) =>
    index % 2 === 1 ? { backgroundColor: "rgb(var(--v-theme-primary))" } : {},
);
</script>

<style lang="scss" scoped>
.member {
  cursor: pointer;
  max-width: 90vw;
  width: 300px;

  img {
    width: 300px;
    height: 300px;
    max-height: 90vw;
  }

  >div {
    width: 100%;
  }
}
</style>
