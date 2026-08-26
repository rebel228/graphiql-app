import { http, HttpResponse } from 'msw';
import { schema } from '../../objects/graphql/schema';

export const checkEndpointSuccess = http.post(
  'https://graphql-pokemon2.vercel.app/',
  () => {
    return HttpResponse.json({ data: schema });
  }
);
