import { listVendors, insertVendor } from '../../use-cases/vendors/index';

import clistVendors from './list_vendors';
import cinsertVendor from './add_vendor';

const getVendors = clistVendors({ listVendors });
const postVendor = cinsertVendor({ insertVendor });

export { getVendors, postVendor };
