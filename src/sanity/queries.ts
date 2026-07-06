export const homepageQuery = `*[_type == "landing"][0]{
  hero {
    eyebrow,
    headline,
    subtitle,
    primaryCta,
    riskReversals,
    "muxPlaybackId": muxVideo.asset->playbackId,
    "muxThumbTime": muxVideo.asset->thumbTime
  },
  adventures {
    eyebrow,
    heading,
    subtitle,
    viewAllCard {
      title,
      subtitle,
      ctaText,
      image
    }
  },
  mission {
    eyebrow,
    heading,
    bodyText,
    imageGallery,
    badges,
    riskReversals
  },
  categories[]-> {
    eyebrow,
    title,
    description,
    ctaText,
    image,
    imageCaption,
    modules[] {
      number,
      label
    }
  },
  engine {
    builderEyebrow,
    builderHeadline,
    builderSubtitle,
    eyebrow,
    headline,
    description,
    ctaText,
    swaps[] {
      from,
      to
    },
    validationMessage,
    pricingNote
  },
  footer {
    copyright,
    columns[] {
      heading,
      links[] {
        label,
        href
      }
    }
  },
  featuredActivities[]-> {
    _id,
    title,
    slug,
    eyebrow,
    subtitle,
    duration,
    description,
    adventureLevel,
    levelLabel,
    ctaText,
    image,
    pricing,
    "region": region->name
  },
  "itinerariesPage": *[_type == "page" && slug.current == "itineraries"][0] {
    eyebrow,
    title,
    subtitle,
    seoDescription,
    ctaText,
    image,
    _updatedAt
  },
  featuredItineraries[]-> {
    _id,
    title,
    slug,
    eyebrow,
    subtitle,
    image,
    pricing,
    activities[]-> {
      image
    }
  },
  popup {
    enabled,
    eyebrow,
    heading,
    description,
    inputPlaceholder,
    ctaText,
    successMessage,
    delaySeconds,
    countdownDays
  }
}`;
