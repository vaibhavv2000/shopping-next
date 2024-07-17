import {Metadata} from 'next';
import Wishlist from './Wishlist';

export const metadata: Metadata = {
 title: "My Wishlist"
};

const Page = () => <Wishlist />;

export default Page;