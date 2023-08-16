import serviceImage from '../../../../assets/images/services.jpg';
import { BreadCrumps } from '../../minor-components/bread-crumps/BreadCrumps';

export const HeroCategory = () => {
    return (
        <>
        <section style={{backgroundImage : `url(${serviceImage})`}} className="relative table w-full py-36 lg:py-44 bg-no-repeat bg-center bg-cover">
            <div className="absolute inset-0 bg-black opacity-75" />
            <div className="container relative">
                <div className="grid grid-cols-1 pb-8 text-center mt-10">
                    <h5 className="text-white/50 text-lg font-medium">All Categories</h5>
                    <h3 className="mt-2 md:text-4xl text-3xl md:leading-normal leading-normal font-medium text-white">
                            All Categories
                    </h3>
                    <div className="subcribe-form mt-6 mb-3">
                        <form className="relative max-w-xl">
                            <input
                                type="email"
                                id="subcribe"
                                name="email"
                                className="form-input border-0 py-4 pe-40 ps-6 w-full h-[50px] outline-none text-black dark:text-white rounded-full bg-white dark:bg-slate-900 shadow dark:shadow-gray-800"
                                placeholder="Your Email Address :"
                            />
                            <button
                                type="submit"
                                className="py-2 px-5 inline-block font-semibold tracking-wide border align-middle transition duration-500 ease-in-out text-base text-center absolute top-[2px] end-[3px] h-[46px] bg-orange-500 hover:bg-orange-600 border-orange-500 hover:border-orange-600 text-white rounded-full">
                                Try it for free <i className="uil uil-arrow-right" />
                            </button>
                        </form>
                    </div>
                </div>
            </div>
            <BreadCrumps />
            </section>
        </>
    )
}