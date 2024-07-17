import {Metadata} from 'next';
import Home from './Home';

export const metadata: Metadata = {
 title: "Products"
};

const Page = () => <Home />;

export default Page;