import { docsRoute } from 'next-rest-framework';

export const runtime = 'edge';

export const { GET } = docsRoute({
  openApiJsonPath: '/openapi.json',
});
