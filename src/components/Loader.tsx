import type {HTMLAttributes} from "react";

interface props extends HTMLAttributes<HTMLDivElement> {
 color?: string;
 size?: number;
};

const Loader = ({color = "red", size = 32, style, ...other}: props) => {

 return (
  <div className="loader" style={{height: size, width: size, ...style}} {...other}>
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
  </div>
 );
};

export default Loader;