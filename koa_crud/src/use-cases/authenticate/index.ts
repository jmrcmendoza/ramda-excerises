import membersDB from '@DataAccess/members';

import makeAuthenticateMember from './authenticate';

export const authenticateMember = makeAuthenticateMember(membersDB);
