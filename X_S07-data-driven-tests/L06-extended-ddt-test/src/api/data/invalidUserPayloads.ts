import { prepareUserPayload } from '@_src/api/factories/user-register.factory';

export const invalidUserPayloads = [
  {
    case: 'firstname empty',
    payload: {
      ...prepareUserPayload(),
      firstname: '',
    },
  },
  {
    case: 'email empty',
    payload: {
      ...prepareUserPayload(),
      email: '',
    },
  },
];
