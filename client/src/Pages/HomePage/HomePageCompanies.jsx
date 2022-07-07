import { useState, useEffect } from "react";

function HomePageCompanies() {
    const [indexCompany, setIndexCompany] = useState(0);

    const companies = [
        "chevron-alt.svg",
        "philips-alt.svg",
        "logitech-alt.svg",
        "overstock-alt.svg",
        "instacart-alt.svg",
        "barkbox-alt.svg",
        "wisetech-global-alt.svg",
        "microsoft-alt.svg",
        "intercom-alt.svg",
        "siemens-alt.svg",
        "bloomberg-alt.svg",
        "verizon-media-alt.svg",
    ];

    function handleClickSite(indexSite) {
        setIndexCompany(indexSite);
    }

    useEffect(() => {
        const interval = setInterval(function () {
            setIndexCompany((prevIndex) => (prevIndex + 1 === 3 ? 0 : prevIndex + 1));
        }, 3500);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="companies-used">
            <div className="companies-used__heading">
                Thousands of organizations around the globe use Stack Overflow for Teams
            </div>
            <div className="companies-used__logos">
                <img
                    src={`https://cdn.sstatic.net/Img/product/teams/logos/${
                        companies[indexCompany * 4]
                    }`}
                    alt=""
                />
                <img
                    src={`https://cdn.sstatic.net/Img/product/teams/logos/${
                        companies[indexCompany * 4 + 1]
                    }`}
                    alt=""
                />
                <img
                    src={`https://cdn.sstatic.net/Img/product/teams/logos/${
                        companies[indexCompany * 4 + 2]
                    }`}
                    alt=""
                />
                <img
                    src={`https://cdn.sstatic.net/Img/product/teams/logos/${
                        companies[indexCompany * 4 + 3]
                    }`}
                    alt=""
                />
            </div>
            <div className="companies-used__nav">
                <span
                    onClick={() => handleClickSite(0)}
                    style={indexCompany === 0 ? { backgroundColor: "black" } : {}}></span>
                <span
                    onClick={() => handleClickSite(1)}
                    style={indexCompany === 1 ? { backgroundColor: "black" } : {}}></span>
                <span
                    onClick={() => handleClickSite(2)}
                    style={indexCompany === 2 ? { backgroundColor: "black" } : {}}></span>
            </div>
        </div>
    );
}

export default HomePageCompanies;
