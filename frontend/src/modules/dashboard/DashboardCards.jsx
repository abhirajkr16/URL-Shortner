function DashboardCards() {

    const stats = [
        {
            title: "Total URLs",
            value: 0,
        },
        {
            title: "Active URLs",
            value: 0,
        },
        {
            title: "Total Clicks",
            value: 0,
        },
    ];

    return (

        <section className="dashboard-cards">

            {
                stats.map((stat) => (

                    <div
                        key={stat.title}
                        className="dashboard-card"
                    >

                        <h3>{stat.title}</h3>

                        <h2>{stat.value}</h2>

                    </div>

                ))
            }

        </section>

    );
}

export default DashboardCards;