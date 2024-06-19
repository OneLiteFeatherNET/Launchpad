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
const { getThumbnail } = useDirectusFiles();

const items = ref([
  {
    classes: ["float-right"],
    image: getThumbnail("2b8dd035-a2ff-4d18-a887-cf6ab9f18ef2", {format: "auto"}),
    start: true,
  },
  {
    classes: ["float-left"],
    image: getThumbnail("45d31e91-69c1-4203-be06-1686e1b63464", {format: "auto"}),
  },
  {
    classes: ["float-right"],
    end: true,
    image: getThumbnail("de1c0905-0522-4f0d-84e7-9e93f8906a52", {format: "auto"}),
  },
]);
const lines = ref([]);

onMounted(() => {
  // only draw the lines, if the client has enough width
  if (!isXs.value) {
    const settings = {
      color: "#E0E0E0",
      dash: true,
      dropShadow: true,
      endPlug: "behind",
    };

    lines.value.push(
      new LeaderLine(
        document.getElementById("start-marker"),
        document.getElementById("content-card-0"),
        {
          startSocket: "bottom",
          endSocket: "right",
          path: "magnet",
          startSocketGravity: [0, -100],
          ...settings,
        },
      ),
    );
    lines.value.push(
      new LeaderLine(
        document.getElementById("content-card-0"),
        document.getElementById("content-card-1"),
        { startSocket: "bottom", ...settings },
      ),
    );
    lines.value.push(
      new LeaderLine(
        document.getElementById("content-card-1"),
        document.getElementById("content-card-2"),
        { startSocket: "bottom", path: "magnet", ...settings },
      ),
    );
    lines.value.push(
      new LeaderLine(
        document.getElementById("content-card-2"),
        document.getElementById("end-marker"),
        { startSocket: "bottom", path: "magnet", ...settings },
      ),
    );
  }
});

onUnmounted(() => {
  lines.value.forEach((line) => line.remove());
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
