import {HTMLAttributes} from "react";

interface props extends HTMLAttributes<HTMLDivElement> {
 color?: string;
 size?: number;
};

const Loader = (props: props) => {
 const {color = "red", size = 32, style, ...other} = props;

 return (
  <>
   <div className="loader" style={{height: `${size}px`, width: `${size}px`}} {...other} ></div>
   <style jsx>
    {`
      .loader {
       border: 4px solid ${color};
       border-top: 4px solid transparent;
       border-radius: 50%;
       animation: loading 0.8s linear infinite;
      }

      @keyframes loading {
       from {transform: rotate(0deg);}
       to {transform: rotate(360deg);}
      }
    `}
   </style>
  </>
 );
};

export default Loader;