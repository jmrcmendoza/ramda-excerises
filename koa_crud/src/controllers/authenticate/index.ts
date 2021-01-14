import { authenticateMember } from '../../use-cases/authenticate';

import authenticateMemberController from './authenticate';

export const authMember = authenticateMemberController({ authenticateMember });
