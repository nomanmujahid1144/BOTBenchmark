import { Link } from 'react-router-dom'
import notFoundSVG from '../../../../assets/images/404.svg'

export const NotFound = () => {
    return (
        <section className="hero_single general" style={{height: '100vh'}}>
            <div className="wrapper">
                <div className="container">
                    <form>
                        <img src={notFoundSVG} alt="404" className="img-fluid" />
                        <div id="custom-search-input">
                            <div className="input-group d-flex justify-content-center">
                                <Link to={'/'}>
                                    <div
                                        className="btn_1 rounded full-width">
                                        Back to Home
                                    </div>
                                </Link>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    )
}