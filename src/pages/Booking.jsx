import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';

export default function Booking({ shoes }) {

    const { id } = useParams();
    const shoe = shoes.find((shoe) => shoe.id === id);
    const navigate = useNavigate();

    // State untuk mengelola input form
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [quantity, setQuantity] = useState(1);
    const [promoCode, setPromoCode] = useState('');
    const [selectedSize, setSelectedSize] = useState('');
    const [discount, setDiscount] = useState(0); // Diskon dalam rupiah
    const pricePerItem = shoe.price; // Harga per item

    useEffect(() => {
        const savedSize = sessionStorage.getItem('selectedSize');
        if (savedSize) {
            setSelectedSize(savedSize);
        }
    }, []);

    // Fungsi untuk menambah kuantitas
    const handleIncreaseQuantity = () => {
        setQuantity(prev => prev + 1);
    };

    // Fungsi untuk mengurangi kuantitas
    const handleDecreaseQuantity = () => {
        if (quantity > 1) {
            setQuantity(prev => prev - 1);
        }
    };

    // Fungsi untuk menghitung total harga
    const calculateTotal = () => {
        const subtotal = pricePerItem * quantity;
        const grandTotal = subtotal - discount;
        return { subtotal, grandTotal };
    };

    const { subtotal, grandTotal } = calculateTotal();

    const handleSubmit = (e) => {
        e.preventDefault();

        // Gabungkan data dari session storage dengan data form
        const bookingData = {
            shoeName: shoe.name,
            shoeId: shoe.id,
            shoeSize: selectedSize,
            name,
            email,
            quantity,
            promoCode,
            totalPrice: grandTotal,
        };

        sessionStorage.setItem('bookingData', JSON.stringify(bookingData));

        navigate(`/customer-data/${id}`);
    };

    function formatRupiah(amount) {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
        }).format(amount);
    }

    return (
        <div className="relative flex flex-col w-full max-w-[640px] min-h-screen gap-5 mx-auto bg-[#F5F5F0]">
            <div id="top-bar" className="flex justify-between items-center px-4 mt-[60px]">
                <Link to={`/details/${shoe.slug}`}>
                    <img src="../assets/images/icons/back.svg" className="w-10 h-10" alt="icon" />
                </Link>
                <p className="font-bold text-lg leading-[27px]">Booking</p>
                <div className="dummy-btn w-10"></div>
            </div>
            <div className="flex w-[260px] h-[160px] shrink-0 overflow-hidden mx-auto">
                <img
                    id="main-thumbnail"
                    src={`../assets/images/thumbnails/${shoe.photo[0]}`}
                    className="w-full h-full object-contain object-center"
                    alt="thumbnail"
                />
            </div>
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <div className="flex flex-col rounded-[20px] p-4 mx-4 pb-5 gap-5 bg-white">
                    <div id="info" className="flex items-center justify-between">
                        <div className="flex flex-col">
                            <h1 id="title" className="font-bold text-[22px] leading-[30px]">{shoe.name}</h1>
                            <p className="font-semibold text-lg leading-[27px]">{formatRupiah(shoe.price)} • {selectedSize}</p>
                        </div>
                        <div className="flex items-center gap-1">
                            <img src="../../assets/images/icons/Star 1.svg" className="w-[26px] h-[26px]" alt="star" />
                            <span className="font-semibold text-xl leading-[30px]">4.5</span>
                        </div>
                    </div>
                    <hr className="border-[#EAEAED]" />
                    <div className="flex flex-col gap-2">
                        <label htmlFor="name" className="font-semibold">Complete Name</label>
                        <div className="flex items-center w-full rounded-full ring-1 ring-[#090917] px-[14px] gap-[10px] overflow-hidden transition-all duration-300 focus-within:ring-2 focus-within:ring-[#FFC700]">
                            <img src="../assets/images/icons/user.svg" className="w-6 h-6 flex shrink-0" alt="icon" />
                            <input
                                type="text"
                                name="name"
                                id="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="appearance-none outline-none w-full font-semibold placeholder:font-normal placeholder:text-[#878785] py-[14px]"
                                placeholder="Type your complete name"
                                required
                            />
                        </div>
                    </div>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="email" className="font-semibold">Email Address</label>
                        <div className="flex items-center w-full rounded-full ring-1 ring-[#090917] px-[14px] gap-[10px] overflow-hidden transition-all duration-300 focus-within:ring-2 focus-within:ring-[#FFC700]">
                            <img src="../assets/images/icons/sms.svg" className="w-6 h-6 flex shrink-0" alt="icon" />
                            <input
                                type="email"
                                name="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="appearance-none outline-none w-full font-semibold placeholder:font-normal placeholder:text-[#878785] py-[14px]"
                                placeholder="Type your email address"
                                required
                            />
                        </div>
                    </div>
                    <hr className="border-[#EAEAED]" />
                    <div className="flex flex-col gap-2">
                        <p className="font-semibold">Quantity</p>
                        <div className="relative flex items-center gap-[30px]">
                            <button
                                type="button"
                                onClick={handleDecreaseQuantity}
                                className="flex w-full h-[54px] items-center justify-center rounded-full bg-[#2A2A2A] overflow-hidden"
                            >
                                <span className="font-bold text-xl leading-[30px] text-white">-</span>
                            </button>
                            <p id="quantity-display" className="font-bold text-xl leading-[30px]">{quantity}</p>
                            <input
                                type="number"
                                name="quantity"
                                id="quantity"
                                value={quantity}
                                className="sr-only -z-10"
                                readOnly
                            />
                            <button
                                type="button"
                                onClick={handleIncreaseQuantity}
                                className="flex w-full h-[54px] items-center justify-center rounded-full bg-[#C5F277] overflow-hidden"
                            >
                                <span className="font-bold text-xl leading-[30px]">+</span>
                            </button>
                        </div>
                    </div>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="promo" className="font-semibold">Promo Code</label>
                        <div className="flex items-center w-full rounded-full ring-1 ring-[#090917] px-[14px] gap-[10px] overflow-hidden transition-all duration-300 focus-within:ring-2 focus-within:ring-[#FFC700]">
                            <img src="../assets/images/icons/discount-shape.svg" className="w-6 h-6 flex shrink-0" alt="icon" />
                            <input
                                type="text"
                                name="promo"
                                id="promo"
                                value={promoCode}
                                onChange={(e) => setPromoCode(e.target.value)}
                                className="appearance-none outline-none w-full font-semibold placeholder:font-normal placeholder:text-[#878785] py-[14px]"
                                placeholder="Input the promo code"
                            />
                        </div>
                    </div>
                    <hr className="border-[#EAEAED]" />
                    <div className="flex items-center justify-between">
                        <p className="font-semibold">Sub Total</p>
                        <p id="total-price" className="font-bold">Rp {subtotal.toLocaleString()}</p>
                    </div>
                    <div className="flex items-center justify-between">
                        <p className="font-semibold">Discount</p>
                        <p id="discount" className="font-bold text-[#FF1943]">- Rp {discount.toLocaleString()}</p>
                    </div>
                    <hr className="border-[#EAEAED]" />
                    <div className="flex items-center justify-between">
                        <p className="font-semibold">Grand Total</p>
                        <p id="grand-total" className="font-bold text-[20px] leading-[30px]">Rp {grandTotal.toLocaleString()}</p>
                    </div>
                </div>
                <div id="bottom-nav" className="relative flex h-[100px] w-full shrink-0 mt-5">
                    <div className="fixed bottom-5 w-full max-w-[640px] z-30 px-4">
                        <div className="flex items-center justify-between rounded-full bg-[#2A2A2A] p-[10px] pl-6">
                            <div className="flex flex-col gap-[2px]">
                                <p id="grand-total" className="font-bold text-[20px] leading-[30px] text-white">Rp {grandTotal.toLocaleString()}</p>
                                <p className="text-sm leading-[21px] text-[#878785]">Grand total</p>
                            </div>
                            <button type="submit" className="rounded-full p-[12px_20px] bg-[#C5F277] font-bold">
                                Continue
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
};