import { listMembers } from '../../use-cases/members';

import listMembersController from './list-members';

export const getMembers = listMembersController({ listMembers });
