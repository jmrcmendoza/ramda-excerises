import makeListMembers from './list-members';

import membersDB from '../../data-access/members';

export const listMembers = makeListMembers(membersDB);
