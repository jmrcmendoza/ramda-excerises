import makeListVendors from './list_vendors';
import { vendor } from '../../data-access/models/vendors';

const listVendors = makeListVendors({ vendor });

export default listVendors;
