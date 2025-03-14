<template>
  <v-container id="timeline" style="max-width: 1200px" class="pt-16 mt-16">
    <v-row>
      <v-col cols="12" class="text-center text-h3 pb-16 poppins">
        Timeline
      </v-col>
    </v-row>

    <v-timeline align="start" truncate-line="start" :side="!lg ? 'end' : undefined">
      <v-timeline-item v-for="(item, i) in timelineEntries" :key="i" dot-color="secondary" fill-dot size="x-small">
        <template v-if="!isXs" v-slot:opposite>
          <v-row class="mt-5">
            <v-col cols="12" class="text-h3 poppins light:text-black">
              {{ new Date(Date.parse(item.date)).getFullYear() }}
            </v-col>
          </v-row>
        </template>

        <v-row v-if="isXs" class="mt-5">
          <v-col cols="12" class="text-h3 poppins light:text-black">
            {{ new Date(Date.parse(item.date)).getFullYear() }}
          </v-col>
        </v-row>

        <PagesIndexTimelineCard class="mt-5" :image="getThumbnail(item.header, { format: 'auto' })"
          :id="`content-card-${i}`">
          {{ $t(`pages.index.timeline.${i}`) }}
        </PagesIndexTimelineCard>
      </v-timeline-item>
    </v-timeline>

    <v-row>
      <v-col cols="12" class="text-center text-h3 pt-16 poppins">
        <v-btn rounded="xl" elevation="16" size="x-large">More</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
const { getThumbnail } = useDirectusFiles();
const { getItems } = useDirectusItems();

interface TimelineEntry {
  id?: string | number;
  text: string;
  header: string;
  color: string;
  date: string
}

// new Date(time).format("YYYY-MM-DD")
const timelineEntries = await getItems<TimelineEntry>({
  collection: "timeline",
  params: {
    limit: 3,
  }
});
</script>
