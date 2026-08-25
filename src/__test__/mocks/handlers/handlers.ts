import { lookupSuccess } from './firebase/lookupSuccess';
import { signInWithPasswordSuccess } from './firebase/signInWithPasswordSuccess';
import { signUpSuccess } from './firebase/signUpSuccess';
import { updateSuccess } from './firebase/updateSuccess';
import { checkEndpointSuccess } from './graphql/checkEndpointSuccess';
import { getSchemaError } from './graphql/getSchemaError';
import { getSchemaSuccess } from './graphql/getSchemaSuccess';

export const handlers = [
  getSchemaSuccess,
  getSchemaError,
  lookupSuccess,
  signInWithPasswordSuccess,
  signUpSuccess,
  updateSuccess,
  checkEndpointSuccess,
];
