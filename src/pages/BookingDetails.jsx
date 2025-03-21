import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

export default function BookingDetails({ shoes }) {

    const { id } = useParams();
    const shoe = shoes.find((shoe) => shoe.id === id);

    const [booking, setBooking] = useState(null);


    useEffect(() => {
        const bookingData = sessionStorage.getItem('bookingData');
        if (bookingData) {
            const parsedData = JSON.parse(bookingData); // Konversi string JSON ke objek
            setBooking(parsedData);
        }
    }, []);


    function formatRupiah(amount) {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
        }).format(amount);
    }

    const accordions = document.querySelectorAll('.accordion');

    accordions.forEach(accordion => {
        const height = accordion.scrollHeight;
        accordion.style.height = `${height}px`;
    });

    return (
        <>
            <div className="relative flex flex-col w-full max-w-[640px] min-h-screen gap-5 mx-auto bg-[#F5F5F0]">
                {/* Top Bar */}
                <div id="top-bar" className="flex justify-between items-center px-4 mt-[60px]">
                    <Link to={`/`}>
                        <img src="/assets/images/icons/back.svg" className="w-10 h-10" alt="icon" />
                    </Link>
                    <p className="font-bold text-lg leading-[27px]">Booking Details</p>
                    <div className="dummy-btn w-10"></div>
                </div>

                {/* Your Order Section */}
                <section className="accordion flex flex-col rounded-[20px] p-4 pb-5 gap-5 mx-4 bg-white overflow-hidden transition-all duration-300 has-[:checked]:!h-[66px]">
                    <label className="group flex items-center justify-between">
                        <h2 className="font-bold text-xl leading-[30px]">Your Order</h2>
                        <img src="/assets/images/icons/arrow-up.svg" className="w-7 h-7 transition-all duration-300 group-has-[:checked]:rotate-180" alt="icon" />
                        <input type="checkbox" className="hidden" />
                    </label>
                    <div className="flex items-center gap-[14px]">
                        <div className="flex shrink-0 w-20 h-20 rounded-[20px] bg-[#D9D9D9] p-1 overflow-hidden">
                            <img src={`/assets/images/thumbnails/${shoe.photo[0]}`} className="w-full h-full object-contain" alt="" />
                        </div>
                        <h3 className="font-bold text-lg leading-6">{shoe.name}</h3>
                    </div>
                    <hr className="border-[#EAEAED]" />
                    <div className="flex items-center justify-between">
                        <p className="font-semibold">Brand</p>
                        <p className="font-bold">{shoe.brand}</p>
                    </div>
                    <div className="flex items-center justify-between">
                        <p className="font-semibold">Price</p>
                        <p className="font-bold">{formatRupiah(shoe.price)}</p>
                    </div>
                    <div className="flex items-center justify-between">
                        <p className="font-semibold">Quantity</p>
                        <p className="font-bold">{booking?.quantity} Pcs</p>
                    </div>
                    <div className="flex items-center justify-between">
                        <p className="font-semibold">Shoe Size</p>
                        <p className="font-bold">{booking?.shoeSize}</p>
                    </div>
                    <div className="flex items-center justify-between">
                        <p className="font-semibold">Grand Total</p>
                        <p className="font-bold text-2xl leading-9 text-[#07B704]">{formatRupiah(booking?.totalPrice)}</p>
                    </div>
                    <div className="flex items-center justify-between">
                        <p className="font-semibold">Checkout At</p>
                        <p className="font-bold">{booking?.checkOutDate}</p>
                    </div>
                    <div className="flex items-center justify-between">
                        <p className="font-semibold">Status</p>
                        <p className="rounded-full p-[6px_14px] bg-[#2A2A2A] font-bold text-sm leading-[21px] text-white">PENDING</p>
                    </div>
                </section>

                {/* Customer Section */}
                <section className="accordion flex flex-col rounded-[20px] p-4 pb-5 gap-5 mx-4 bg-white overflow-hidden transition-all duration-300 has-[:checked]:!h-[66px] mb-10">
                    <label className="group flex items-center justify-between">
                        <h2 className="font-bold text-xl leading-[30px]">Customer</h2>
                        <img src="/assets/images/icons/arrow-up.svg" className="w-7 h-7 transition-all duration-300 group-has-[:checked]:rotate-180" alt="icon" />
                        <input type="checkbox" className="hidden" />
                    </label>
                    <div className="flex items-center gap-5">
                        <img src="/assets/images/icons/delivery.svg" className="w-6 h-6 flex shrink-0" alt="icon" />
                        <div className="flex flex-col gap-[6px]">
                            <p className="font-semibold">Booking ID</p>
                            <p className="font-bold">{booking?.transactionCode}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-5">
                        <img src="/assets/images/icons/user.svg" className="w-6 h-6 flex shrink-0" alt="icon" />
                        <div className="flex flex-col gap-[6px]">
                            <p className="font-semibold">Name</p>
                            <p className="font-bold">{booking?.name}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-5">
                        <img src="/assets/images/icons/call.svg" className="w-6 h-6 flex shrink-0" alt="icon" />
                        <div className="flex flex-col gap-[6px]">
                            <p className="font-semibold">Phone No.</p>
                            <p className="font-bold">{booking?.phone}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-5">
                        <img src="/assets/images/icons/sms.svg" className="w-6 h-6 flex shrink-0" alt="icon" />
                        <div className="flex flex-col gap-[6px]">
                            <p className="font-semibold">Email</p>
                            <p className="font-bold">{booking?.email}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-5">
                        <img src="/assets/images/icons/house-2.svg" className="w-6 h-6 flex shrink-0" alt="icon" />
                        <div className="flex flex-col gap-[6px]">
                            <p className="font-semibold">Delivery to</p>
                            <p className="font-bold">{booking?.address}, {booking?.city}, {booking?.postCode}</p>
                        </div>
                    </div>
                    <hr className="border-[#EAEAED]" />
                    <a href="#" className="rounded-full p-[12px_20px] text-center w-full bg-[#C5F277] font-bold">Call Customer Service</a>
                    <hr className="border-[#EAEAED]" />
                    <div className="flex items-center gap-[10px]">
                        <img src="/assets/images/icons/shield-tick.svg" className="w-8 h-8 flex shrink-0" alt="icon" />
                        <p className="leading-[26px]">Kami melindungi data privasi anda dengan baik bantuan Angga X.</p>
                    </div>
                </section>
            </div>
        </>
    );
}