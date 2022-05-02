import CardItem from './CardItem'
import './Cards.css'

function Cards({data, route}) {

    return (
        <div className='cards'>
            <div className='cards__container'>
                <div className='cards__wrapper'>
                    <ul className='cards__items'>
                        {
                            data.map(current => 
                                <CardItem 
                                src='images/img-1.svg'
                                text = {current.description}
                                label= {current.title}
                                path={"/topic/" + route + "/" + current.id}
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