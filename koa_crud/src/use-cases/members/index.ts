import makeListMembers from './list-members';
import makeSelectMember from './select-vendor';
import makeInsertMember from './add-member';
import makeUpdateMember from './edit-member';

import membersDB from '../../data-access/members';

export const listMembers = makeListMembers(membersDB);
export const selectMember = makeSelectMember(membersDB);
export const insertMember = makeInsertMember(membersDB);
export const updateMember = makeUpdateMember(membersDB);
