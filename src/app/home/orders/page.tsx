import {Metadata} from 'next';
import Orders from './Orders';

export const metadata: Metadata = {
 title: "My Orders"
};

const Page = () => <Orders />;

export default Page;