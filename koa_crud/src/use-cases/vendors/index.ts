import makeListVendors from './list_vendors';
import makeInsertVendor from './add_vendor';
import makeUpdateVendor from './edit_vendor';
import makeDeleteVendor from './delete_vendor';

import vendorsDB from '../../data-access/vendors';

const listVendors = makeListVendors(vendorsDB);
const insertVendor = makeInsertVendor(vendorsDB);
const updateVendor = makeUpdateVendor(vendorsDB);
const deleteVendor = makeDeleteVendor(vendorsDB);

export { listVendors, insertVendor, updateVendor, deleteVendor };
