import type {Metadata} from 'next';
import Main from './components/Main';

export const metadata: Metadata = {
 title: "Welcome",
 description: 'Shop at best Prices'
};

const Page = () => <Main />;

export default Page;