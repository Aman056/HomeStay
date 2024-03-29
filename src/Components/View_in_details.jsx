import React, { useEffect, useState } from 'react'
import housekeeping from '../Images/housekeeper.png'
import wifi from '../Images/wifi.png'
import parkedCar from '../Images/parked-car.png'
import AC from '../Images/air-conditioner.png'
import TV from '../Images/television.png'
import { Link } from 'react-router-dom'
import Gallery from './Gallery'
import Checkout from './Checkout'
import { useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Success from './Success'
export default function View_in_details() {
    const feedbackData = [
        {
            id: 1,
            username: 'JohnDoe123',
            feedback: 'Great product! Very user-friendly interface.',
            rating: 5,
            date: '2024-03-20',
        },
        {
            id: 2,
            username: 'JaneSmith456',
            feedback: 'The service was excellent. I would highly recommend it.',
            rating: 4,
            date: '2024-03-18',
        },
        {
            id: 3,
            username: 'SamWilson789',
            feedback: 'Could use some improvements in the mobile app version.',
            rating: 3,
            date: '2024-03-15',
        },
        // Add more feedback objects as needed
    ];


    const data = useSelector((state) => state.SearchRoom)
    const booking = useSelector((state) => state.Booking.status)
    const [view_data, setView_data] = useState()
    const { state } = useLocation()


    useEffect(() => {
        const matched = data?.data?.find((item) => item.id === state);
        setView_data(matched);
    }, [state, data, view_data]);


    return (
        <div className='my-5 pt-5 container'>
            {booking === 'succeeded' && <Success />}
            <span className='mt-3 fs-2' style={{ color: '#00000', fontWeight: '700' }}>Room Detail</span>
            <hr />
            <div className="row my-5">
                <div className="col-12 col-lg-6 col-md-6">
                    <div id={`carouselExampleCaptions`} className="carousel slide rounded-3 overflow-hidden">
                        <div className="carousel-inner">
                            {view_data?.img_array?.map((itemImg, index) => (
                                <div key={index} className={"carousel-item" + (index === 0 ? " active" : "")}>
                                    <img src={`https://webapp-backend.azurewebsites.net/media/${itemImg?.image_field}`} className="d-block w-100" alt="..." />
                                </div>
                            ))}
                        </div>
                        <button className="carousel-control-prev" type="button" data-bs-target={`#carouselExampleCaptions`} data-bs-slide="prev">
                            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span className="visually-hidden">Previous</span>
                        </button>
                        <button className="carousel-control-next" type="button" data-bs-target={`#carouselExampleCaptions`} data-bs-slide="next">
                            <span className="carousel-control-next-icon" aria-hidden="true"></span>
                            <span className="visually-hidden">Next</span>
                        </button>
                    </div>
                </div>
                <div className="col-12 col-lg-6 col-md-6 text-left">
                    <div className="row bg-opacity-25 mx-lg-5 mx-0 mt-4 mt-lg-0 p-3 rounded-3 price-container">
                        <div className="container">
                            <div className=" text-start">
                                <h4>{view_data?.site_name}</h4>
                                <p className='text-secondary'>{view_data?.full_addres}</p>
                                {view_data?.nearest_airport && <p className='text-secondary'>Nearest Airport :{view_data?.nearest_airport}</p>}
                                {view_data?.nearest_metro_station && <p className='text-secondary'>Nearest Airport :{view_data?.nearest_metro_station}</p>}
                                {view_data?.nearest_railway_station && <p className='text-secondary'>Nearest Airport :{view_data?.nearest_railway_station}</p>}
                            </div>
                            <hr />
                        </div>
                        <div className="col text-start">
                            <span className='text-start pb-2' style={{ color: 'green' }}>Price start at</span>
                            <h3> &#8377;
                                {parseInt(view_data?.base_price).toLocaleString('en-IN')}

                            </h3>
                        </div>
                        <div className="col">
                            <div className="row text-start mt-2">
                                <div className="col-2"><i className="bi bi-person-fill"></i></div>
                                <div className="col-8">2 Guest</div>
                            </div>
                            <div className="row text-start">
                                <div className="col-2"><i className="bi bi-usb-mini-fill"></i></div>
                                <div className="col-8">1 Room</div>
                            </div>
                        </div>
                        <hr />
                        <div className="text-start">
                            {view_data && (
                                <div className="row">
                                    <div className="col-12 col-sm-6 col-lg-2 text-center my-2">
                                        {view_data.is_wifi_available && (
                                            <>
                                                <img src={wifi} className="mx-3" height={25} width={25} alt="Wi-Fi" />
                                                <span className="mt-1 mx-2">Wifi</span>
                                            </>
                                        )}
                                    </div>
                                    <div className="col-12 col-sm-6 col-lg-2 text-center my-2">
                                        {view_data.is_parking_available && (
                                            <>
                                                <img src={parkedCar} className="mx-3" width={25} height={25} alt="Parking" />
                                                <span className="mt-1 mx-2">Parking</span>
                                            </>
                                        )}
                                    </div>
                                    <div className="col-12 col-sm-6 col-lg-2 text-center my-2">
                                        {view_data.is_tv_available && (
                                            <>
                                                <img src={TV} className="mx-3" height={25} width={25} alt="TV" />
                                                <span className="mt-1 mx-2">TV</span>
                                            </>
                                        )}
                                    </div>
                                    <div className="col-12 col-sm-6 col-lg-2 text-center my-2">
                                        {view_data.is_ac_available && (
                                            <>
                                                <img src={AC} className="mx-3" height={25} width={25} alt="AC" />
                                                <span className="mt-1 mx-2">AC</span>
                                            </>
                                        )}
                                    </div>
                                    <div className="col-12 col-sm-6 col-lg-2 text-center my-2">
                                        {view_data.is_housekeeping_available && (
                                            <>
                                                <img src={housekeeping} className="mx-5 " width={25} height={25} alt="Housekeeping" />
                                                <span className="mt-1 mx-2">Housekeeping</span>
                                            </>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="row  my-2  mx-lg-5 mx-0 mx-md-5 px-5 p-3 rounded-3">
                        <div className="col my-2 ">
                            <div className='bg-opacity-25 py-1 bg-success rounded-2'>
                                <span className='text-success'>Check-in </span><br />
                                <span className=' text-secondary'>12:00</span>
                            </div>
                        </div>
                        <div className="col  my-2">
                            <div className='bg-opacity-25 bg-success rounded-2 py-1 '>
                                <span className='text-success'>Check-out </span><br />
                                <span className=' text-secondary'>11:00</span>
                            </div>
                        </div>
                        <div className="col  my-2">
                            <Link to={'/booking'} className="btn btn-success m-auto py-3 px-5" data-bs-target="#exampleModalToggle" data-bs-toggle="modal">Book</Link>
                            <Checkout view_data={view_data} />
                        </div>
                    </div>
                </div>
            </div>
            <h4 id='text_color' className='my-4'>Guest Reviews & Rating for Green Palms Hotel, Pacific Mall</h4>

            <div className="">
                <div className='row border border-1 m-0 p-0' style={{margin:'0px', padding:'0px'}}>
                    <div className="col-7 text-start px-3">
                        <span className='mt-3 fs-1 text-start' style={{ color: '#00000', fontWeight: '700', fontFamily: 'Trebuchet MS, sans-seri' }}>About</span>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore dolore ad maxime velit qui beatae in sapiente repudiandae ullam, cumque laudantium rerum molestiae nostrum ipsum nisi, eius ratione? Cumque, minus!</p>
                    </div>
                    <div className="col-12 col-md-6 col-lg-3 p-3">
                        <div className="container">
                            <span>5 &#9733;</span>
                            <div className="w-100 rate-bar">
                                <div className="w-25 bg-primary rate-bar-child" style={{ background: 'red', height: '10px', }}>
                                </div>
                            </div>
                            <span>4 &#9733;</span>
                            <div className="w-100 rate-bar">
                                <div className="w-25 bg-primary rate-bar-child" style={{ background: 'red', height: '10px', }}>
                                </div>
                            </div>
                            <span>3 &#9733;</span>
                            <div className="w-100 rate-bar">
                                <div className="w-25 bg-primary rate-bar-child" style={{ background: 'red', height: '10px', }}>

                                </div>
                            </div>
                            <span>2 &#9733;</span>
                            <div className="w-100 rate-bar">
                                <div className="w-25 bg-primary rate-bar-child" style={{ background: 'red', height: '10px', }}>

                                </div>
                            </div>
                            <span>1 &#9733;</span>
                            <div className="w-100 rate-bar">
                                <div className="w-25 bg-primary rate-bar-child" style={{ background: 'red', height: '10px', }}>

                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-12  col-md-6 col-lg-2 p-3 mt-2">
                        <div className="bg-success p-2  w-100 rounded-3 text-light">
                            <span className='mt-3  fs-3' style={{ color: '#00000', fontWeight: '200' }}>Ratings</span>
                            {/* <h2>Ratings</h2> */}
                            <h1>4/3.5</h1>
                            <span>786 Ratings</span><br />
                            <span>786 Reviews</span>
                        </div>

                    </div>
                    <hr/>
                    <div className="row m-auto">
                        <div className="col-12 col-lg-6 col-sm-12 col-md-6 pt-4">
                            <div className="feedback text-start py-2">
                                <h5> Gallery</h5>
                                <Gallery view_data={view_data} />
                            </div>
                        </div>
                        <div className="col-12 col-lg-6 col-sm-12 col-md-6 pt-4">
                            <div className="feedback text-start py-2" >
                                <h5 className='mx-3'> Feedbacks</h5>
                                <div className="container mt-5">
                                    {feedbackData.map((item) => <>
                                        <div class="card mb-3 " style={{zIndex:"-9999"}}>
                                            <div class="card-body">
                                                <div className="d-flex m-0 p-0">

                                                <h5 class="card-title m-0">{item.username} &#x2022; </h5> <span className='mx-2'>&#9733; {item.rating}</span> 
                                                </div>
                                                <p class="card-text">{item?.feedback}</p>
                                            </div>
                                        </div>
                                    </>)}

                                </div>

                            </div>

                        </div>
                    </div>
                </div>
            </div>


        </div>


        // </iv >
    )
}
