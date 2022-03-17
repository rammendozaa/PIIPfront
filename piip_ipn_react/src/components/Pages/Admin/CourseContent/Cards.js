import CardItem from './CardItem'
import './Cards.css'

function Cards({data}) {
    return (
        <div className='cards2'>
            <ul className='cards2__items'>
                {
                    data.map(current => 
                        <CardItem 
                        src={current.src}
                        text = {current.text}
                        label= {current.label}
                        path= {current.path}
                        />
                    )
                }
            </ul>
        </div>
    )
}

export default Cards