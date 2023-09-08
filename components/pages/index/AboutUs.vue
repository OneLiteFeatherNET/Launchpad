<template>
  <v-container style="max-width: 1200px" class="pt-16 mt-16">
    <v-row id="content-cards">
      <v-col cols="12">
        <div id="start-marker" />
        <PagesIndexContentCard
          :image="placeholder"
          id="content-card-1"
          class="float-right"
        >
          {{ $t("pages.index.cards.0") }}
        </PagesIndexContentCard>
      </v-col>

      <v-col cols="12">
        <PagesIndexContentCard
          :image="placeholder"
          id="content-card-2"
          class="float-left"
        >
          {{ $t("pages.index.cards.1") }}
        </PagesIndexContentCard>
      </v-col>

      <v-col cols="12" class="mt-14">
        <PagesIndexContentCard
          :image="placeholder"
          id="content-card-3"
          class="float-right"
        >
          {{ $t("pages.index.cards.2") }}
        </PagesIndexContentCard>

        <div id="end-marker" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import placeholder from "~/assets/images/placeholder.jpg";

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
      document.getElementById("content-card-1"),
      {
        endSocket: "right",
        path: "magnet",
        startSocket: "bottom",
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
      { path: "magnet", startSocket: "bottom", ...settings },
    );
    new LeaderLine(
      document.getElementById("content-card-3"),
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
