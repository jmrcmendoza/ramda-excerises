import listVendors from '../../use-cases/vendors/index';

import clistVendors from './list_vendors';

const getVendors = clistVendors({ listVendors });

export { getVendors };
