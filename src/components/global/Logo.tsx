import { type JSX } from "react";
import { Link } from "react-router";

function Logo(): JSX.Element {
    return (
        <h2 className="text-4xl font-bold">
            <Link to={"/"} className="cursor-pointer">
                App Logo
            </Link>
        </h2>
    );
}

export default Logo;
