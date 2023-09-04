import Image from 'next/image'
import { MouseEventHandler, useEffect, useState } from 'react'
import cartItem from './cartItem'
import classNames from 'classnames'
import ToRand from '../services/ToCurrency'

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
    const [expanded, setExpanded] = useState(false)

    useEffect(() => {
        setInCart((cart.findIndex((item) => item.stockIndex === vehicle.stockIndex) !== -1))
    }, [cart, vehicle.stockIndex])

    return (
        <div className='relative'>
            <div key={vehicle.stockIndex} className='flex gap-4 h-52 bg-neutral-200 rounded-xl shadow-lg group relative overflow-hidden'>
                <div className='overflow-hidden'>
                    <div
                        className='h-full w-[200px] inset-0 bg-center rounded-l-lg duration-200 group-hover:scale-125'
                        style={{
                            backgroundImage: `url(${'http://recruitment.warpdevelopment.co.za/vehicles' + vehicle.img})`,
                            backgroundRepeat: "no-repeat",
                            backgroundSize: "cover"
                        }}>
                    </div>
                </div>
                <div className='p-2 flex-1 flex flex-col justify-between'>
                    <div>{vehicle.manufacturer + ' ' + vehicle.model}
                        <div className='text-base'>{vehicle.body}</div></div>
                    <div className='text-lg text-green-600'>{ToRand(vehicle.price)}</div>
                    <div className='text-sm'>
                        Finance from
                        <div>
                            <span className='text-green-500'>{ToRand(vehicle.price * 1.5 / 72)} p/m</span>
                            <span className='text-[10px]'> *</span>
                        </div>

                    </div>
                </div>
                <div className='transition hidden w-8 h-8 absolute top-4 left-4 rounded opacity-75 hover:opacity-95 group-hover:grid grid-cols-2 grid-rows-2 gap-3 hover:scale-125 duration-100 cursor-pointer'
                    onClick={() => { setExpanded(true) }}>
                    <div className='rounded-tl border-t border-l' />
                    <div className='rounded-tr border-t border-r' />
                    <div className='rounded-bl border-b border-l' />
                    <div className='rounded-br border-b border-r' />
                </div>
                <div className='absolute bottom-4 left-4'>
                    <div className={classNames('transition rounded border px-2 w-32 text-lg text-center group-hover:opacity-100 duration-200', {
                        'opacity-0 border-neutral-900 bg-neutral-100 cursor-pointer hover:bg-green-200': !inCart,
                        'border-neutral-400 bg-neutral-200 text-neutral-400 cursor-default': inCart
                    })}
                        onClick={!inCart ? onClick : undefined}>
                        {inCart ? 'In Cart' : 'Add to Cart'}
                    </div>
                </div>
            </div>
            {expanded && <Image
                className="absolute z-20 top-0 rounded-lg"
                src={'http://recruitment.warpdevelopment.co.za/vehicles' + vehicle.img}
                onClick={() => { setExpanded(false) }}
                width={600}
                height={600}
                alt={vehicle.img}
            />}
        </div>
    )
}

export default VehicleCard