import { Link } from "react-router-dom";

export const GotoPage = (props) => {
    return (
        <div class="text-center add_top_10">
			    {props.displayText}{" "}
            <strong>
                <Link to={props.buttonLink}>{props.buttonHeading}</Link>
            </strong>
        </div>
    )
}