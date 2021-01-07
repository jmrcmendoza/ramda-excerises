import {
  listVendors,
  selectVendor,
  insertVendor,
  updateVendor,
  deleteVendor,
} from '../../use-cases/vendors/index';

import listVendorsController from './list_vendors';
import selectVendorController from './select_vendor';
import insertVendorController from './add_vendor';
import updateVendorController from './edit_vendor';
import deleteVendorController from './delete_vendor';

const getVendors = listVendorsController({ listVendors });
const getOneVendor = selectVendorController({ selectVendor });
const postVendor = insertVendorController({ insertVendor });
const putVendor = updateVendorController({ updateVendor });
const delVendor = deleteVendorController({ deleteVendor });

export { getVendors, getOneVendor, postVendor, putVendor, delVendor };
