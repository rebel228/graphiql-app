import { http, HttpResponse, delay } from 'msw';
import { schema } from '../../objects/graphql/schema';

export const getSchemaSlowly = http.post('https://slow.response/', async () => {
  await delay(200);
  return HttpResponse.json({ data: schema });
});
