import makeListVendors from './list-vendors';
import makeSelectVendor from './select-vendor';
import makeInsertVendor from './add-vendor';
import makeUpdateVendor from './edit-vendor';
import makeDeleteVendor from './delete-vendor';

import vendorsDB from '../../data-access/vendors';

const listVendors = makeListVendors(vendorsDB);
const selectVendor = makeSelectVendor(vendorsDB);
const insertVendor = makeInsertVendor(vendorsDB);
const updateVendor = makeUpdateVendor(vendorsDB);
const deleteVendor = makeDeleteVendor(vendorsDB);

export { listVendors, selectVendor, insertVendor, updateVendor, deleteVendor };
