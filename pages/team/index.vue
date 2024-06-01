<template>
  <v-container>
    <v-row>
      <v-col cols="12" class="text-center text-h3 pb-16 poppins">
        {{ $t("pages.team.title") }}
      </v-col>

      <v-col cols="12" v-for="(category, i) in categories" :key="i">
        <v-row>
          <v-col cols="12" class="text-left text-h4 poppins">
            {{ category.name }}
          </v-col>

          <v-cols cols="12" sm="6" md="4" v-for="(member, i) in category.members" :key="i">
          </v-cols>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { ref, Ref } from "vue";
import { TeamMember, TeamCategory } from "~/composables/types";

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
</script>
