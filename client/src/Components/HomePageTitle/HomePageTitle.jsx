import { useState, useEffect } from "react";

function HomePageTitle() {
    const [devIndex, setDevIndex] = useState(0);

    const kindOfDevs = [
        "developer",
        "data scientist",
        "system admin",
        "mobile developer",
        "game developer",
    ];

    useEffect(() => {
        const interval = setInterval(function () {
            setDevIndex((prevIndex) => (prevIndex + 1 === 5 ? 0 : prevIndex + 1));
        }, 2500);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="introduction__title">
            Every <span>{kindOfDevs[devIndex]}</span> has a {"\n"} tab open to Stack Overflow
        </div>
    );
}

export default HomePageTitle;
