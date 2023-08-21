export const NotFound = () => {
    return (
        <section className="hero_single general" style={{height: '100vh'}}>
            <div className="wrapper">
                <div className="container">
                <form>
                    <img src="img/404.svg" alt="" className="img-fluid" />
                    <div id="custom-search-input">
                    <div className="input-group">
                        <input
                        type="text"
                        className="search-query"
                        placeholder="Search pages..."
                        />
                        <input type="submit" className="btn_search" defaultValue="Search" />
                    </div>
                    </div>
                </form>
                </div>
            </div>
        </section>
    )
}