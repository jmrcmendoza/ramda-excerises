import { authenticateMember } from '@UseCases/authenticate';

import authenticateMemberController from './authenticate';

export const authMember = authenticateMemberController({ authenticateMember });
