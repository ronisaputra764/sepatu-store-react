import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

export default function Category({ categories, shoes }) {

    const { slug } = useParams();
    const category = categories.find((category) => category.slug === slug);
    const filteredShoes = shoes.filter((shoe) => shoe.category_id === category.id);

    return (
        <div className="relative flex flex-col w-full max-w-[640px] min-h-screen gap-5 mx-auto bg-[#F5F5F0]">
            <div id="top-bar" className="flex justify-between items-center px-4 mt-[60px]">
                <Link to={'/'}>
                    <img src={"../assets/images/icons/back.svg"} className="w-10 h-10" alt="icon" />
                </Link>
                <p className="font-bold text-lg leading-[27px]">Category</p>
                <div className="dummy-btn w-10"></div>
            </div>
            <div className="px-4">
                <div className="flex items-center justify-between w-full rounded-2xl overflow-hidden bg-white">
                    <div className="flex flex-col gap-[2px] px-[30px] pr-4">
                        <h3 className="font-bold text-[22px] leading-[33px]">{category.name}</h3>
                        <p className="text-[#878785]">6,223 Shoes</p>
                    </div>
                    <div className="flex shrink-0 w-[140px] h-[120px] overflow-hidden">
                        <img src={`../assets/images/thumbnails/${category.icon}`} className="w-full h-full object-cover object-left" alt="thumbnail" />
                    </div>
                </div>
            </div>
            <section id="fresh" className="flex flex-col gap-4 px-4 mb-[111px]">
                <div className="flex items-center justify-between">
                    <h2 className="font-bold leading-[20px]">Fresh From <br />Great Designers</h2>
                    <a href="#" className="rounded-full p-[6px_14px] border border-[#2A2A2A] text-xs leading-[18px]">
                        View All
                    </a>
                </div>
                <div className="flex flex-col gap-4">

                    <div className="flex flex-col gap-4">

                        {filteredShoes.length > 0 ? (
                            filteredShoes.map((itemShoe) => (
                                <a href="details.html" key={itemShoe.id}>
                                    <div className="flex items-center rounded-3xl p-[10px_16px_16px_10px] gap-[14px] bg-white transition-all duration-300 hover:ring-2 hover:ring-[#FFC700]" >
                                        <div className="w-20 h-20 flex shrink-0 rounded-2xl bg-[#D9D9D9] overflow-hidden">
                                            <img src={`../assets/images/thumbnails/${itemShoe.thumbnail}`} className="w-full h-full object-cover" alt="thumbnail" />
                                        </div>
                                        <div className="flex w-full items-center justify-between gap-[14px]">
                                            <div className="flex flex-col gap-[6px]">
                                                <h3 className="font-bold leading-[20px]">{itemShoe.name}</h3>
                                                <p className="text-sm leading-[21px] text-[#878785]">{category.name}</p>
                                            </div>
                                            <div className="flex flex-col gap-1 items-end shrink-0">
                                                <div className="flex">
                                                    <img src="../assets/images/icons/Star 1.svg" className="w-[18px] h-[18px] flex shrink-0" alt="star" />
                                                    <img src="../assets/images/icons/Star 1.svg" className="w-[18px] h-[18px] flex shrink-0" alt="star" />
                                                    <img src="../assets/images/icons/Star 1.svg" className="w-[18px] h-[18px] flex shrink-0" alt="star" />
                                                    <img src="../assets/images/icons/Star 1.svg" className="w-[18px] h-[18px] flex shrink-0" alt="star" />
                                                    <img src="../assets/images/icons/Star 1.svg" className="w-[18px] h-[18px] flex shrink-0" alt="star" />
                                                </div>
                                                <p className="font-semibold text-sm leading-[21px]">4.5</p>
                                            </div>
                                        </div>
                                    </div>
                                </a>
                            ))
                        ) : (<p>There is no item yet</p>)}

                    </div>

                </div>
            </section>
        </div>
    );
}