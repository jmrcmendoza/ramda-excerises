import {
  listVendors,
  insertVendor,
  updateVendor,
  deleteVendor,
} from '../../use-cases/vendors/index';

import clistVendors from './list_vendors';
import cinsertVendor from './add_vendor';
import cUpdateVendor from './edit_vendor';
import cDeleteVendor from './delete_vendor';

const getVendors = clistVendors({ listVendors });
const postVendor = cinsertVendor({ insertVendor });
const putVendor = cUpdateVendor({ updateVendor });
const delVendor = cDeleteVendor({ deleteVendor });

export { getVendors, postVendor, putVendor, delVendor };
