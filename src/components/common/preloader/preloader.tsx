import React from "react";
import loadImg from '../../../assets/images/813.gif';

type Props = {

}
const Preloader = (props: Props)=>{
return <div style={{position:'absolute', left: '50%', top: '50%'}}>
        <img src={loadImg}/>
        </div>
};

export default Preloader;