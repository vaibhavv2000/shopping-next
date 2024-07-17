import {Metadata} from 'next';
import History from './History';

export const metadata: Metadata = {
 title: "Order History"
};

const Page = () => <History />;

export default Page;