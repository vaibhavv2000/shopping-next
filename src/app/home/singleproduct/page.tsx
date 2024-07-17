import {Metadata} from 'next';
import SingleProduct from './SingleProduct';

export const metadata: Metadata = {
 title: "Product"
};

interface props {
 searchParams: {
  id: string;
 };
};

const Page = ({searchParams}:props) => <SingleProduct id={searchParams.id} />;

export default Page;