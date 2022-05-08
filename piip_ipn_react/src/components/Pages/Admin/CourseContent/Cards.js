import CardItem from './CardItem'
import './Cards.css'

function Cards({data}) {
    return (
        <div className='cards2'>
            <div className='cards2__container'>
                <div className='cards2__wrapper'>
                    <ul className='cards2__items'>
                        {
                            data.map(current => 
                                <CardItem 
                                src='/images/img-1.svg'
                                text = {current.description}
                                label= {current.title}
                                path= '/algo'
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