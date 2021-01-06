import makeListVendors from './list_vendors';
import makeInsertVendor from './add_vendor';

import { vendor } from '../../data-access/models/vendors';

const listVendors = makeListVendors({ vendor });
const insertVendor = makeInsertVendor({ vendor });

export { listVendors, insertVendor };
