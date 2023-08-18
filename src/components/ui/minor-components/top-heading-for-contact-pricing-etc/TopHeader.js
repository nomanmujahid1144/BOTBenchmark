export const TopHeader = ({heading, paragraph}) => {
    return (
        <>
            <div className="wrapper">
                <div className="container">
                    <h1>{heading}</h1>
                    <p>{paragraph}</p>
                </div>
            </div>
        </>
    )
}