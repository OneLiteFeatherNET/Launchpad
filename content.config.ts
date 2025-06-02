import { defineContentConfig, defineCollection, z } from '@nuxt/content'
import { asSchemaOrgCollection } from 'nuxt-schema-org/content'
import { asSitemapCollection } from '@nuxtjs/sitemap/content'


// Unified schema for both team members and standalone authors
const personSchema = z.object({
    name: z.string(),
    slug: z.string(),
    minecraftUsername: z.string().optional(),
    profileImage: z.string().optional(),
    role: z.string().optional(),
    about: z.string().optional(),
    bio: z.string().optional(), // Alias for about, used in team members
    github: z.string().optional(),
    twitter: z.string().optional(),
    title: z.string().optional(),
    avatar: z.string().optional(),
    quote: z.string().optional(), // Used in team members
    joinDate: z.string().optional(), // Used in team members
    onProbation: z.boolean().optional(), // Used in team members
});

// Use the unified personSchema for authors
const authorSchema = personSchema;

const projectSchema = z.object({
    name: z.string(),
    slug: z.string(),
    description: z.string(),
    status: z.string(),
    featured: z.boolean().optional(),
    image: z.string().optional(),
    github: z.string().optional(),
    authors: z.array(authorSchema).optional(),
    features: z.array(z.string()).optional(),
    roadmap: z.array(z.object({
        title: z.string(),
        description: z.string(),
        status: z.string()
    })).optional(),
    bstats: z.object({
        pluginId: z.string(),
        showServers: z.boolean().optional(),
        showPlayers: z.boolean().optional()
    }).optional()
});

const carouselSchema = z.object({
    slides: z.array(z.object({
        title: z.string(),
        subtitle: z.string(),
        image: z.string()
    }))
});

const historySchema = z.object({
    title: z.string(),
    timeline: z.array(z.object({
        year: z.string(),
        color: z.string(),
        description: z.string()
    }))
});

const activitiesSchema = z.object({
    title: z.string(),
    activities: z.array(z.object({
        title: z.string(),
        description: z.string(),
        image: z.string(),
        color: z.string()
    }))
});

const teamSchema = z.object({
    title: z.string(),
    description: z.string().optional(),
    ranks: z.array(z.object({
        name: z.string(),
        description: z.string().optional(),
        members: z.array(personSchema) // Use the unified personSchema for team members
    })),
    rankExplanations: z.array(z.object({
        rank: z.string(),
        description: z.string()
    })).optional()
});

const blogSchema = z.object({
    title: z.string(),
    alternativeTitle: z.string().optional(),
    description: z.string(),
    slug: z.string(),
    // Transform string to Date object
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    headerImage: z.string().optional(),
    headerImageAlt: z.string().optional(),
    // Link to the same article in other languages
    translationKey: z.string().optional(),
    excerpt: z.object({
        type: z.string(),
        children: z.any(),
    }),
});


export default defineContentConfig({
    collections: {
        carousel_de: defineCollection({
            type: 'data',
            source: 'homepage/de/carousel.json',
            schema: carouselSchema
        }),
        carousel_en: defineCollection({
            type: 'data',
            source: 'homepage/en/carousel.json',
            schema: carouselSchema
        }),
        history_de: defineCollection({
            type: 'data',
            source: 'homepage/de/history.json',
            schema: historySchema
        }),
        history_en: defineCollection({
            type: 'data',
            source: 'homepage/en/history.json',
            schema: historySchema
        }),
        activities_de: defineCollection({
            type: 'data',
            source: 'homepage/de/activities.json',
            schema: activitiesSchema
        }),
        activities_en: defineCollection({
            type: 'data',
            source: 'homepage/en/activities.json',
            schema: activitiesSchema
        }),
        team_de: defineCollection({
            type: 'data',
            source: 'team/de/**/*.json',
            schema: teamSchema
        }),
        team_en: defineCollection({
            type: 'data',
            source: 'team/en/**/*.json',
            schema: teamSchema
        }),
        blog_de: defineCollection(asSitemapCollection(asSchemaOrgCollection({
            type: 'page',
            source: 'blog/de/**/*.md',
            schema: blogSchema
        }))),
        blog_en: defineCollection(asSitemapCollection(asSchemaOrgCollection({
            type: 'page',
            source: 'blog/en/**/*.md',
            schema: blogSchema
        }))),
        projects_de: defineCollection({
            type: 'data',
            source: 'projects/de/**/*.json',
            schema: z.object({
                projects: z.array(projectSchema)
            })
        }),
        projects_en: defineCollection({
            type: 'data',
            source: 'projects/en/**/*.json',
            schema: z.object({
                projects: z.array(projectSchema)
            })
        }),
        authors_de: defineCollection({
            type: 'data',
            source: 'authors/de/**/*.json',
            schema: authorSchema
        }),
        authors_en: defineCollection({
            type: 'data',
            source: 'authors/en/**/*.json',
            schema: authorSchema
        })
    }
})
