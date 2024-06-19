<template>
  <v-footer color="footer" class="pt-12 pb-4">
    <v-row>
      <v-container>
        <v-row>
          <v-col cols="12" md="5" sm="5">
            OneLiteFeather.net &copy; {{ new Date().getFullYear() }}

            <p class="mt-4">
              {{ $t("layout.footer.association") }}
            </p>
          </v-col>

          <v-col cols="12" md="2" sm="2" />

          <v-col class="text-center poppins" cols="12" md="5" sm="5">
            {{ $t("layout.footer.legal.title") }}
            <v-row class="mt-2">
              <v-col cols="12" md="6" sm="6">
                <v-btn
                  width="100%"
                  style="border-radius: 8px"
                  variant="elevated"
                  class="rounded-sm"
                  color="surface"
                  nuxt 
                  to="/impressum"
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
                  nuxt 
                  to="/datenschutz"
                >
                  {{ $t("layout.footer.legal.privacy") }}
                </v-btn>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-container>

      <v-col cols="12">
        <v-divider />

        <v-container class="text-grey-darken-3">
          Made by
          <a href="https://github.com/randoooom" target="_blank"> Random </a>
        </v-container>
      </v-col>
    </v-row>
  </v-footer>
</template>
