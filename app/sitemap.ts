import { MetadataRoute } from "next";
import { supabase } from "@/lib/supabase";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const { data: episodes } = await supabase
        .from("episodes")
        .select("id, publish_date")
        .eq("status", "published");

    return [
        {
            url: "https://the-italians.it",
            lastModified: new Date(),
            changeFrequency: "weekly",
            priority: 1.0,
        },
        {
            url: "https://the-italians.it/chi-siamo",
            lastModified: new Date(),
            changeFrequency: "monthly",
            priority: 0.8,
        },
        {
            url: "https://the-italians.it/storie",
            lastModified: new Date(),
            changeFrequency: "weekly",
            priority: 0.9,
        },
        {
            url: "https://the-italians.it/candidati",
            lastModified: new Date(),
            changeFrequency: "monthly",
            priority: 0.7,
        },
        {
            url: "https://the-italians.it/contatti",
            lastModified: new Date(),
            changeFrequency: "monthly",
            priority: 0.7,
        },
        {
            url: "https://the-italians.it/team",
            changeFrequency: "monthly",
            priority: 0.7,
        },
        {
            url: "https://the-italians.it/termini-condizioni",
            changeFrequency: "yearly",
            priority: 0.3,
        },
        {
            url: "https://the-italians.it/privacy-policy",
            changeFrequency: "yearly",
            priority: 0.3,
        },
        {
            url: "https://the-italians.it/cookie-policy",
            changeFrequency: "yearly",
            priority: 0.3,
        },
        ...(episodes || []).map((ep) => ({
            url: `https://the-italians.it/storie/${ep.id}`,
            lastModified: new Date(ep.publish_date),
            changeFrequency: "monthly" as const,
            priority: 0.8,
        })),
    ];
}

