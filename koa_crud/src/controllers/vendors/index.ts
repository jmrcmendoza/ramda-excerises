import {
  listVendors,
  selectVendor,
  insertVendor,
  updateVendor,
  deleteVendor,
} from '../../use-cases/vendors/index';

import listVendorsController from './list-vendors';
import selectVendorController from './select-vendor';
import insertVendorController from './add-vendor';
import updateVendorController from './edit-vendor';
import deleteVendorController from './delete-vendor';

const getVendors = listVendorsController({ listVendors });
const getOneVendor = selectVendorController({ selectVendor });
const postVendor = insertVendorController({ insertVendor });
const putVendor = updateVendorController({ updateVendor });
const delVendor = deleteVendorController({ deleteVendor });

export { getVendors, getOneVendor, postVendor, putVendor, delVendor };
