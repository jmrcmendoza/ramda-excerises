import makeListVendors from './list_vendors';
import makeInsertVendor from './add_vendor';

import vendorsDB from '../../data-access/vendors';

const listVendors = makeListVendors(vendorsDB);
const insertVendor = makeInsertVendor(vendorsDB);

export { listVendors, insertVendor };
