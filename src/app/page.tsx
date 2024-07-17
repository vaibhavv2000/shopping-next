import {Metadata} from 'next';
import Intro from './Main';

export const metadata: Metadata = {
 title: "Welcome"
};

const Page = () => <Intro />;

export default Page;