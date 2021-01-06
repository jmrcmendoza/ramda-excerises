import {
  listVendors,
  selectVendor,
  insertVendor,
  updateVendor,
  deleteVendor,
} from '../../use-cases/vendors/index';

import clistVendors from './list_vendors';
import cSelectVendor from './select_vendor';
import cinsertVendor from './add_vendor';
import cUpdateVendor from './edit_vendor';
import cDeleteVendor from './delete_vendor';

const getVendors = clistVendors({ listVendors });
const getOneVendor = cSelectVendor({ selectVendor });
const postVendor = cinsertVendor({ insertVendor });
const putVendor = cUpdateVendor({ updateVendor });
const delVendor = cDeleteVendor({ deleteVendor });

export { getVendors, getOneVendor, postVendor, putVendor, delVendor };
