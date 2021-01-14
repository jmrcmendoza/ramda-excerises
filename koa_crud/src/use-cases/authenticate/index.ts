import makeAuthenticateMember from './authenticate';

import membersDB from '../../data-access/members';

export const authenticateMember = makeAuthenticateMember(membersDB);
