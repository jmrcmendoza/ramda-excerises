import {
  listVendors,
  insertVendor,
  updateVendor,
} from '../../use-cases/vendors/index';

import clistVendors from './list_vendors';
import cinsertVendor from './add_vendor';
import cUpdateVendor from './edit_vendor';

const getVendors = clistVendors({ listVendors });
const postVendor = cinsertVendor({ insertVendor });
const putVendor = cUpdateVendor({ updateVendor });

export { getVendors, postVendor, putVendor };
