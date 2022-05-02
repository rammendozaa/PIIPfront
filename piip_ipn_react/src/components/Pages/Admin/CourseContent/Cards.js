import CardItem from './CardItem'
import './Cards.css'

function Cards({data, execute}) {
    return (
        <div className='cards2'>
            <div className='cards2__container'>
                <div className='cards2__wrapper'>
                    <ul className='cards2__items'>
                        {
                            data.map(current => 
                                <CardItem 
                                src='/images/img-1.svg'
                                text = {current.description || current.question}
                                label= {current.title}
                                topic = {current}
                                thisFunction = {execute}
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