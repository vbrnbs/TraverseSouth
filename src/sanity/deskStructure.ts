import type { StructureResolver } from 'sanity/structure';

export const deskStructure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      // Landing Page singleton
      S.listItem()
        .title('Landing Page (Main Homepage)')
        .child(
          S.document()
            .schemaType('landing')
            .documentId('landing')
            .title('Landing Page Sections')
        ),
      
      // Subpages menu containing both general pages and Corporate Page
      S.listItem()
        .title('Subpages (/itineraries, /about, /corporate, etc.)')
        .child(
          S.list()
            .title('Subpages')
            .items([
              S.listItem()
                .title('General Pages (/itineraries, /about, /legal, etc.)')
                .child(
                  S.documentList()
                    .title('General Pages')
                    .filter('_type == "page"')
                    .apiVersion('2026-02-01')
                ),
              S.listItem()
                .title('Corporate Workshops Page (/corporate)')
                .child(
                  S.document()
                    .schemaType('corporatePage')
                    .documentId('corporatePage')
                    .title('Corporate Workshops & Team Buildings')
                ),
            ])
        ),
      
      S.divider(),
      
      // Other document types
      S.listItem()
        .title('Destinations')
        .child(S.documentTypeList('destination').title('Destinations')),
      S.listItem()
        .title('Activities')
        .child(S.documentTypeList('activity').title('Activities')),
      S.listItem()
        .title('Operators')
        .child(S.documentTypeList('operator').title('Operators')),
      S.listItem()
        .title('Itineraries')
        .child(S.documentTypeList('itinerary').title('Itineraries')),
    ]);
