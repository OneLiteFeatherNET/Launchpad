<script setup lang="ts">

const { data: home } = await useAsyncData(() => queryCollection('content').path('/').first())
const { t } = useI18n();

useSeoMeta({
  title: home.value?.title,
  description: home.value?.description
})
useSchemaOrg([
  defineOrganization({
    name: 'OneLiteFeather',
    logo: '/asserts/logo.svg',
    sameAs: [
      'https://www.facebook.com/onelitefeather.official/',
      'https://www.instagram.com/onelitefeather.official/',
    ]
  }),
  defineBreadcrumb({
    itemListElement: [
      { name: 'Home', item: '/' },
      { name: 'Blog', item: '/blog' },
    ],
  }),
  defineWebSite({
    name: 'OneLiteFeather',
    url: 'https://onelitefeather.net',
    description: t('seo.description'),
  })
])
</script>

<template>
  <Header></Header>
  <main>
    <section class="min-h-64 shadow">
      <div class="grid grid-flow-col grid-cols-2 h-max justify-center w-full mx-auto container">
        <div class="w-full my-auto relative mx-auto row-span-2 col-span-1 text-right justify-items-end">
          <div class="w-full text-right justify-items-end grid">
            <h1 class="dark:hidden text-right w-max my-4 text-transparent bg-clip-text bg-gradient-to-r from-brand-orange from-0% via-brand-pink via-50% via-brand-purple via-75% to-brand-blue to-100%">OneLiteFeather</h1>
            <h1 class="not-dark:hidden text-right w-max my-4 text-transparent bg-clip-text bg-gradient-to-r from-brand-orange from-0% via-brand-pink via-50% via-brand-purple via-75% to-brand-cyan to-100%">OneLiteFeather</h1>
          </div>
          <p class="font-bold">OneLiteFeather ist ein Open Source Netzwerk mit dem Fokus <br>
            Studenten, Auszubildene und Jugendlichen eine Perspektive zu geben.</p>
        </div>
        <div class="w-full relative row-span-2 col-span-2 justify-items-start">
          <div class="h-88 w-88 grid">
            <img src="@/assets/logo.svg" alt="onelitefeather brand logo as a rainbow feather" width="350" height="350" class="col-start-1 row-start-1 relative"/>
          </div>


        </div>
      </div>

    </section>
    <section class="min-h-64">


    </section>
    <section class="min-h-64">


    </section>
    <section class="min-h-64">


    </section>
  </main>
  <Footer></Footer>
</template>
