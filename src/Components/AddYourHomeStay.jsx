import React, { useEffect, useRef } from 'react'
import '../Components/Styles/homeStayform.css'
import { useState } from 'react';
import states from '../Demo.json'
// import
import Terms from '../TermAndCond.json'
import Toast from './Toast.jsx'
import { useDispatch, useSelector } from 'react-redux';
import { AddNewProperty } from '../Redux/AddNewPro/AddPropAction.js';
import 'react-toastify/dist/ReactToastify.css';
import Loading from './Loading.jsx';
import TermsAndCond from './TermsAndCond.jsx';
import { ToastContainer, toast } from 'react-toastify';

export default function AddYourHomeStay() {
    const AddProp = useSelector((state) => state?.AddProp)
    const ref = useRef(null)
    const dispatch = useDispatch()
    const [lgShow, setLgShow] = useState(false);
    const [error, setError] = useState('');
    const [room, setRooms] = useState([])

    useEffect(() => {
        if (ref.current instanceof HTMLElement) {
            ref.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }, [ref]);

    const [roomForm, setRoomForm] = useState([])
    const [formData, setFormData] = useState({
        site_name: '',
        full_address_one_line: '',
        about_this_room: '',
        area: '',
        pincode: '',
        front_img1: '',
        front_img2: '',
        front_img3: '',
        front_img4: '',
        front_img5: '',
        front_img6: '',
        front_img7: '',
        state: '',
        city: '',
        contact_person: "",
        price_currency: "INR",
        contact_email: '',
        contact_phn: '',
        how_to_reach: '',
        nearest_attraction_1: '',
        nearest_attraction_2: '',
        totalRooms: '',
        checked: false,
    });

    // console.log(formData, 'this is data')

    const handleAddRoom = (e) => {
        e.preventDefault();
        if (roomForm?.category && roomForm?.base_price) {
            const updatedRooms = [...room, roomForm];
            setRooms(updatedRooms);
            setFormData({ ...formData, "rooms": updatedRooms });
            setRoomForm({});
        } else {
            notify('Select valid price & category');
        }
    }

    const handleDelete = (num) => {
        const filterData = room.filter((item, index) => index !== num);
        setRooms(filterData);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const HandleChangeAddRoom = (e) => {
        const { value, name } = e.target;
        setRoomForm({ ...roomForm, [name]: value })

    }

    const notify = (msg) => toast.error(msg,
        {
            position: 'top-right',
            toastContainerClassName: 'custom-toast-container',
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
        }
    );
    const Agree = (accept, closeDialog) => {
        setLgShow(closeDialog)
        if (accept) {
            setFormData({ ...formData, checked: true });
        }
        setError('');
    }

    useEffect(() => {
        setFormData({ /*this is */ });
    }, [AddProp?.data])

    const handleSubmit = async (e) => {

        e.preventDefault();
        if (!formData.checked) {
            setError('Please accept the terms and conditions to proceed.');
        } else {

            try {
                if (room.length > 0) {
                    await dispatch(AddNewProperty(formData));
                    await AddProp
                    setFormData({});
                    setTimeout(() => {
                        window.location.reload(true)
                    }, 3000);
                }
                else {
                    notify('Add room first.')
                }
            } catch (error) {
                console.error('Error:', error);
            }
        }

    };

    console.log(formData, 'this is data')

    return (
        <div className='container add-your-home-stay pt-3' >
            {AddProp.status === 'loading' && <Loading />}
            {AddProp.status === 'succeeded' && <Toast msg={AddProp?.data} />}
            <h2 className='title' ref={ref}>Add your property</h2>
            <form onSubmit={handleSubmit}>
                <div className="row px-0 mt-4 container-fluid my-5 py-3  child-add-your-home-stay">
                    <div className="col-md-6 ">
                        <h5 className='text-start mx-3 mb-4'>About home stay</h5>
                        <div className="container mt-2">
                            <div className="row">
                                <div className="col-12">
                                    <div className="mb-3">
                                        <input required type="text" className="form-control" name="site_name" value={formData.homeStayName} onChange={handleChange} placeholder="Name of home stay" />
                                    </div>
                                </div>
                                <div className="col-12">
                                    <div className="mb-3">
                                        <input required type="text" className="form-control" name="full_address_one_line" value={formData.address} onChange={handleChange} placeholder="Full address " />
                                    </div>
                                </div>
                                <div className="col-12">
                                    <div className="mb-3">
                                        <textarea required type="text" className="form-control" name="about_this_room" value={formData.about_this_room} onChange={handleChange} placeholder="About this home stay" />
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="mb-3">
                                        <select className="form-select" name="state" value={formData.state} onChange={handleChange} title="Total Room">
                                            <option value="">State</option>
                                            {states?.states?.map((item, index) => (
                                                <option key={index} value={item}>{item}</option>
                                            ))}
                                        </select>

                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="mb-3">
                                        <input required type="text" className="form-control" name="city" value={formData.city} onChange={handleChange} placeholder="Enter city" />
                                    </div>
                                </div>


                            </div>
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="mb-3">
                                        <input required type="text" className="form-control" name="area" value={formData.area} onChange={handleChange} placeholder="Area" />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="mb-3">
                                        <input required type="number" className="form-control" name="pincode" value={formData.pincode} onChange={handleChange} placeholder="Pin-code" />
                                    </div>
                                </div>
                            </div>
                            <div className="row">

                                <div className="col-md-12">
                                    <div className="mb-3">
                                        <input required type="text" className="form-control" name="contact_person" value={formData.contact_person} onChange={handleChange} placeholder="Contact person name" />
                                    </div>


                                </div>
                            </div>

                            <div className="row">
                                <div className="col-md-6">
                                    <div className="mb-3">
                                        <input required type="email" className="form-control" name="contact_email" value={formData.email} onChange={handleChange} placeholder="Enter email" />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="mb-3">
                                        <div className="mb-3 input-group">
                                            <span className="input-group-text">+91</span>
                                            <input required type="tel" pattern="[0-9]{10}" minlength="10" maxlength="10" className="form-control" name="contact_phn" value={formData.contact_phn} onChange={handleChange} placeholder="Phone number" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="mb-3">
                                        <input required type="text" className="form-control" name="upi_id" value={formData?.upi_id} onChange={handleChange} placeholder="Enter UPI ID" />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="mb-3">
                                        <div className="mb-3">
                                            <input required type="tel" className="form-control" pattern="[0-9]{10}" minlength="10" maxlength="10" name="upi_phn_no" value={formData?.upi_phn_no} onChange={handleChange} placeholder="G-pay, PhonePay, Number etc" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="mb-3">
                                        <input required type="text" className="form-control" name="how_to_reach" value={formData.how_to_reach} onChange={handleChange} placeholder="How to reach" />
                                    </div>
                                </div>
                            </div>
                            {/* Nearest */}
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="mb-3">
                                        <input required type="text" className="form-control" name="nearest_railway_station" value={formData.nearest_railway_station} onChange={handleChange} placeholder="Nearest Railway Station" />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="mb-3">
                                        <input required type="number" className="form-control" name="distance_from_rs" value={formData.distance_from_rs} onChange={handleChange} placeholder="Distance from railway station, KM" />
                                    </div>
                                </div>

                            </div>
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="mb-3">
                                        <input required type="text" className="form-control" name="nearest_airport" value={formData.nearest_airport} onChange={handleChange} placeholder="Nearest Airport" />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="mb-3">
                                        <input required type="number" className="form-control" name="distance_from_ap" value={formData.distance_from_ap} onChange={handleChange} placeholder="Distance from Airport, KM" />
                                    </div>
                                </div>

                            </div>
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="mb-3">
                                        <input required type="text" className="form-control" name="nearest_metro_station" value={formData.nearest_metro_station} onChange={handleChange} placeholder="Nearest metro station" />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="mb-3">
                                        <input required type="number" className="form-control" name="distance_from_ms" value={formData.distance_from_ms} onChange={handleChange} placeholder="Distance from metro station, KM" />
                                    </div>
                                </div>

                            </div>
                            <div className="row">

                                <div className="col-md-6">
                                    <div className="mb-3">
                                        <input required type="text" className="form-control" name="nearest_attraction_1" value={formData.nearest_attraction_1} onChange={handleChange} placeholder="Nearest attraction point-1" />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="mb-3">
                                        <input required type="text" className="form-control" name="nearest_attraction_2" value={formData.nearest_attraction_2} onChange={handleChange} placeholder="Nearest attraction point-2" />
                                    </div>
                                </div>

                            </div>
                            <div className="row">

                                <div className="col-md-6">
                                    <div className="mb-3">
                                        <input required type="text" className="form-control" name="nearest_attraction_3" value={formData.nearest_attraction_3} onChange={handleChange} placeholder="Nearest attraction point-3" />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="mb-3">
                                        <input required type="text" className="form-control" name="nearest_attraction_4" value={formData?.nearest_attraction_4} onChange={handleChange} placeholder="Nearest attraction point-4" />
                                    </div>
                                </div>

                            </div>
                            <div className="row">


                                <div className="col-12">
                                    <div className="mb-3">
                                        <input required type="text" className="form-control" name="nearest_attraction_5" value={formData?.nearest_attraction_5} onChange={handleChange} placeholder="Nearest attraction point-5" />
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <h5 className=' mx-3 mb-4 text-start'>About features</h5>
                        <div className="container mt-2">
                            <div className="container px-2 py-2 rounded-3 mb-2" style={{ background: '#ECECEC' }}>
                                <div className='my-2 border-bottom'>
                                    <span className='fs-6 fw-bold py-2 w-100'>Add Images</span>
                                </div>
                                {/* <hr/> */}
                                <div className="row">
                                    <div className="col-6 mb-3">
                                        <label htmlFor="frontImage1">Room Image 1</label>
                                        <input
                                            required
                                            type="file"
                                            className="form-control"
                                            name="front_img1"
                                            value={formData.front_img1}
                                            onChange={handleChange}
                                            placeholder="Room Image 1"
                                            accept=".jpg, .jpeg"
                                            multiple
                                        />

                                    </div>
                                    <div className="col-6 mb-3">
                                        <label htmlFor="frontImage1">Room Image 2</label>
                                        <input
                                            required
                                            type="file"
                                            className="form-control"
                                            name="front_img2"
                                            value={formData.front_img2}
                                            onChange={handleChange}
                                            placeholder="Room Image 2"
                                            accept=".jpg, .jpeg"
                                            multiple
                                        />

                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-6 mb-3">
                                        <label htmlFor="frontImage1">Room Image 3</label>
                                        <input
                                            required
                                            type="file"
                                            className="form-control"
                                            name="front_img3"
                                            value={formData.front_img3}
                                            onChange={handleChange}
                                            placeholder="Room Image 3"
                                            accept=".jpg, .jpeg"
                                            multiple
                                        />

                                    </div>
                                    <div className="col-6 mb-3">
                                        <label htmlFor="frontImage1">Room Image 4</label>
                                        <input
                                            required
                                            type="file"
                                            className="form-control"
                                            name="front_img4"
                                            value={formData.front_img4}
                                            onChange={handleChange}
                                            placeholder="Room Image 4"
                                            accept=".jpg, .jpeg"
                                            multiple
                                        />

                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-6 mb-3">
                                        <label htmlFor="frontImage1">Room Image 5</label>
                                        <input
                                            required
                                            type="file"
                                            className="form-control"
                                            name="front_img5"
                                            value={formData.front_img5}
                                            onChange={handleChange}
                                            placeholder="Room Image 5"
                                            accept=".jpg, .jpeg"
                                            multiple
                                        />

                                    </div>
                                    <div className="col-6 mb-3">
                                        <label htmlFor="frontImage1">Room Image 6</label>
                                        <input
                                            required
                                            type="file"
                                            className="form-control"
                                            name="front_img6"
                                            value={formData.front_img6}
                                            onChange={handleChange}
                                            placeholder="Room Image 6"
                                            accept=".jpg, .jpeg"
                                            multiple
                                        />

                                    </div>
                                </div>
                                <div className="col-12 mb-3">
                                    <label htmlFor="frontImage1">Room Image 7</label>
                                    <input
                                        required
                                        type="file"
                                        className="form-control"
                                        name="front_img7"
                                        value={formData.front_img7}
                                        onChange={handleChange}
                                        placeholder="Room Image 7"
                                        accept=".jpg, .jpeg"
                                        multiple
                                    />

                                </div>

                            </div>


                            <div className="container px-2 py-2 rounded-3" style={{ background: '#ECECEC' }}>
                                <form onSubmit={handleAddRoom} >
                                    <div className='my-2 border-bottom'>
                                        <span className='fs-6 fw-bold py-2 w-100'>Add Room</span>
                                    </div>
                                    <div className="row py-2">
                                        <div className="col-md-6">
                                            <div className="mb-3 input-group">
                                                <span className="input-group-text">&#8377;</span>
                                                <input required type="number" className="form-control" aria-label="Amount (to the nearest rupees)" name="base_price" value={formData.base_price} onChange={HandleChangeAddRoom} placeholder="Price per room" />
                                                <span className="input-group-text">.00</span>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="mb-3">
                                                <input type='number' name='room_quantity' placeholder='Room Quantity' className='form-control' value={formData.room_quantity} onChange={HandleChangeAddRoom} />
                                            </div>


                                        </div>
                                        <div className="col-md-12">
                                            <div className="mb-3">
                                                <select className="form-select" name="category" value={formData.roomType} onChange={HandleChangeAddRoom} title="category">
                                                    <option selected>Select Room Type</option>
                                                    <option value="Premium">Premium</option>
                                                    <option value="Economy">Economy</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row text-start">
                                        <div className="col">
                                            <div className="mb-3 form-check">
                                                <input
                                                    type="checkbox"
                                                    className="form-check-input"
                                                    name="is_couple_allowed"
                                                    checked={roomForm.is_couple_allowed}
                                                    onChange={() => setRoomForm({ ...roomForm, is_couple_allowed: !roomForm.is_couple_allowed })}
                                                />
                                                <label className="form-check-label">Couple Allowed</label>
                                            </div>
                                            <div className="mb-3 form-check">
                                                <input
                                                    type="checkbox"
                                                    className="form-check-input"
                                                    name="is_tv_available"
                                                    checked={roomForm.is_tv_available}
                                                    onChange={() => setRoomForm({ ...roomForm, is_tv_available: !roomForm.is_tv_available })}
                                                />
                                                <label className="form-check-label">Is tv available</label>
                                            </div>
                                            <div className="mb-3 form-check">
                                                <input
                                                    type="checkbox"
                                                    className="form-check-input"
                                                    name="can_locals_stay"
                                                    checked={roomForm.can_locals_stay}
                                                    onChange={() => setRoomForm({ ...roomForm, can_locals_stay: !roomForm.can_locals_stay })}
                                                />
                                                <label className="form-check-label">Locals Can Stay</label>
                                            </div>
                                            <div className="mb-3 form-check">
                                                <input
                                                    type="checkbox"
                                                    className="form-check-input"
                                                    name="should_coupon_applied"
                                                    checked={roomForm.should_coupon_applied}
                                                    onChange={() => setRoomForm({ ...roomForm, should_coupon_applied: !roomForm.should_coupon_applied })}
                                                />
                                                <label className="form-check-label">Apply Coupon</label>
                                            </div>
                                        </div>
                                        {/* <div className="col"></div> */}

                                        <div className="col-6 gap-2">
                                            <div className="mb-3 form-check">
                                                <input
                                                    type="checkbox"
                                                    className="form-check-input"
                                                    name="is_wifi_available"
                                                    checked={roomForm.is_wifi_available}
                                                    onChange={() => setRoomForm({ ...roomForm, is_wifi_available: !roomForm.is_wifi_available })}
                                                />
                                                <label className="form-check-label">Wi-Fi Available</label>
                                            </div>
                                            <div className="mb-3 form-check">
                                                <input
                                                    type="checkbox"
                                                    className="form-check-input"
                                                    name="is_wifi_available"
                                                    checked={roomForm.is_parking_available}
                                                    onChange={() => setRoomForm({ ...roomForm, is_parking_available: !roomForm.is_parking_available })}
                                                />
                                                <label className="form-check-label">Is parking available</label>
                                            </div>
                                            <div className="mb-3 form-check">
                                                <input
                                                    type="checkbox"
                                                    className="form-check-input"
                                                    name="is_wifi_available"
                                                    checked={roomForm.is_ac_available}
                                                    onChange={() => setRoomForm({ ...roomForm, is_ac_available: !roomForm.is_ac_available })}
                                                />
                                                <label className="form-check-label">Is ac available</label>
                                            </div>
                                            <div className="mb-3 form-check">
                                                <input
                                                    type="checkbox"
                                                    className="form-check-input"
                                                    name="is_wifi_available"
                                                    checked={roomForm.is_housekeeping_available}
                                                    onChange={() => setRoomForm({ ...roomForm, is_housekeeping_available: !roomForm.is_housekeeping_available })}
                                                />
                                                <label className="form-check-label">Is housekeeping available</label>
                                            </div>
                                        </div>
                                    </div>
                                    <hr />
                                    <div className="row text-start">
                                        <div className="col">
                                            <div className="mb-3 form-check">
                                                <input
                                                    type="checkbox"
                                                    className="form-check-input"
                                                    name="is_pets_allowed"
                                                    checked={roomForm.is_pets_allowed}
                                                    onChange={() => setRoomForm({ ...roomForm, is_pets_allowed: !roomForm.is_pets_allowed })}
                                                />
                                                <label className="form-check-label">Is pets allowed</label>
                                            </div>

                                        </div>

                                        <div className="col">
                                            <div className="mb-3 form-check">
                                                <input
                                                    type="checkbox"
                                                    className="form-check-input"
                                                    name="is_smoking_allowed"
                                                    checked={roomForm.is_smoking_allowed}
                                                    onChange={() => setRoomForm({ ...roomForm, is_smoking_allowed: !roomForm.is_smoking_allowed })}
                                                />
                                                <label className="form-check-label">Is smoking allowed</label>
                                            </div>
                                        </div>


                                    </div>
                                    <div className="row mb-3">
                                        <div className="col text-end">
                                            <button className='btn btn-success' onClick={handleAddRoom} type='submit' >Add room</button>
                                        </div>
                                    </div>
                                </form>
                                {room.length > 0 &&
                                    <div className="container">
                                        <div className="row text-dark">
                                            <div className="col">
                                                <strong> Category</strong>
                                            </div>
                                            <div className="col">
                                                <strong> Price</strong>
                                            </div>
                                            <div className="col">
                                                <strong> Features</strong>
                                            </div>
                                        </div>
                                        {room.map((item, index) => (
                                            <div key={index} className="row  p-2 my-1 rounded-2 bg-light shadow-lg">
                                                <div className="col">
                                                    <span>{item.category}</span>
                                                </div>
                                                <div className="col">
                                                    <span>{item.base_price}</span>
                                                </div>
                                                <div className="col d-flex justify-content-evenly">
                                                    <span>
                                                        {item.is_ac_available || item.is_couple_allowed || item.is_wifi_available || item.is_housekeeping_available
                                                            ? '1+'
                                                            : null
                                                        }
                                                    </span>

                                                    <span className='mx-2' onClick={() => handleDelete(index)}><i class="bi bi-x-square text-danger"></i></span>
                                                </div>
                                            </div>
                                        ))}

                                    </div>}
                            </div>
                            <div className="row mt-4 px-4">
                                <div className="mb-3 text-start form-check x-5">
                                    <TermsAndCond lgShow={lgShow} setLgShow={setLgShow} Agree={Agree} data={Terms?.Terms_and_Conditions_homestay} />
                                    <input
                                        required
                                        type="checkbox"
                                        className="form-check-input"
                                        name="accepted_t_c"
                                        checked={formData.checked}
                                        disabled
                                        id="exampleCheck1"
                                    />
                                    <label onClick={() => setLgShow(true)} style={{ color: '', opacity: "1", cursor: 'pointer' }} className="form-check-label text-primary" htmlFor="exampleCheck1">Accept terms & conditions</label><br />
                                    {error && <small className="error-message text-danger">{error}</small>}
                                </div>
                            </div>
                            <button type="submit" className="card-link mt-1 btn btn-success w-50">Submit</button>
                        </div>
                    </div>


                </div>
            </form>
            <ToastContainer />
        </div>
    )
}
