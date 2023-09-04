"use client"

import { useCallback, useEffect, useMemo, useState } from 'react'
import vehicles from '../public/vehicles.json'
import VehicleCard, { Vehicle } from '@/components/vehicleCard'
import CartItem from '@/components/cartItem'
import { TiArrowSortedDown, TiArrowSortedUp } from "react-icons/ti"
import { FaShoppingCart } from 'react-icons/fa'
import { MdAccountCircle } from 'react-icons/md'
import { BiSolidCarGarage } from 'react-icons/bi'
import { IconContext } from "react-icons";
import Link from 'next/link'
import ToCurrency from '@/services/ToCurrency'

const manufacturers = ['Any', 'Porsche', 'Nissan', 'BMW', 'Audi', 'Mercedes-Benz', 'Ford']
const bodies = ['Any', 'Coupé', 'Sedan', 'SUV']
const priceOptions = [0, 600000, 800000, 1000000, 1200000, 1400000, 1600000, 1800000, 2000000]

export default function Home() {
  const [cartItems, setCartItems] = useState<CartItem[]>([])
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

    setCartItems((prev) => prev.concat([{
      stockIndex: v.stockIndex,
      cartIndex: prev.length + 1,
      manufacturer: v.manufacturer,
      model: v.model,
      price: v.price,
      body: v.body,
      wiki: v.wiki,
      img: v.img,
    }]))
  }, [])

  const handleRemoveFromCart = useCallback((v: CartItem) => {
    setCartItems((prev) => prev.filter((item) => item.cartIndex !== v.cartIndex))
  }, [])

  const navBar = useMemo(() => {
    return (
      <nav className='fixed flex h-14 px-4 justify-between w-full bg-green-300 z-50'>
        <div className='flex gap-4 text-lg font-semibold items-center'>
          <BiSolidCarGarage size={35} />
          <h2 className='cursor-default my-auto'>
            SHOPCARS.CO.ZA
          </h2>
          <ol className='flex gap-3 text-base h-full'>
            <li className='hover:text-gray-500 cursor-pointer list-none py-4 px-2'>
              <Link href='#' className='my-auto'><h2>Home</h2></Link>
            </li>
            <li className='text-green-500 cursor-pointer list-none bg-neutral-200 py-4 px-2'>
              <Link href='#'><h2>Buy a Car</h2></Link>
            </li>
            <li className='hover:text-gray-500 cursor-pointer list-none py-4 px-2'>
              <Link href='#'><h2>Careers</h2></Link>
            </li>
            <li className='hover:text-gray-500 cursor-pointer list-none py-4 px-2'>
              <Link href='#'><h2>Contact</h2></Link>
            </li>
          </ol>
        </div>
        <div className='flex gap-4 my-auto'>
          <IconContext.Provider value={{ size: "25px" }}>
            <FaShoppingCart />
          </IconContext.Provider>
          <Link href='#'>
            <IconContext.Provider value={{ size: "25px" }}>
              <MdAccountCircle />
            </IconContext.Provider>
          </Link>
        </div>
      </nav>
    )
  }, [])

  const manufacturerFilter = useMemo(() => {
    return (
      <div className='relative text-lg'>
        <select value={mFilter} className='px-2 w-full cursor-pointer flex items-center justify-between rounded border bg-neutral-100 border-neutral-400 duration-150'
          onChange={(e) => setMFilter(e.target.value)}>
          {manufacturers.map((item, index) => {
            return (

              <option key={index} className='pl-2 pr-8 border-neutral-400 hover:bg-green-200 cursor-pointer last-of-type:rounded-b-lg' value={item}>
                {item}
              </option>)
          })}
        </select>
      </div>
    )
  }, [mFilter])

  const bodyFilter = useMemo(() => {
    return (
      <div className='relative text-lg'>
        <select value={bFilter} className='px-2 w-full cursor-pointer flex items-center justify-between rounded border bg-neutral-100 border-neutral-400 duration-150'
          onChange={(e) => setBFilter(e.target.value)}>
          {bodies.map((item, index) => {
            return (
              <option key={index} className='pl-2 pr-8 border-neutral-400 hover:bg-green-200 cursor-pointer last-of-type:rounded-b-lg' value={item}>
                {item}
              </option>)
          })}
        </select>
      </div>
    )
  }, [bFilter])

  const priceRangeFilter = useMemo(() => {
    return (
      <div className='flex flex-col gap-2 text-lg'>
        <div className='flex gap-2'>
          <div className='text-right w-10 text-base'>From</div>
          <div className='flex-1 relative'>
            <select value={priceRange[0]} className='px-2 w-full cursor-pointer flex items-center justify-between rounded border bg-neutral-100 border-neutral-400 duration-150'
              onChange={(e) => setPriceRange([+e.target.value, priceRange[1]])}>
              {priceOptions.filter((p) => p <= priceRange[1]).map((item, index) => {
                return (
                  <option key={index} className='pl-2 pr-8 border-neutral-400 hover:bg-green-200 cursor-pointer last-of-type:rounded-b-lg' value={item}>
                    {ToCurrency(item, true)}
                  </option>)
              })}
            </select>
          </div>
        </div>
        <div className='flex gap-2'>
          <div className='text-right w-10 text-base'>To</div>
          <div className='flex-1 relative'>
            <select value={priceRange[1]} className='px-2 w-full cursor-pointer flex items-center justify-between rounded border bg-neutral-100 border-neutral-400 duration-150'
              onChange={(e) => setPriceRange([priceRange[0], +e.target.value])}>
              {priceOptions.filter((p) => p > priceRange[0]).map((item, index) => {
                return (
                  <option key={index} className='pl-2 pr-8 border-neutral-400 hover:bg-green-200 cursor-pointer last-of-type:rounded-b-lg' value={item}>
                    {ToCurrency(item, true)}
                  </option>)
              })}
            </select>
            {dropdown === 'maxPrice' && (
              <div className='absolute right-0 left-0 mx-2 bg-neutral-100 border-x border-b rounded-b-lg border-neutral-400 z-50'>
                {priceOptions.filter((p) => p > priceRange[0]).map((p, i) => {
                  return (
                    <div key={i} className='pl-2 pr-8 border-neutral-400 hover:bg-green-200 cursor-pointer last-of-type:rounded-b-lg' onClick={() => {
                      setPriceRange([priceRange[0], p])
                      setDropdown(null)
                    }}>
                      {ToCurrency(p, true)}
                    </div>)
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }, [dropdown, priceRange])

  const filters = useMemo(() => {
    return (
      <form className='bg-neutral-200 rounded-xl pt-2 pb-4'>
        <h3 className='text-center text-2xl font-semibold'>Filters</h3>
        <div className='w-full h-0.5 mt-2 mb-4 bg-neutral-100' />
        <div className='flex flex-col gap-4 '>
          <div className='flex flex-col gap-2 px-4'>
            <div>Manufacturer</div>
            <div>{manufacturerFilter}</div>
          </div>
          <div className='w-full h-0.5 bg-neutral-100' />
          <div className='flex flex-col gap-2 px-4'>
            <div>Body</div>
            <div>{bodyFilter}</div>
          </div>
          <div className='w-full h-0.5 bg-neutral-100' />
          <div className='flex flex-col gap-2 px-4'>
            <div>Price Range</div>
            <div>{priceRangeFilter}</div>
          </div>
          <div className='w-full h-0.5 bg-neutral-100' />
          <div>
            <div className='text-lg cursor-pointer text-center flex justify-center' onClick={() => {
              setBFilter('Any')
              setMFilter('Any')
              setPriceRange([0, 2000000])
            }}>
              <button className='border border-neutral-400 rounded-lg px-2 bg-neutral-100 hover:bg-neutral-300 duration-150'>
                Reset Filters
              </button>
            </div>
          </div>
        </div>
      </form>
    )
  }, [bodyFilter, manufacturerFilter, priceRangeFilter])

  const results = useMemo(() => {
    return (
      <>
        {filteredVehicles.map((v) => {
          return <VehicleCard vehicle={v} key={v.stockIndex} cart={cartItems} onClick={() => handleAddtoCart(v)} />
        })}
      </>
    )
  }, [cartItems, filteredVehicles, handleAddtoCart])

  const cart = useMemo(() => {
    return (
      <div className='fixed mt-4 w-60 py-2 rounded-lg bg-neutral-200'>
        <h3 className='text-center text-2xl font-semibold'>Cart</h3>
        <div className='w-full h-0.5 mt-2 bg-neutral-100' />
        <div className='mt-4 mx-4 flex flex-col gap-2'>
          {cartItems.length !== 0 ? (
            <div className='flex flex-col gap-2'>
              {cartItems.map((v) => {
                return <CartItem item={v} key={v.cartIndex} onClick={() => handleRemoveFromCart(v)} />
              })}
              <div className='text-right text-green-500'>TOTAL: {ToCurrency(cartItems.reduce((acc, curr) => {
                return acc + curr.price

              }, 0))}</div>
              <div className='text-base mt-4 cursor-pointer text-center flex justify-end' onClick={() => {
                setCartItems([])
              }}><div className='border border-neutral-400 rounded-lg px-2 bg-neutral-100 hover:bg-neutral-300 duration-150'>
                  Empty Cart
                </div>
              </div>
            </div>) :
            <div className='text-center'>Your cart is empty.</div>}
        </div>
      </div>
    )
  }, [cartItems, handleRemoveFromCart])

  return (
    <main className="text-neutral-800 flex gap-4 flex-col">
      {navBar}
      <div className='flex gap-4 my-14 mx-4'>
        <div className='flex flex-col flex-1'>
          <h1 className='my-4 text-2xl font-semibold'>
            Browse Vehicles
          </h1>
          <div className='text-xl grid grid-cols-4 gap-4'>
            <div className='col-span-1'>{filters}</div>
            {filteredVehicles.length !== 0 ?
              <div className='grid grid-cols-2 gap-4 col-span-3'>{results}</div> : (
                <div className=' col-span-3 text-center border border-transparent'>
                  No cars match your filters.
                  <span className='ml-2 cursor-pointer text-blue-400' onClick={() => {
                    setBFilter('Any')
                    setMFilter('Any')
                    setPriceRange([0, 2000000])
                  }}>Click here to reset.</span>
                </div>)
            }
          </div>
        </div>
        <div className='w-60'>
          {cart}
        </div>
      </div>
    </main>
  )
}
