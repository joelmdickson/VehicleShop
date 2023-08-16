"use client"

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import vehicles from '../public/vehicles.json'
import VehicleCard, { Vehicle } from '@/components/vehicleCard'
import CartItem from '@/components/cartItem'
import { TiArrowSortedDown, TiArrowSortedUp } from "react-icons/ti"
import { FaShoppingCart } from 'react-icons/fa'
import { IconContext } from "react-icons";

const manufacturers = ['Any', 'Porsche', 'Nissan', 'BMW', 'Audi', 'Mercedes-Benz', 'Ford']
const bodies = ['Any', 'Coupé', 'Sedan', 'SUV']
const priceOptions = [0, 600000, 800000, 1000000, 1200000, 1400000, 1600000, 1800000, 2000000]

export default function Home() {
  const [cart, setCart] = useState<CartItem[]>([])
  const [filteredVehicles, setFilteredVehicles] = useState<Vehicle[]>(vehicles.data)
  const [mFilter, setMFilter] = useState('Any')
  const [bFilter, setBFilter] = useState('Any')
  const [priceRange, setPriceRange] = useState<number[]>([0, 2000000])
  const [dropdown, setDropdown] = useState<string | null>(null)

  useEffect(() => {

    const newFilteredVehicles = vehicles.data.filter((v) => (
      (mFilter !== 'Any' ? v.manufacturer === mFilter : true) &&
      (bFilter !== 'Any' ? v.body === bFilter : true) &&
      (!priceRange[1] ? true : v.price >= priceRange[0] && v.price <= priceRange[1])
    ))
    setFilteredVehicles(newFilteredVehicles)
  }, [bFilter, mFilter, priceRange])

  const handleAddtoCart = useCallback((v: Vehicle) => {
    const cartItem: CartItem = {
      stockIndex: v.stockIndex,
      cartIndex: cart.length + 1,
      manufacturer: v.manufacturer,
      model: v.model,
      price: v.price,
      body: v.body,
      wiki: v.wiki,
      img: v.img,
    }
    const newCart = cart.concat([cartItem])
    setCart(newCart)
  }, [cart])

  const handleRemoveFromCart = useCallback((v: CartItem) => {
    const newCart = cart.filter((item) => item.cartIndex !== v.cartIndex)
    setCart(newCart)
  }, [cart])

  const manufacturerFilter = useMemo(() => {
    return (
      <div className='relative text-lg'>
        <div className='flex'>
          <div className='flex-1 px-2 rounded-l border border-black'>{mFilter}</div>
          <div className='w-10 rounded-r border-y border-r border-black bg-gray-400 text-center cursor-pointer hover:bg-gray-300 duration-150'
            onClick={() => setDropdown(dropdown === 'manufacturer' ? null : 'manufacturer')}>
            <IconContext.Provider value={{ size: "25px", style: { marginLeft: '7px', marginTop: '2px' } }}>
              {dropdown === 'manufacturer' ? <TiArrowSortedUp /> : <TiArrowSortedDown />}
            </IconContext.Provider>
          </div>
        </div>
        {dropdown === 'manufacturer' && (
          <div className='absolute right-0 left-0 mx-2 border-x border-b rounded-b-lg border-black z-50'>
            {manufacturers.map((m, i) => {
              return (
                <div key={i} className='pl-2 pr-8 bg-gray-200 hover:bg-gray-400 cursor-pointer last-of-type:rounded-b-lg' onClick={() => {
                  setMFilter(mFilter === m ? 'Any' : m)
                  setDropdown(null)
                }}>
                  {m}
                </div>)
            })}
          </div>
        )}
      </div>
    )
  }, [dropdown, mFilter])

  const bodyFilter = useMemo(() => {
    return (
      <div className='relative text-lg'>
        <div className='flex'>
          <div className='flex-1 px-2 rounded-l border border-black'>{bFilter}</div>
          <div className='w-10 rounded-r border-y border-r border-black bg-gray-400 text-center cursor-pointer hover:bg-gray-300 duration-150'
            onClick={() => setDropdown(dropdown === 'body' ? null : 'body')}>
            <IconContext.Provider value={{ size: "25px", style: { marginLeft: '7px', marginTop: '2px' } }}>
              {dropdown === 'body' ? <TiArrowSortedUp /> : <TiArrowSortedDown />}
            </IconContext.Provider>
          </div>
        </div>
        {dropdown === 'body' && (
          <div className='absolute right-0 left-0 mx-2 border-x border-b rounded-b-lg border-black z-50'>
            {bodies.map((b, i) => {
              return (
                <div key={i} className='pl-2 pr-8 bg-gray-200 hover:bg-gray-400 cursor-pointer last-of-type:rounded-b-lg' onClick={() => {
                  setBFilter(bFilter === b ? 'Any' : b)
                  setDropdown(null)
                }}>
                  {b}
                </div>)
            })}
          </div>
        )}
      </div>
    )
  }, [bFilter, dropdown])

  const priceRangeFilter = useMemo(() => {
    return (
      <div className='flex flex-col gap-2 text-lg'>
        <div className='flex gap-2'>
          <div className='text-right w-10'>From</div>
          <div className='flex-1 relative'>
            <div className='flex'>
              <div className='flex-1 px-2 rounded-l border border-black'>{priceRange[0]}</div>
              <div className='w-10 rounded-r border-y border-r border-black bg-gray-400 text-center cursor-pointer hover:bg-gray-300 duration-150'
                onClick={() => setDropdown(dropdown === 'minPrice' ? null : 'minPrice')}>
                <IconContext.Provider value={{ size: "25px", style: { marginLeft: '7px', marginTop: '2px' } }}>
                  {dropdown === 'minPrice' ? <TiArrowSortedUp /> : <TiArrowSortedDown />}
                </IconContext.Provider>
              </div>
            </div>
            {dropdown === 'minPrice' && (
              <div className='absolute right-0 left-0 mx-2 border-x border-b rounded-b-lg border-black z-50'>
                {priceOptions.filter((p) => p <= priceRange[1]).map((p, i) => {
                  return (
                    <div key={i} className='pl-2 pr-8 bg-gray-200 hover:bg-gray-400 cursor-pointer last-of-type:rounded-b-lg' onClick={() => {
                      setPriceRange([p, priceRange[1]])
                      setDropdown(null)
                    }}>
                      {p}
                    </div>)
                })}
              </div>
            )}
          </div></div>

        <div className='flex gap-2'>
          <div className='text-right w-10'>To</div>
          <div className='flex-1 relative'>
            <div className='flex'>
              <div className='flex-1 px-2 rounded-l border border-black'>{priceRange[1]}</div>
              <div className='w-10 rounded-r border-y border-r border-black bg-gray-400 cursor-pointer text-center hover:bg-gray-300 duration-150'
                onClick={() => setDropdown(dropdown === 'maxPrice' ? null : 'maxPrice')}>
                <IconContext.Provider value={{ size: "25px", style: { marginLeft: '7px', marginTop: '2px' } }}>
                  {dropdown === 'maxPrice' ? <TiArrowSortedUp /> : <TiArrowSortedDown />}
                </IconContext.Provider>
              </div>
            </div>
            {dropdown === 'maxPrice' && (
              <div className='absolute right-0 left-0 mx-2 border-x border-b rounded-b-lg border-black z-50'>
                {priceOptions.filter((p) => p > priceRange[0]).map((p, i) => {
                  return (
                    <div key={i} className='pl-2 pr-8 bg-gray-200 hover:bg-gray-400 cursor-pointer last-of-type:rounded-b-lg' onClick={() => {
                      setPriceRange([priceRange[0], p])
                      setDropdown(null)
                    }}>
                      {p}
                    </div>)
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }, [dropdown, priceRange])

  return (
    <main className="flex gap-4 bg-gray-200 min-h-screen flex-col items-center">
      <div className='fixed border-b flex pt-1 pr-72 justify-end border-black h-8 w-full bg-gray-200 z-50'>
        <div>
          <IconContext.Provider value={{ size: "25px" }}>
            <FaShoppingCart />
          </IconContext.Provider>
        </div>
      </div>
      <div className='flex gap-4 container mx-20 my-12'>
        <div className='flex flex-col gap-4 flex-1'>
          <div className='my-8 text-3xl font-semibold'>
            Browse Vehicles
          </div>
          <div className='text-2xl grid grid-cols-4 gap-4'>
            <div className='col-span-1'>
              <div className='flex flex-col gap-6 border border-black py-4 pl-2 pr-4'>
                <div className='flex flex-col gap-4'>
                  <div>Manufacturer</div>
                  {manufacturerFilter}
                </div>
                <div className='flex flex-col gap-4'>
                  <div>Body</div>
                  {bodyFilter}
                </div>
                <div className='flex flex-col gap-4'>
                  <div>Price Range</div>
                  {priceRangeFilter}
                </div>
                <div>
                  <div className='text-lg cursor-pointer text-center flex justify-center' onClick={() => {
                    setBFilter('Any')
                    setMFilter('Any')
                    setPriceRange([0, 2000000])
                  }}><div className='border border-black rounded-lg px-2 bg-gray-400 hover:bg-gray-300 duration-150'>
                      RESET FILTERS
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className='flex flex-col gap-4 col-span-3'>
              {filteredVehicles.length !== 0 ? filteredVehicles.map((v) => {
                return <VehicleCard vehicle={v} key={v.stockIndex} cart={cart} onClick={() => handleAddtoCart(v)} />
              }) : (
                <div className='text-center border border-transparent'>
                  No cars match your filters.
                  <span className='ml-2 cursor-pointer text-blue-400' onClick={() => {
                    setBFilter('Any')
                    setMFilter('Any')
                    setPriceRange([0, 2000000])
                  }}>Click here to reset.</span>
                </div>)}
            </div>
          </div>
        </div>
        <div className='w-60'>
          <div className='fixed w-60 pb-2 border border-black'>
            <div className='text-center text-3xl font-semibold'>Cart</div>
            <div className='mt-4 mx-2 flex flex-col gap-2'>
              {cart.length !== 0 ? (
                <div className='flex flex-col gap-2'>
                  {cart.map((v) => {
                    return <CartItem item={v} key={v.cartIndex} onClick={() => handleRemoveFromCart(v)} />
                  })}
                  <div className='text-right'>TOTAL: R {cart.reduce((acc, curr) => {
                    return acc + curr.price

                  }, 0)}</div>
                  <div className='text-base mt-4 cursor-pointer text-center flex justify-end' onClick={() => {
                    setCart([])
                  }}><div className='border border-black rounded-lg px-2 bg-gray-400 hover:bg-gray-300 duration-150'>
                      Empty Cart
                    </div>
                  </div>
                </div>) :
                <div className='text-center'>Your cart is empty.</div>}
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
