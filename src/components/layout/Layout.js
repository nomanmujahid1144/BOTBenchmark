import { Footer } from "../ui/major-components/footer/Footer";
import { Navbar } from "../ui/major-components/nav/Navbar";
import { NewsLetter } from "../ui/minor-components/newsletter/NewsLetter";
import { Outlet, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
function Layout(props) {
    
    const params = useLocation();
    const [isAuth, setIsAuth] = useState(true);

    

    useEffect(() => {
        const excludedRoutes = ['/register', '/login', '/reset-password', '/confirm-password'];
        const isExcludedRoute = excludedRoutes.some((route) => params.pathname.startsWith(route));

        setIsAuth(!isExcludedRoute);
    }, [params.pathname]);

    return (
        <>
            {/* {isAuth   ? (<Navbar />) : null}
                <main >{props.children}</main>
                {isAuth ?
                <>
                        <Outlet />
                        <Footer />
                    </>
                : null} */}
            
            <Navbar />
            <Outlet />
            <Footer />
        </>
    )
}

export default Layout;