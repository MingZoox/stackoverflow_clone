import "./Footer.scss";

function Footer() {
    return (
        <div className="footer">
            <div className="footer__logo">
                <svg width="32" height="37">
                    <path d="M26 33v-9h4v13H0V24h4v9h22Z" fill="#BCBBBB" />
                    <path
                        d="m21.5 0-2.7 2 9.9 13.3 2.7-2L21.5 0ZM26 18.4 13.3 7.8l2.1-2.5 12.7 10.6-2.1 2.5ZM9.1 15.2l15 7 1.4-3-15-7-1.4 3Zm14 10.79.68-2.95-16.1-3.35L7 23l16.1 2.99ZM23 30H7v-3h16v3Z"
                        fill="#F48024"
                    />
                </svg>
            </div>
            <div className="footer__stack">
                <div className="title">Stack overflow</div>
                <a href="/">Questions</a>
                <a href="/">Help</a>
            </div>
            <div className="footer__product">
                <div className="title">Products</div>
                <a href="/">Teams</a>
                <a href="/">Advertising</a>
                <a href="/">Collectives</a>
            </div>
            <div className="footer__company">
                <div className="title">Company</div>
                <a href="/">About</a>
                <a href="/">Privacy Policy</a>
                <a href="/">Terms of Service</a>
                <a href="/">Contact Us</a>
            </div>
            <div className="footer__copyright">
                <a href="/">Blog</a>
                <a href="/">Facebook</a>
                <a href="/">Twitter</a>
                <p>
                    Site design / logo © 2022 Stack Exchange Inc; user
                    contributions licensed under cc by-sa. rev 2022.4.19.41984
                </p>
            </div>
        </div>
    );
}

export default Footer;
