import { MouseEventHandler } from 'react'
import { IconContext } from 'react-icons'
import { AiFillCloseCircle } from 'react-icons/Ai'

export interface CartItem {
    stockIndex: number
    cartIndex: number
    manufacturer: string
    model: string
    price: number
    body: string
    wiki: string
    img: string
}

export const CartItem = ({ item, onClick }: { item: CartItem, onClick: MouseEventHandler }) => {
    return <div key={item.cartIndex} className='flex justify-between'>
        {item.manufacturer + ' ' + item.model}
        <div className='rounded-full duration-150 cursor-pointer' onClick={onClick}>
            <IconContext.Provider value={{ className: "w-[25px] h-[25px] hover:scale-125 duration-100" }}>
                <AiFillCloseCircle />
            </IconContext.Provider>
        </div>
    </div>
}

export default CartItem