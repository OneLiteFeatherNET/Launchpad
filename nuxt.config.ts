// https://nuxt.com/docs/api/configuration/nuxt-config
import { defineOrganization } from 'nuxt-schema-org/schema'

export default defineNuxtConfig({
  // Basic configuration
  appConfig: {
    appId: 'OneLiteFeather'
  },
  compatibilityDate: '2025-05-15',

  // Development tools
  devtools: {
    enabled: true,
    timeline: {
      enabled: true
    }
  },

  // Modules
  modules: [
    '@nuxt/content',
    '@nuxt/eslint',
    '@nuxt/image',
    '@nuxtjs/i18n',
    '@nuxtjs/robots',
    '@nuxtjs/seo',
    '@nuxtjs/sitemap',
    '@nuxtjs/tailwindcss',
    '@vueuse/nuxt',
    'nuxt-gtag',
    'nuxt-og-image',
    'nuxt-posthog',
    'nuxt-schema-org'
  ],

  // Module configurations (alphabetically)
  content: {
    build: {
      markdown: {
        highlight: {
          langs: ['css', 'html', 'java', 'js', 'json', 'md', 'mdc', 'shell', 'ts', 'vue', 'xml', 'yaml'],
          theme: {
            // Default theme (same as single string)
            default: 'github-light',
            // Theme used if `html.dark`
            dark: 'github-dark',
            // Theme used if `html.sepia`
            sepia: 'monokai'
          }
        }
      }
    }
  },
  i18n: {
    baseUrl: 'http://localhost:3000',
    defaultLocale: 'de',
    detectBrowserLanguage: {
      cookieKey: 'i18n_redirected',
      redirectOn: 'root', // recommended
      useCookie: true
    },
    locales: [
      { code: 'de', iso: 'de-DE', name: 'Deutsch', file: 'de.json' },
      { code: 'en', iso: 'en-US', name: 'English', file: 'en.json' }
    ],
    strategy: 'prefix'
  },
  image: {
    dir: 'public',
    // The screen sizes predefined by `@nuxt/image`:
    screens: {
      xs: 320,
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
      xxl: 1536,
      '2xl': 1536
    }
  },
  posthog: {
    clientOptions: {
      person_profiles: 'always'
    },
    host: 'https://eu.i.posthog.com',
    proxy: true,
    publicKey: 'phc_t9nBlYL9LcDj4LDKZfQ97m5nbvFDTugkdQqAAspfdI'
  },
  schemaOrg: {
    identity: defineOrganization({
      // Basic Information
      alternateName: 'OneLiteFeather.net',
      description: 'OneLiteFeather is a Minecraft Network focusing on the development tools with intention to share with other servers. ',
      logo: '/logo.svg',
      name: 'OneLiteFeather Network',
      url: 'http://localhost:3000',

      // Contact Information, if applicable
      email: 'contact@onelitefeather.net',

      // Business Details, if applicable
      foundingDate: '2019-09-01',
      numberOfEmployees: {
        '@type': 'QuantitativeValue',
        'minValue': 1,
        'maxValue': 25
      },
      sameAs: [
        'https://github.com/OneLiteFeatherNET'
      ]
    })
  },
  site: {
    name: 'OneLiteFeather',
    url: 'http://localhost:3000'
  },
  sitemap: {
    autoI18n: true,
    defaults: {
      changefreq: 'weekly',
      lastmod: new Date(),
      priority: 0.8
    },
    // Ensure alternate language versions are properly linked
    i18n: {
      defaultLocale: 'de',
      locales: ['de', 'en']
    },
    // Process content collections to add alternate links based on translationKey
    transformEntries: async (entries) => {
      // Group entries by translationKey
      const entriesByTranslationKey = entries.reduce((acc, entry) => {
        if (entry.translationKey) {
          if (!acc[entry.translationKey]) {
            acc[entry.translationKey] = [];
          }
          acc[entry.translationKey].push(entry);
        }
        return acc;
      }, {});

      // Add alternate links to entries
      return entries.map(entry => {
        if (entry.translationKey && entriesByTranslationKey[entry.translationKey]) {
          entry.alternates = entriesByTranslationKey[entry.translationKey]
            .filter(alt => alt._path !== entry._path)
            .map(alt => ({
              hreflang: alt._locale || 'x-default',
              href: alt._path
            }));
        }
        return entry;
      });
    },
    urls: [],
    xslColumns: [
      { label: 'URL', width: '50%' },
      { label: 'Last Modified', select: 'sitemap:lastmod', width: '25%' },
      { label: 'Language', select: 'sitemap:hreflang', width: '25%' }
    ]
  },

  // Environment-specific configurations
  $production: {
    gtag: {
      config: {
        anonymize_ip: true,
        send_page_view: true
      },
      id: 'AW-16761048144'
    },
    i18n: {
      baseUrl: 'https://blog.onelitefeather.net'
    },
    image: {
      cloudflare: {
        baseUrl: 'https://blog.onelitefeather.net'
      }
    },
    nitro: {
      cloudflare: {
        deployConfig: true,
        nodeCompat: true,
        wrangler: {
          d1_databases: [
            {
              binding: 'DB',
              database_id: 'a92127c1-aaa3-4753-82ba-ea59fa9e7140',
              database_name: 'launchpad'
            }
          ],
          name: 'launchpad',
          vars: {
            "NUXT_IMAGE_PROVIDER": "cloudflare"
          }
        }
      },
      preset: "cloudflare_pages"
    },
    posthog: {
      clientOptions: {
        person_profiles: 'always'
      },
      host: 'https://eu.i.posthog.com',
      proxy: true,
      publicKey: 'phc_t9nBlYL9LcDj4LDKZfQ97m5nbvFDTugkdQqAAspfdI'
    },
    runtimeConfig: {
      public: {
        siteUrl: 'https://blog.onelitefeather.net'
      }
    },
    site: {
      url: 'https://blog.onelitefeather.net'
    }
  },
  $test: {
    gtag: {
      config: {
        anonymize_ip: true,
        send_page_view: true
      },
      id: 'AW-16761048144'
    },
    i18n: {
      baseUrl: 'https://blog.onelitefeather.net'
    },
    image: {
      cloudflare: {
        baseUrl: 'https://blog.onelitefeather.net'
      }
    },
    nitro: {
      cloudflare: {
        deployConfig: true,
        nodeCompat: true,
        wrangler: {
          d1_databases: [
            {
              binding: 'DB',
              database_id: 'a92127c1-aaa3-4753-82ba-ea59fa9e7140',
              database_name: 'launchpad'
            }
          ],
          name: 'launchpad'
        }
      },
      preset: "cloudflare_pages"
    },
    posthog: {
      clientOptions: {
        person_profiles: 'always'
      },
      host: 'https://eu.i.posthog.com',
      proxy: true,
      publicKey: 'phc_t9nBlYL9LcDj4LDKZfQ97m5nbvFDTugkdQqAAspfdI'
    },
    runtimeConfig: {
      public: {
        siteUrl: 'https://blog.onelitefeather.net'
      }
    },
    site: {
      url: 'https://blog.onelitefeather.net'
    }
  },

  // Special configurations
  ogImage: {
    compatibility: {
      runtime: {
        resvg: "wasm"
      }
    }
  }
})
