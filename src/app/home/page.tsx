import {Metadata} from 'next';
import Home from './Home';

export const metadata: Metadata = {
 title: "Home",
 description: ""
};

const Page = () => <Home />;

export default Page;