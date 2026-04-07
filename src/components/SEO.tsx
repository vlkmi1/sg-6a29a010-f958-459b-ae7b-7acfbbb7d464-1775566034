import Head from 'next/head';

interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article';
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
  tags?: string[];
}

// SEO elements that can be used in _document.tsx (returns JSX without Head wrapper)
export function SEOElements({
  title = "Hello World",
  description = "Welcome to my app",
  image = "/og-image.png",
  url,
  type = "website",
}: SEOProps) {
  return (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="icon" href="/favicon.ico" />

      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      {image && <meta property="og:image" content={image} />}
      {url && <meta property="og:url" content={url} />}
      <meta property="og:type" content={type} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      {image && <meta name="twitter:image" content={image} />}
    </>
  );
}

// SEO component for use in pages/_app.tsx or individual pages (uses next/head)
// Note: Flattened structure (no fragment) for better Next.js Head compatibility during hot reload
export function SEO({
  title = "Hello World",
  description = "Welcome to my app",
  image = "/og-image.png",
  url,
  type = "website",
  publishedTime,
  modifiedTime,
  author,
  tags = [],
}: SEOProps) {
  const siteUrl = "https://bydlenibezplisne.cz";
  const canonicalUrl = url ? `${siteUrl}${url}` : siteUrl;
  const fullImageUrl = image?.startsWith('http') ? image : `${siteUrl}${image}`;

  // Generate JSON-LD structured data for articles
  const jsonLd = type === 'article' ? {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": title,
    "description": description,
    "image": fullImageUrl,
    "datePublished": publishedTime,
    "dateModified": modifiedTime || publishedTime,
    "author": {
      "@type": "Person",
      "name": author || "Bydlení bez plísně"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Bydlení bez plísně",
      "logo": {
        "@type": "ImageObject",
        "url": `${siteUrl}/og-image.png`
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": canonicalUrl
    }
  } : null;

  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="icon" href="/favicon.ico" />
      <link rel="canonical" href={canonicalUrl} />

      {/* Additional meta tags */}
      <meta name="robots" content="index, follow" />
      <meta name="language" content="Czech" />
      {tags.length > 0 && <meta name="keywords" content={tags.join(", ")} />}

      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={fullImageUrl} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content="Bydlení bez plísně" />
      <meta property="og:locale" content="cs_CZ" />

      {/* Article-specific Open Graph tags */}
      {type === 'article' && publishedTime && (
        <meta property="article:published_time" content={publishedTime} />
      )}
      {type === 'article' && modifiedTime && (
        <meta property="article:modified_time" content={modifiedTime} />
      )}
      {type === 'article' && author && (
        <meta property="article:author" content={author} />
      )}
      {type === 'article' && tags.map((tag) => (
        <meta key={tag} property="article:tag" content={tag} />
      ))}

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullImageUrl} />

      {/* JSON-LD structured data */}
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}
    </Head>
  );
}