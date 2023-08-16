export const FAQ = () => {

    const faqData = [
        {
            question: "What is Bot Benchmark?",
            answer: [
                "Bot Benchmark is a dedicated review platform for AI tools, where real users share their firsthand experiences, and tool founders can address reviews directly."
            ],
            isExpanded: true // Set to true if you want this FAQ to be expanded by default
        },
        {
            question: "How do you select AI tools for review?",
            answer: [
                "We don't handpick AI tools for review. Instead, we list them with a basic overview and allow real users to review them based on their experiences."
            ],
            isExpanded: false
        },
        {
            question: "Are the reviews on Bot Benchmark unbiased?",
            answer: [
                "Absolutely. We actively moderate reviews to identify and address any patterns of bias. Our aim is to provide transparent, genuine feedback without any hidden agendas."
            ],
            isExpanded: false
        },
        {
            question: "Can AI tool founders respond to reviews?",
            answer: [
                "Yes, we encourage a dynamic dialogue. Founders are welcome to address user reviews directly on our platform, fostering an environment of transparency and growth."
            ],
            isExpanded: false
        },
        {
            question: "How do you ensure the quality of reviews?",
            answer: [
                "We monitor for unusual activities and gather feedback from both founders and users. Any suspicious or non-genuine reviews are scrutinized closely to maintain the integrity of our platform."
            ],
            isExpanded: false
        },
        {
            question: "Can I request a specific AI tool to be listed?",
            answer: [
                "While we aim to have a comprehensive listing, users can certainly suggest AI tools they'd like to see featured. We always appreciate community input to make our platform more inclusive."
            ],
            isExpanded: false
        },
        {
            question: "Is there a cost to use Bot Benchmark?",
            answer: [
                "There is no cost for users to access and use Bot Benchmark. However, founders can opt for a monthly plan to claim their listings and enjoy additional features."
            ],
            isExpanded: false
        },
        {
            question: "How often is Bot Benchmark updated with new AI tools?",
            answer: [
                "We continuously strive to stay updated with the latest in the AI tool landscape. Our listings are refreshed regularly to reflect the ever-evolving world of AI."
            ],
            isExpanded: false
        },
        {
            question: "Do you have partnerships or collaborations with any AI tool companies?",
            answer: [
                "While we provide a platform for user reviews and direct founder responses, our primary commitment is to our users. We ensure all reviews are unbiased and do not favor any particular company."
            ],
            isExpanded: false
        },
        {
            question: "How can I get in touch with the Bot Benchmark team?",
            answer: [
                "You can reach us at hello@botbenchmark.com."
            ],
            isExpanded: false
        }
    ];
    

    return (
        <main>
            <section className="hero_single general">
                <div className="wrapper">
                    <div className="container">
                        <i className="pe-7s-help1" />
                        <h1>FAQ for Bot Benchmark</h1>
                    </div>
                </div>
            </section>
            {/* /hero_single */}
            <div className="container margin_60_35">
                <div className="row">
                    <div className="col-lg-12" id="faq">
                        <div className="add_bottom_45 accordion_2" id="payment">
                            {faqData.map((faq, index) => (
                                <div className="card" key={index}>
                                    <div className="card-header" role="tab" >
                                        <h5 className="mb-0">
                                            <a data-bs-toggle="collapse" href={`#collapse_${index}`} aria-expanded="false">
                                                {/* <i className={`indicator ${faq.isExpanded ? 'ti-minus' : 'ti-plus'}`} /> */}
                                                {faq.question}
                                            </a>
                                        </h5>
                                    </div>
                                    <div id={`collapse_${index}`} className={`collapse ${faq.isExpanded ? 'show' : ''}`} role="tabpanel" data-bs-parent="#payment">
                                        <div className="card-body">
                                            {faq.answer.map((paragraph, idx) => (
                                                <p key={idx}>{paragraph}</p>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </main>

    )
}