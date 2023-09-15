<template>
  <v-container style="max-width: 1200px" class="pt-16 mt-16">
    <v-row id="content-cards">
      <v-col v-for="(item, i) in items" :key="i" cols="12">
        <div v-if="item.start" id="start-marker" />
        <PagesIndexTimelineCard
          :image="item.image"
          :id="`content-card-${i}`"
          :class="item.classes"
        >
          {{ $t(`pages.index.timeline.${i}`) }}
        </PagesIndexTimelineCard>

        <div v-if="item.end" id="end-marker" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import timeline0 from "~/assets/images/timeline/timeline0.png";
import timeline1 from "assets/images/timeline/timeline1.png";
import timeline2 from "assets/images/timeline/timeline2.png";

const items = ref([
  {
    classes: ["float-right"],
    image: timeline0,
    start: true,
  },
  {
    classes: ["float-left"],
    image: timeline1,
  },
  {
    classes: ["float-right"],
    end: true,
    image: timeline2,
  },
]);

onMounted(() => {
  // only draw the lines, if the client has enough width
  if (!isXs.value) {
    const settings = {
      color: "#E0E0E0",
      dash: true,
      dropShadow: true,
      endPlug: "behind",
    };

    new LeaderLine(
      document.getElementById("start-marker"),
      document.getElementById("content-card-0"),
      {
        endSocket: "right",
        path: "magnet",
        startSocket: "bottom",
        startSocketGravity: [0, -100],
        ...settings,
      },
    );
    new LeaderLine(
      document.getElementById("content-card-0"),
      document.getElementById("content-card-1"),
      { startSocket: "bottom", ...settings },
    );
    new LeaderLine(
      document.getElementById("content-card-1"),
      document.getElementById("content-card-2"),
      { path: "magnet", startSocket: "bottom", ...settings },
    );
    new LeaderLine(
      document.getElementById("content-card-2"),
      document.getElementById("end-marker"),
      { path: "magnet", startSocket: "bottom", ...settings },
    );
  }
});
</script>

<style lang="sass" scoped>
#start-marker
  position: absolute
  left: -5px
  top: calc(100vh + 50px)
  height: 1px
  width: 1px

#end-marker
  height: 1px
  width: 1px
  position: absolute
  right: 0

#content-cards
  @media screen and (max-width: 1400px)
    .v-col
      margin-top: 15px !important

    @media screen and (max-width: 600px)
      justify-content: center
      align-items: center
      margin: 0 !important

      .v-col
        > *
          float: left !important
</style>
