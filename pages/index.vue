<template>
  <PagesIndexCarousel />

  <v-container style="max-width: 1200px" class="mt-16">
    <!-- TODO WIP: adjust graph-lines -->
    <v-row id="content-cards">
      <v-col cols="12">
        <div id="start-marker" />
        <PagesIndexContentCard
          image="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.YxzI-y8ycOFwUfiUC4B0tAHaLH%26pid%3DApi&f=1&ipt=fa1beacd267bc4b92bcd6d050d873dd9aa6d71fdf4f6d50ee1e462eab340ef57&ipo=images"
          id="content-card-1"
          class="float-right"
        >
          {{ $t("pages.index.cards.1") }}
        </PagesIndexContentCard>
      </v-col>

      <v-col cols="12">
        <PagesIndexContentCard
          image="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.YxzI-y8ycOFwUfiUC4B0tAHaLH%26pid%3DApi&f=1&ipt=fa1beacd267bc4b92bcd6d050d873dd9aa6d71fdf4f6d50ee1e462eab340ef57&ipo=images"
          id="content-card-2"
          class="float-left"
        >
          {{ $t("pages.index.cards.2") }}
        </PagesIndexContentCard>
      </v-col>

      <v-col cols="12" class="mt-14">
        <PagesIndexContentCard
          image="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.YxzI-y8ycOFwUfiUC4B0tAHaLH%26pid%3DApi&f=1&ipt=fa1beacd267bc4b92bcd6d050d873dd9aa6d71fdf4f6d50ee1e462eab340ef57&ipo=images"
          id="content-card-3"
          class="float-right"
        >
          {{ $t("pages.index.cards.3") }}
        </PagesIndexContentCard>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
onMounted(() => {
  const settings = {
    dash: true,
    dropShadow: true,
    endPlug: "behind",
    color: "grey",
  };

  new LeaderLine(
    document.getElementById("start-marker"),
    document.getElementById("content-card-1"),
    {
      startSocket: "bottom",
      endSocket: "top",
      path: "magnet",
      startSocketGravity: [0, -100],
      ...settings,
    },
  );
  new LeaderLine(
    document.getElementById("content-card-1"),
    document.getElementById("content-card-2"),
    { startSocket: "bottom", ...settings },
  );
  new LeaderLine(
    document.getElementById("content-card-2"),
    document.getElementById("content-card-3"),
    { startSocket: "bottom", path: "magnet", ...settings },
  );
});
</script>

<style lang="sass" scoped>
#start-marker
  position: absolute
  left: 0
  top: calc(100vh + 20px)
  height: 1px
  width: 1px
</style>
