import { useEffect, useState } from "react";

import { getUserUrls, deleteUrl } from "../urls/urlService";
import UrlTable from "../urls/UrlTable";

function RecentUrls() {

    const [urls, setUrls] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchUrls();
    }, []);

    async function fetchUrls() {

        try {

            const response = await getUserUrls();
            // console.log("Response:", response);

            setUrls(response.data);

        }
        catch (error) {

            console.error(error.response?.data || error.message);

        }
        finally {

            setLoading(false);

        }

    }
    async function handleDelete(id) {

        try {

            await deleteUrl(id);

            setUrls((previousUrls) =>
                previousUrls.filter((url) => url.id !== id)
            );
            return true;

        }
        catch (error) {

            console.error(error.response?.data || error.message);
            return false;

        }

    }

    if (loading) {
        return <p>Loading URLs...</p>;
    }

    return (

        <section className="recent-urls">

            <h2>Recent URLs</h2>

            <UrlTable
                urls={urls}
                onDelete={handleDelete}
            />

        </section>

    );
}

export default RecentUrls;