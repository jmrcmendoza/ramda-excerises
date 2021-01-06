import { vendors } from '../../models/vendors';

import vendorsQueries from './vendors';

const vendorsDB = vendorsQueries({ vendors });

export default vendorsDB;
