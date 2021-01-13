import {
  listMembers,
  selectMember,
  insertMember,
} from '../../use-cases/members';

import listMembersController from './list-members';
import selectMemberController from './select-vendor';
import insertMemberController from './add-member';

export const getMembers = listMembersController({ listMembers });
export const getOneMember = selectMemberController({ selectMember });
export const postMember = insertMemberController({ insertMember });
