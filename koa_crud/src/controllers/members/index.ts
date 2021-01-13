import { listMembers, selectMember } from '../../use-cases/members';

import listMembersController from './list-members';
import selectMemberController from './select-vendor';

export const getMembers = listMembersController({ listMembers });
export const getOneMember = selectMemberController({ selectMember });
