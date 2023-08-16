export const Headings = ({ Heading, subHeading, isSubHeading, goto}) => {
    return (
        <div className="main_title_3">
            <h2 className="mb-4">{Heading}</h2>
            {/* {isSubHeading ? <p>{subHeading}</p> : null} */}
            {/* <a href={goto}>View all</a> */}
        </div>
    )
}