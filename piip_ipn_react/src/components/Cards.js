import CardItem from './CardItem'
import './Cards.css'

function Cards({data}) {
    return (
        <div className='cards'>
            <div className='cards__container'>
                <div className='cards__wrapper'>
                    <ul className='cards__items'>
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
            </div>
        </div>
    )
}

export default Cards