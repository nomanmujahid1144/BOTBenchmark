import { TopHeader } from "../../minor-components/top-heading-for-contact-pricing-etc/TopHeader"
import Pricify from '@chargebee/atomicpricing';
import { useEffect } from 'react';

export const Pricing = () => {

    useEffect(() => {
        Pricify.init();
      }, []);
    
    return (
        <main className="bg_color_1">
            <section className="hero_single general">
                <TopHeader
                    headding="Pricing"
                />
            </section>
            {/* <div className="container margin_tabs">
                <div id="tabs" className="tabs">
                    <nav>
                        <ul>
                        <li>
                            <a href="#section-1">
                            <i className="pe-7s-paper-plane" />
                            Standard<em>Omnis justo gloriatur et sit</em>
                            </a>
                        </li>
                        <li>
                            <a href="#section-2">
                            <i className="pe-7s-plane" />
                            Extended<em>Quo corrumpit euripidis</em>
                            </a>
                        </li>
                        <li>
                            <a href="#section-3">
                            <i className="pe-7s-rocket" />
                            Premium<em>Constituto deterruisset</em>
                            </a>
                        </li>
                        </ul>
                    </nav>
                    <div className="content">
                        <section id="section-1" style={{display: 'block'}}>
                            <div className="row d-flex justify-content-center">
                                <div className="col-lg-4">
                                    <div className="box_pricing">
                                        <h4>1 Month</h4>
                                        <p>
                                        Eos tollit ancillae ea, lorem consulatu qui ne, eu eros eirmod
                                        scaevola sea. Et nec tantas accusamus salutatus, sit commodo
                                        veritus te, erat legere fabulas has ut.
                                        </p>
                                        <ul>
                                        <li>
                                            <strong>Lorem</strong> consulatu qui ne
                                        </li>
                                        <li>
                                            <strong>Erat legere</strong> fabulas has ut
                                        </li>
                                        <li>
                                            <strong>Constituto</strong> deterruisset
                                        </li>
                                        <li>
                                            <strong>Omnis</strong> justo gloriatur
                                        </li>
                                        </ul>
                                        <hr />
                                        <div className="price">
                                        <sup>$</sup>9.99<em>/mo</em>
                                        </div>
                                        <a href="register.html">Create Account</a>
                                    </div>
                                </div>
                                <div className="col-lg-4">
                                    <div className="box_pricing">
                                        <h4>12 Months</h4>
                                        <p>
                                        Eos tollit ancillae ea, lorem consulatu qui ne, eu eros eirmod
                                        scaevola sea. Et nec tantas accusamus salutatus, sit commodo
                                        veritus te, erat legere fabulas has ut.
                                        </p>
                                        <ul>
                                        <li>
                                            <strong>Lorem</strong> consulatu qui ne
                                        </li>
                                        <li>
                                            <strong>Erat legere</strong> fabulas has ut
                                        </li>
                                        <li>
                                            <strong>Constituto</strong> deterruisset
                                        </li>
                                        <li>
                                            <strong>Omnis</strong> justo gloriatur
                                        </li>
                                        </ul>
                                        <hr />
                                        <div className="price">
                                        <sup>$</sup>99.99<em>/year</em>
                                        </div>
                                        <a href="register.html">Create Account</a>
                                    </div>
                                </div>
                            </div>
                        </section>
                        <section id="section-2">
                        <div className="row">
                            <div className="col-lg-4">
                            <div className="box_pricing">
                                <h4>1 Month</h4>
                                <p>
                                Diam timeam iracundia eu per, vide error id nec, est veniam
                                equidem nonumes in. Has offendit oportere ea. Errem denique
                                corpora ut vis, veniam fierent recteque vim no, in oblique
                                forensibus accommodare cum.
                                </p>
                                <ul>
                                <li>
                                    <strong>Lorem</strong> consulatu qui ne
                                </li>
                                <li>
                                    <strong>Erat legere</strong> fabulas has ut
                                </li>
                                <li>
                                    <strong>Constituto</strong> deterruisset
                                </li>
                                <li>
                                    <strong>Omnis</strong> justo gloriatur
                                </li>
                                </ul>
                                <hr />
                                <div className="price">
                                <sup>$</sup>45<em>/mo</em>
                                </div>
                                <a href="register.html">Create Account</a>
                            </div>
                            </div>
                            <div className="col-lg-4">
                            <div className="box_pricing">
                                <h4>6 Months</h4>
                                <p>
                                Diam timeam iracundia eu per, vide error id nec, est veniam
                                equidem nonumes in. Has offendit oportere ea. Errem denique
                                corpora ut vis, veniam fierent recteque vim no, in oblique
                                forensibus accommodare cum.
                                </p>
                                <ul>
                                <li>
                                    <strong>Lorem</strong> consulatu qui ne
                                </li>
                                <li>
                                    <strong>Erat legere</strong> fabulas has ut
                                </li>
                                <li>
                                    <strong>Constituto</strong> deterruisset
                                </li>
                                <li>
                                    <strong>Omnis</strong> justo gloriatur
                                </li>
                                </ul>
                                <hr />
                                <div className="price">
                                <sup>$</sup>125<em>/6 months</em>
                                </div>
                                <a href="#">Create Account</a>
                            </div>
                            </div>
                            <div className="col-lg-4">
                            <div className="box_pricing">
                                <div className="ribbon">
                                <span className="top_selling">Top selling</span>
                                </div>
                                <h4>12 Months</h4>
                                <p>
                                Diam timeam iracundia eu per, vide error id nec, est veniam
                                equidem nonumes in. Has offendit oportere ea. Errem denique
                                corpora ut vis, veniam fierent recteque vim no, in oblique
                                forensibus accommodare cum.
                                </p>
                                <ul>
                                <li>
                                    <strong>Lorem</strong> consulatu qui ne
                                </li>
                                <li>
                                    <strong>Erat legere</strong> fabulas has ut
                                </li>
                                <li>
                                    <strong>Constituto</strong> deterruisset
                                </li>
                                <li>
                                    <strong>Omnis</strong> justo gloriatur
                                </li>
                                </ul>
                                <hr />
                                <div className="price">
                                <sup>$</sup>140<em>/year</em>
                                </div>
                                <a href="register.html">Create Account</a>
                            </div>
                            </div>
                        </div>
                        </section>
                        <section id="section-3">
                        <div className="row">
                            <div className="col-lg-4">
                            <div className="box_pricing">
                                <div className="ribbon">
                                <span className="top_selling">Top selling</span>
                                </div>
                                <h4>1 Month</h4>
                                <p>
                                Iriure nostrud dignissim id vix, et velit soluta mei. Velit
                                labore intellegat ad mel, ullum nobis quo in, rebum nihil
                                malorum vix ex.
                                </p>
                                <ul>
                                <li>
                                    <strong>Lorem</strong> consulatu qui ne
                                </li>
                                <li>
                                    <strong>Erat legere</strong> fabulas has ut
                                </li>
                                <li>
                                    <strong>Constituto</strong> deterruisset
                                </li>
                                <li>
                                    <strong>Omnis</strong> justo gloriatur
                                </li>
                                </ul>
                                <hr />
                                <div className="price">
                                <sup>$</sup>45<em>/mo</em>
                                </div>
                                <a href="register.html">Create Account</a>
                            </div>
                            </div>
                            <div className="col-lg-4">
                            <div className="box_pricing">
                                <h4>6 Months</h4>
                                <p>
                                Iriure nostrud dignissim id vix, et velit soluta mei. Velit
                                labore intellegat ad mel, ullum nobis quo in, rebum nihil
                                malorum vix ex.
                                </p>
                                <ul>
                                <li>
                                    <strong>Lorem</strong> consulatu qui ne
                                </li>
                                <li>
                                    <strong>Erat legere</strong> fabulas has ut
                                </li>
                                <li>
                                    <strong>Constituto</strong> deterruisset
                                </li>
                                <li>
                                    <strong>Omnis</strong> justo gloriatur
                                </li>
                                </ul>
                                <hr />
                                <div className="price">
                                <sup>$</sup>140<em>/6 months</em>
                                </div>
                                <a href="register.html">Create Account</a>
                            </div>
                            </div>
                            <div className="col-lg-4">
                            <div className="box_pricing">
                                <h4>12 Months</h4>
                                <p>
                                Iriure nostrud dignissim id vix, et velit soluta mei. Velit
                                labore intellegat ad mel, ullum nobis quo in, rebum nihil
                                malorum vix ex.
                                </p>
                                <ul>
                                <li>
                                    <strong>Lorem</strong> consulatu qui ne
                                </li>
                                <li>
                                    <strong>Erat legere</strong> fabulas has ut
                                </li>
                                <li>
                                    <strong>Constituto</strong> deterruisset
                                </li>
                                <li>
                                    <strong>Omnis</strong> justo gloriatur
                                </li>
                                </ul>
                                <hr />
                                <div className="price">
                                <sup>$</sup>210<em>/year</em>
                                </div>
                                <a href="register.html">Create Account</a>
                            </div>
                            </div>
                        </div>
                        </section>
                    </div>
                    

                </div>
            </div> */}
            <div id="pricify-hosted-pricing-page"
                data-pricify-site="01H854RDJ9A82QNFE0X1HQ65AT"
                data-pricify-pricingpage="01H854RE2KDSH637DX1T63DD4D"
                data-pricify-viewport-defaultheight="795.1875px">    
            </div>
        </main>
    )
}