import { useEffect, useState } from "react";

import { getUserUrls, deleteUrl, updateUrl, } from "../urls/urlService";
import UrlTable from "../urls/UrlTable";
import EditUrlModal from "../urls/EditUrlModal";

function RecentUrls({
    title = "Recent URLs",
    limit = null,
}) {

    const [urls, setUrls] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedUrl, setSelectedUrl] = useState(null);

    const [showEditModal, setShowEditModal] = useState(false);

    useEffect(() => {
        fetchUrls();
    }, []);

    async function fetchUrls() {

        try {

            const response = await getUserUrls();


            const allUrls = response.data;

            setUrls(
                limit
                    ? allUrls.slice(0, limit)
                    : allUrls
            );

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
    function handleEdit(url) {

        setSelectedUrl(url);

        setShowEditModal(true);

    }
    async function handleUpdate(updatedUrl) {

        try {

            const response = await updateUrl(
                updatedUrl.id,
                {
                    originalUrl: updatedUrl.originalUrl,
                    expiresAt: updatedUrl.expiresAt,
                }
            );

            setUrls((previousUrls) =>

                previousUrls.map((url) =>

                    url.id === updatedUrl.id
                        ? response.data
                        : url

                )

            );

            setShowEditModal(false);

            setSelectedUrl(null);

        }
        catch (error) {

            console.error(
                error.response?.data ||
                error.message
            );

        }

    }

    if (loading) {
        return <p>Loading URLs...</p>;
    }

    return (

        <section className="recent-urls">

            <h2>{title}</h2>

            <UrlTable
                urls={urls}
                onDelete={handleDelete}
                onEdit={handleEdit}
            />

            <EditUrlModal

                isOpen={showEditModal}

                url={selectedUrl}

                onClose={() => {

                    setShowEditModal(false);

                    setSelectedUrl(null);

                }}

                onSave={handleUpdate}

            />

        </section>

    );
}

export default RecentUrls;