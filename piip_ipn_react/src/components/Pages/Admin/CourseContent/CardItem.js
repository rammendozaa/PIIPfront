import React from 'react'
import { Link } from 'react-router-dom'

function CardItem(props) {
    return (
        <>
            <li className='cards2__item'>
                <Link className='cards2__item__link' to={props.path}>
                    <figure className='cards2__item__pic-wrap' data-category={props.label}>
                        <img src={props.src} alt='travel' className='cards2__item__img'/>
                    </figure>
                    {/*<div className='cards2__item__info'>
                        <h5 className='cards2__item__text'>{props.text}</h5>
                    </div>*/}
                </Link>
            </li>
        </>
    );
}


export default CardItem