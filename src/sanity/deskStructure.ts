import type { StructureResolver } from 'sanity/structure';

export const deskStructure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      // Homepage section separating Landing Page singleton from Subpages
      S.listItem()
        .title('Homepage & Pages')
        .child(
          S.list()
            .title('Homepage & Pages')
            .items([
              S.listItem()
                .title('Landing Page (Main Homepage)')
                .child(
                  S.document()
                    .schemaType('landing')
                    .documentId('landing')
                    .title('Landing Page Sections')
                ),
              S.divider(),
              S.listItem()
                .title('Subpages (/itineraries, /about, etc.)')
                .child(
                  S.documentList()
                    .title('Subpages')
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
