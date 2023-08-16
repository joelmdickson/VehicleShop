import { MouseEventHandler } from 'react'

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
        <div className='rounded border border-black px-2 bg-gray-400 cursor-pointer' onClick={onClick}>X</div>
    </div>
}

export default CartItem