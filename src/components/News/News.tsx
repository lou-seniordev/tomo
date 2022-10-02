import style from './News.module.css';
import newsPlug from '../../assets/images/newsPlug.png';

type Props = {

}

const News: React.FC<Props> = (props)=>{
    return(<div className={style.content}>
        <img src={newsPlug} style={{"height": "86vh"}}/>
    </div>);
}
export default News;