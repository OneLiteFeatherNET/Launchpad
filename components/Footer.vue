<template>
  <v-footer color="footer" class="pt-12 pb-12">
    <v-container>
      <v-row>
        <v-col cols="12" md="5" sm="5">
          &copy; OneLiteFeather.net 2023 - {{ new Date().getFullYear() }}

          <p class="mt-4">
            {{ $t("layout.footer.association") }}
          </p>
        </v-col>

        <v-col cols="12" md="2" sm="2" />

        <v-col class="text-center" cols="12" md="5" sm="5">
          {{ $t("layout.footer.legal.title") }}
          <v-row class="mt-2">
            <v-col cols="12" md="6" sm="6">
              <v-btn
                width="100%"
                style="border-radius: 8px"
                variant="elevated"
                class="rounded-sm"
                color="surface"
              >
                {{ $t("layout.footer.legal.imprint") }}
              </v-btn>
            </v-col>

            <v-col cols="12" md="6" sm="6">
              <v-btn
                width="100%"
                style="border-radius: 8px"
                variant="elevated"
                class="rounded-sm"
                color="surface"
              >
                {{ $t("layout.footer.legal.privacy") }}
              </v-btn>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
  </v-footer>
</template>

<style lang="sass" scoped>
.light-mode
  .v-footer
    background-color: rgb(var(--v-theme-surface))
</style>
<script setup lang="ts"></script>
