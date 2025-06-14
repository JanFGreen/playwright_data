import { prepareUserPayload } from '@_src/api/factories/user-register.factory';
import { UserRegisterPayload } from '@_src/api/models/user.api.model';

interface InvalidUserPayload {
  case: string;
  payload: UserRegisterPayload;
}

export function invalidUserPayloadsGenerator(): InvalidUserPayload[] {
  const invalidUserPayloads: InvalidUserPayload[] = [];
  const userPayload = prepareUserPayload();

  Object.keys(userPayload).forEach((key) => {
    const casePayload = {
      ...prepareUserPayload(),
      [key]: '',
    };
    invalidUserPayloads.push({
      case: `${key} empty`,
      payload: casePayload,
    });
  });

  return invalidUserPayloads;
}

export const invalidUserPayloads: InvalidUserPayload[] = [
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
