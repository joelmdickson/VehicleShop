import Image from 'next/image'
import { MouseEventHandler, useEffect, useState } from 'react'
import cartItem from './cartItem'
import classNames from 'classnames'

export interface Vehicle {
    stockIndex: number
    manufacturer: string
    model: string
    price: number
    body: string
    wiki: string
    img: string
}

const VehicleCard = ({ vehicle, cart, onClick }: { vehicle: Vehicle, cart: cartItem[], onClick: MouseEventHandler }): JSX.Element => {
    const [inCart, setInCart] = useState(false)

    useEffect(() => {
        setInCart((cart.findIndex((item) => item.stockIndex === vehicle.stockIndex) !== -1))
    }, [cart, vehicle.stockIndex])

    return (
        <div key={vehicle.stockIndex} className='p-4 flex gap-4 border border-black'>
            <div>
                <Image
                    src={'http://recruitment.warpdevelopment.co.za/vehicles' + vehicle.img}
                    alt={vehicle.manufacturer + '' + vehicle.model}
                    width={200}
                    height={200}
                    className='h-full w-full rounded-lg'
                />
            </div>
            <div className='flex-1 flex flex-col gap-4 text-xl'>
                <div>Price: R {vehicle.price}</div>
                <div>Make: {vehicle.manufacturer}</div>
                <div>Model: {vehicle.model}</div>
                <div className='flex justify-between'>
                    Body: {vehicle.body}
                    <div className={classNames('rounded border px-2', {
                        'border-black bg-gray-400 cursor-pointer hover:bg-gray-300 duration-150': !inCart,
                        'border-gray-400 text-gray-400 cursor-default': inCart
                    })}
                        onClick={!inCart ? onClick : undefined}>
                        Add to Cart
                    </div>
                </div>
            </div>
        </div>
    )
}

export default VehicleCard