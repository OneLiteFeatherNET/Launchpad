<script setup lang="ts">
import { definePageMeta } from "#imports";
import PageContainer from '~/components/common/PageContainer.vue';
import PageHeader from '~/components/common/PageHeader.vue';
import PrivacySection from '~/components/privacy/PrivacySection.vue';
import PrivacySecurityMeasures from '~/components/privacy/PrivacySecurityMeasures.vue';
import PrivacyDataTransfer from '~/components/privacy/PrivacyDataTransfer.vue';
import PrivacyInternationalDataTransfers from '~/components/privacy/PrivacyInternationalDataTransfers.vue';
import PrivacyDataStorage from '~/components/privacy/PrivacyDataStorage.vue';
import PrivacyRights from '~/components/privacy/PrivacyRights.vue';
import PrivacyWebHosting from '~/components/privacy/PrivacyWebHosting.vue';
import PrivacyCookies from '~/components/privacy/PrivacyCookies.vue';
import PrivacyBlogs from '~/components/privacy/PrivacyBlogs.vue';
import PrivacyContact from '~/components/privacy/PrivacyContact.vue';
import PrivacyAnalytics from '~/components/privacy/PrivacyAnalytics.vue';

const { locale, t } = useI18n();

definePageMeta({
  title: 'blog.privacy.title',
});

// Use the SEO composable for meta tags
useCustomSeoMeta({
  title: () => t('blog.privacy.title'),
  description: () => t('blog.privacy.description'),
  path: '/privacy'
});
</script>

<template>
  <PageContainer narrow>
    <PageHeader 
      title="Datenschutzerklärung" 
      metadata="Stand: 31. Mai 2025" 
    />

    <h2 class="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-300">Inhaltsübersicht</h2>
    <ul class="index mb-8 space-y-1">
      <li><a class="index-link text-blue-600 dark:text-blue-400 hover:underline" href="#m3">Verantwortlicher</a></li>
      <li><a class="index-link text-blue-600 dark:text-blue-400 hover:underline" href="#mOverview">Übersicht der Verarbeitungen</a></li>
      <li><a class="index-link text-blue-600 dark:text-blue-400 hover:underline" href="#m2427">Maßgebliche Rechtsgrundlagen</a></li>
      <li><a class="index-link text-blue-600 dark:text-blue-400 hover:underline" href="#m27">Sicherheitsmaßnahmen</a></li>
      <li><a class="index-link text-blue-600 dark:text-blue-400 hover:underline" href="#m25">Übermittlung von personenbezogenen Daten</a></li>
      <li><a class="index-link text-blue-600 dark:text-blue-400 hover:underline" href="#m24">Internationale Datentransfers</a></li>
      <li><a class="index-link text-blue-600 dark:text-blue-400 hover:underline" href="#m12">Allgemeine Informationen zur Datenspeicherung und Löschung</a></li>
      <li><a class="index-link text-blue-600 dark:text-blue-400 hover:underline" href="#m10">Rechte der betroffenen Personen</a></li>
      <li><a class="index-link text-blue-600 dark:text-blue-400 hover:underline" href="#m225">Bereitstellung des Onlineangebots und Webhosting</a></li>
      <li><a class="index-link text-blue-600 dark:text-blue-400 hover:underline" href="#m134">Einsatz von Cookies</a></li>
      <li><a class="index-link text-blue-600 dark:text-blue-400 hover:underline" href="#m104">Blogs und Publikationsmedien</a></li>
      <li><a class="index-link text-blue-600 dark:text-blue-400 hover:underline" href="#m182">Kontakt- und Anfrageverwaltung</a></li>
      <li><a class="index-link text-blue-600 dark:text-blue-400 hover:underline" href="#m263">Webanalyse, Monitoring und Optimierung</a></li>
    </ul>

    <PrivacySection id="m3" title="Verantwortlicher">
      <p class="mb-3 leading-relaxed">
        Phillipp Glanz<br>
        Geisinger Straße, 6<br>
        71634, Ludwigsburg, Deutschland
      </p>
      <p class="mb-3 leading-relaxed">
        E-Mail-Adresse: <a href="mailto:contact@onelitefeather.net" class="text-blue-600 dark:text-blue-400 hover:underline">contact@onelitefeather.net</a>
      </p>
    </PrivacySection>

    <PrivacySection id="mOverview" title="Übersicht der Verarbeitungen">
      <p class="mb-4 leading-relaxed">Die nachfolgende Übersicht fasst die Arten der verarbeiteten Daten und die Zwecke ihrer Verarbeitung zusammen und verweist auf die betroffenen Personen.</p>

      <h3 class="text-lg font-medium mb-2 text-gray-700 dark:text-gray-400">Arten der verarbeiteten Daten</h3>
      <ul class="list-disc pl-5 mb-4 space-y-1">
        <li>Bestandsdaten.</li>
        <li>Kontaktdaten.</li>
        <li>Inhaltsdaten.</li>
        <li>Nutzungsdaten.</li>
        <li>Meta-, Kommunikations- und Verfahrensdaten.</li>
        <li>Protokolldaten.</li>
      </ul>

      <h3 class="text-lg font-medium mb-2 text-gray-700 dark:text-gray-400">Kategorien betroffener Personen</h3>
      <ul class="list-disc pl-5 mb-4 space-y-1">
        <li>Kommunikationspartner.</li>
        <li>Nutzer.</li>
      </ul>

      <h3 class="text-lg font-medium mb-2 text-gray-700 dark:text-gray-400">Zwecke der Verarbeitung</h3>
      <ul class="list-disc pl-5 mb-4 space-y-1">
        <li>Kommunikation.</li>
        <li>Sicherheitsmaßnahmen.</li>
        <li>Reichweitenmessung.</li>
        <li>Organisations- und Verwaltungsverfahren.</li>
        <li>Feedback.</li>
        <li>Profile mit nutzerbezogenen Informationen.</li>
        <li>Bereitstellung unseres Onlineangebotes und Nutzerfreundlichkeit.</li>
        <li>Informationstechnische Infrastruktur.</li>
      </ul>
    </PrivacySection>
    <PrivacySection id="m2427" title="Maßgebliche Rechtsgrundlagen">
      <p class="mb-4 leading-relaxed"><strong class="font-medium">Maßgebliche Rechtsgrundlagen nach der DSGVO: </strong>Im Folgenden erhalten Sie eine Übersicht der Rechtsgrundlagen der DSGVO, auf deren Basis wir personenbezogene Daten verarbeiten. Bitte nehmen Sie zur Kenntnis, dass neben den Regelungen der DSGVO nationale Datenschutzvorgaben in Ihrem bzw. unserem Wohn- oder Sitzland gelten können. Sollten ferner im Einzelfall speziellere Rechtsgrundlagen maßgeblich sein, teilen wir Ihnen diese in der Datenschutzerklärung mit.</p>

      <ul class="mb-4 space-y-3">
        <li><strong class="font-medium">Einwilligung (Art. 6 Abs. 1 S. 1 lit. a) DSGVO)</strong> - Die betroffene Person hat ihre Einwilligung in die Verarbeitung der sie betreffenden personenbezogenen Daten für einen spezifischen Zweck oder mehrere bestimmte Zwecke gegeben.</li>
        <li><strong class="font-medium">Vertragserfüllung und vorvertragliche Anfragen (Art. 6 Abs. 1 S. 1 lit. b) DSGVO)</strong> - Die Verarbeitung ist für die Erfüllung eines Vertrags, dessen Vertragspartei die betroffene Person ist, oder zur Durchführung vorvertraglicher Maßnahmen erforderlich, die auf Anfrage der betroffenen Person erfolgen.</li>
        <li><strong class="font-medium">Berechtigte Interessen (Art. 6 Abs. 1 S. 1 lit. f) DSGVO)</strong> - die Verarbeitung ist zur Wahrung der berechtigten Interessen des Verantwortlichen oder eines Dritten notwendig, vorausgesetzt, dass die Interessen, Grundrechte und Grundfreiheiten der betroffenen Person, die den Schutz personenbezogener Daten verlangen, nicht überwiegen.</li>
      </ul>

      <p class="mb-4 leading-relaxed"><strong class="font-medium">Nationale Datenschutzregelungen in Deutschland: </strong>Zusätzlich zu den Datenschutzregelungen der DSGVO gelten nationale Regelungen zum Datenschutz in Deutschland. Hierzu gehört insbesondere das Gesetz zum Schutz vor Missbrauch personenbezogener Daten bei der Datenverarbeitung (Bundesdatenschutzgesetz – BDSG). Das BDSG enthält insbesondere Spezialregelungen zum Recht auf Auskunft, zum Recht auf Löschung, zum Widerspruchsrecht, zur Verarbeitung besonderer Kategorien personenbezogener Daten, zur Verarbeitung für andere Zwecke und zur Übermittlung sowie automatisierten Entscheidungsfindung im Einzelfall einschließlich Profiling. Ferner können Landesdatenschutzgesetze der einzelnen Bundesländer zur Anwendung gelangen.</p>

      <p class="mb-4 leading-relaxed"><strong class="font-medium">Hinweis auf Geltung DSGVO und Schweizer DSG: </strong>Diese Datenschutzhinweise dienen sowohl der Informationserteilung nach dem Schweizer DSG als auch nach der Datenschutzgrundverordnung (DSGVO). Aus diesem Grund bitten wir Sie zu beachten, dass aufgrund der breiteren räumlichen Anwendung und Verständlichkeit die Begriffe der DSGVO verwendet werden. Insbesondere statt der im Schweizer DSG verwendeten Begriffe „Bearbeitung" von „Personendaten", "überwiegendes Interesse" und "besonders schützenswerte Personendaten" werden die in der DSGVO verwendeten Begriffe „Verarbeitung" von „personenbezogenen Daten" sowie "berechtigtes Interesse" und "besondere Kategorien von Daten" verwendet. Die gesetzliche Bedeutung der Begriffe wird jedoch im Rahmen der Geltung des Schweizer DSG weiterhin nach dem Schweizer DSG bestimmt.</p>
    </PrivacySection>


      <PrivacySecurityMeasures />
      <PrivacyDataTransfer />

      <PrivacyInternationalDataTransfers />

      <PrivacyDataStorage />

      <PrivacyRights />

      <PrivacyWebHosting />
      <PrivacyCookies />
      <PrivacyBlogs />

      <PrivacyContact />
      <PrivacyAnalytics />
      <p class="text-sm mt-10 pt-4 border-t border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400">
        <a href="https://datenschutz-generator.de/" title="Rechtstext von Dr. Schwenke - für weitere Informationen bitte anklicken."
           target="_blank" rel="noopener noreferrer nofollow"
           class="text-blue-600 dark:text-blue-400 hover:underline">
          Erstellt mit kostenlosem Datenschutz-Generator.de von Dr. Thomas Schwenke
        </a>
      </p>
  </PageContainer>
</template>

<style scoped>

</style>
