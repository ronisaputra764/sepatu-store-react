import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { customAlphabet } from "nanoid";

export default function Payment({ shoes }) {

    const navigate = useNavigate();

    const { id } = useParams();
    const shoe = shoes.find((shoe) => shoe.id === id);

    const [booking, setBooking] = useState(null);

    const nanoid = customAlphabet('0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ', 5);

    useEffect(() => {
        const bookingData = sessionStorage.getItem('bookingData');
        if (bookingData) {
            const parsedData = JSON.parse(bookingData); // Konversi string JSON ke objek
            setBooking(parsedData);
        }
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();

        const transactionCode = `SS${nanoid()}`;
        const checkOutDate = new Date().toLocaleString();

        const bookingData = {
            transactionCode,
            checkOutDate,
            shoeName: booking.shoeName,
            shoeId: booking.shoeId,
            shoeSize: booking?.shoeSize,
            name: booking?.name,
            email: booking?.email,
            quantity: booking?.quantity,
            promoCode: booking?.promoCode,
            totalPrice: booking?.totalPrice,
            address: booking?.address,
            phone: booking?.phone,
            city: booking?.city,
            postCode: booking?.postCode,
        };

        sessionStorage.setItem('bookingData', JSON.stringify(bookingData));

        // alert(JSON.stringify(bookingData, null, 2));

        navigate(`/order-finished/${id}`);
    };

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

    const subTotal = booking ? shoe.price * booking.quantity : 0;
    const tax = subTotal * 0.11; // Pajak 11%
    const grandTotal = subTotal + tax;

    return (
        <>
            <form onSubmit={handleSubmit} className="relative flex flex-col w-full max-w-[640px] min-h-screen gap-5 mx-auto bg-[#F5F5F0]">
                <div id="top-bar" className="flex justify-between items-center px-4 mt-[60px]">
                    <Link to={`/customer-data/${id}`}>
                        <img src="../assets/images/icons/back.svg" className="w-10 h-10" alt="icon" />
                    </Link>
                    <p className="font-bold text-lg leading-[27px]">Review & Payment</p>
                    <div className="dummy-btn w-10"></div>
                </div>

                {/* Your Order Section */}
                <section id="your-order" className="accordion flex flex-col rounded-[20px] p-4 pb-5 gap-5 mx-4 bg-white overflow-hidden transition-all duration-300 has-[:checked]:!h-[66px]">
                    <label className="group flex items-center justify-between">
                        <h2 className="font-bold text-xl leading-[30px]">Your Order</h2>
                        <img src="../assets/images/icons/arrow-up.svg" className="w-7 h-7 transition-all duration-300 group-has-[:checked]:rotate-180" alt="icon" />
                        <input type="checkbox" className="hidden" />
                    </label>
                    <div className="flex items-center gap-[14px]">
                        <div className="flex shrink-0 w-20 h-20 rounded-[20px] bg-[#D9D9D9] p-1 overflow-hidden">
                            <img src={`../assets/images/thumbnails/${shoe.photo[0]}`} className="w-full h-full object-contain" alt="" />
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
                </section>

                {/* Customer Section */}
                <section id="customer" className="accordion flex flex-col rounded-[20px] p-4 pb-5 gap-5 mx-4 bg-white overflow-hidden transition-all duration-300 has-[:checked]:!h-[66px]">
                    <label className="group flex items-center justify-between">
                        <h2 className="font-bold text-xl leading-[30px]">Customer</h2>
                        <img src="../assets/images/icons/arrow-up.svg" className="w-7 h-7 transition-all duration-300 group-has-[:checked]:rotate-180" alt="icon" />
                        <input type="checkbox" className="hidden" />
                    </label>
                    <div className="flex items-center gap-5">
                        <img src="../assets/images/icons/user.svg" className="w-6 h-6 flex shrink-0" alt="icon" />
                        <div className="flex flex-col gap-[6px]">
                            <p className="font-semibold">Name</p>
                            <p className="font-bold">{booking?.name}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-5">
                        <img src="../assets/images/icons/call.svg" className="w-6 h-6 flex shrink-0" alt="icon" />
                        <div className="flex flex-col gap-[6px]">
                            <p className="font-semibold">Phone No.</p>
                            <p className="font-bold">{booking?.phone}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-5">
                        <img src="../assets/images/icons/sms.svg" className="w-6 h-6 flex shrink-0" alt="icon" />
                        <div className="flex flex-col gap-[6px]">
                            <p className="font-semibold">Email</p>
                            <p className="font-bold">{booking?.email}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-5">
                        <img src="../assets/images/icons/house-2.svg" className="w-6 h-6 flex shrink-0" alt="icon" />
                        <div className="flex flex-col gap-[6px]">
                            <p className="font-semibold">Delivery to</p>
                            <p className="font-bold">{booking?.address}, {booking?.postCode}, {booking?.city}</p>
                        </div>
                    </div>
                </section>

                {/* Payment Details Section */}
                <section id="payment-details" className="accordion flex flex-col rounded-[20px] p-4 pb-5 gap-5 mx-4 bg-white overflow-hidden transition-all duration-300 has-[:checked]:!h-[66px]">
                    <label className="group flex items-center justify-between">
                        <h2 className="font-bold text-xl leading-[30px]">Payment Details</h2>
                        <img src="../assets/images/icons/arrow-up.svg" className="w-7 h-7 transition-all duration-300 group-has-[:checked]:rotate-180" alt="icon" />
                        <input type="checkbox" className="hidden" />
                    </label>
                    <div className="flex items-center justify-between">
                        <p className="font-semibold">Sub Total</p>
                        <p className="font-bold">{formatRupiah(subTotal)}</p>
                    </div>
                    <div className="flex items-center justify-between">
                        <p className="font-semibold">Promo Code</p>
                        <p className="font-bold">{booking?.promoCode}</p>
                    </div>
                    <div className="flex items-center justify-between">
                        <p className="font-semibold">Discount</p>
                        <p className="font-bold text-[#FF1943]">- Rp 0</p>
                    </div>
                    <div className="flex items-center justify-between">
                        <p className="font-semibold">PPN 11%</p>
                        <p className="font-bold">{formatRupiah(tax)}</p>
                    </div>
                    <div className="flex items-center justify-between">
                        <p className="font-semibold">Delivery</p>
                        <p className="font-bold">Rp 0</p>
                    </div>
                    <div className="flex items-center justify-between">
                        <p className="font-semibold">Grand Total</p>
                        <p className="font-bold text-2xl leading-9 text-[#07B704]">{formatRupiah(grandTotal)}</p>
                    </div>
                </section>

                {/* Send Payment to Section */}
                <section id="send-payment-to" className="accordion flex flex-col rounded-[20px] p-4 pb-5 gap-5 mx-4 bg-white overflow-hidden transition-all duration-300 has-[:checked]:!h-[66px]">
                    <label className="group flex items-center justify-between">
                        <h2 className="font-bold text-xl leading-[30px]">Send Payment to</h2>
                        <img src="../assets/images/icons/arrow-up.svg" className="w-7 h-7 transition-all duration-300 group-has-[:checked]:rotate-180" alt="icon" />
                        <input type="checkbox" className="hidden" />
                    </label>
                    <div className="flex items-center gap-3">
                        <div className="flex shrink-0 w-[71px] h-[50px] overflow-hidden">
                            <img src="../assets/images/logos/bca-bank-central-asia 1.svg" className="w-full h-full object-contain" alt="bank logo" />
                        </div>
                        <div className="flex flex-col gap-[2px]">
                            <p className="font-semibold flex items-center">Roni saputra <img src="../assets/images/icons/verify.svg" className="ml-1" alt="icon" /></p>
                            <p>8008129839</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="flex shrink-0 w-[71px] h-[50px] overflow-hidden">
                            <img src="../assets/images/logos/bank-mandiri 1.svg" className="w-full h-full object-contain" alt="bank logo" />
                        </div>
                        <div className="flex flex-col gap-[2px]">
                            <p className="font-semibold flex items-center">Roni saputra<img src="../assets/images/icons/verify.svg" className="ml-1" alt="icon" /></p>
                            <p>12379834983281</p>
                        </div>
                    </div>
                    <hr className="border-[#EAEAED]" />
                    <div className="flex flex-col gap-2">
                        <p className="font-semibold">Bukti Transfer</p>
                        <div className="group w-full rounded-full px-[14px] flex items-center ring-1 ring-[#090917] gap-[10px] relative transition-all duration-300 focus-within:ring-2 focus-within:ring-[#FFC700]">
                            <div className="w-6 h-6 flex shrink-0">
                                <img src="../assets/images/icons/security-card.svg" alt="icon" />
                            </div>
                            <button type="button" id="Upload-btn" className="appearance-none outline-none w-full py-[14px] text-left text-sm overflow-hidden text-[#878785]">
                                Add an attachment
                            </button>
                            <input type="file" name="proof" id="Proof" className="absolute left-0 hover:cursor-pointer opacity-0 border-[1px] py-[14px] w-full rounded-full" />
                        </div>
                    </div>
                    <hr className="border-[#EAEAED]" />
                    <div className="flex items-center gap-[10px]">
                        <img src="../assets/images/icons/shield-tick.svg" className="w-8 h-8 flex shrink-0" alt="icon" />
                        <p className="leading-[26px]">Kami melindungi data privasi anda dengan baik bantuan Angga X.</p>
                    </div>
                </section>

                {/* Bottom Navigation */}
                <div id="bottom-nav" className="relative flex h-[100px] w-full shrink-0 mt-5">
                    <div className="fixed bottom-5 w-full max-w-[640px] z-30 px-4">
                        <div className="flex items-center justify-between rounded-full bg-[#2A2A2A] p-[10px] pl-6">
                            <div className="flex flex-col gap-[2px] mr-2">
                                <p className="text-white">Apakah anda sudah benar membayar?</p>
                            </div>
                            <button type="submit" className="rounded-full p-[12px_20px] bg-[#C5F277] font-bold text-nowrap">
                                Confirm Now
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        </>
    );
};