import {Metadata} from 'next';
import ProductsPage from './Products';

export const metadata: Metadata = {
 title: "Products"
};

interface props {
 searchParams: {
  type: string;
 };
};

const Page = ({searchParams}:props) => <ProductsPage type={searchParams.type} />;

export default Page;