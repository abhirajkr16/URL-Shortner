import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import { getUserUrls, deleteUrl, updateUrl, } from "../urls/urlService";
import UrlTable from "../urls/UrlTable";
import EditUrlModal from "../urls/EditUrlModal";

function RecentUrls({
    title = "Recent URLs",
    limit = null,
    refreshTrigger,
    onUrlChange,
}) {

    const [urls, setUrls] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedUrl, setSelectedUrl] = useState(null);

    const [showEditModal, setShowEditModal] = useState(false);
    const [searchParams] = useSearchParams();
    const search = searchParams.get("search") || "";

    useEffect(() => {
        fetchUrls();
    }, [refreshTrigger]);

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

            if (onUrlChange) {
                onUrlChange();
            }

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

            if (onUrlChange) {
                onUrlChange();
            }

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

    const filteredUrls = urls.filter((url) => {
        const originalLower = url.original_url?.toLowerCase() || "";
        const codeLower = url.short_code?.toLowerCase() || "";
        const queryLower = search.toLowerCase();
        return originalLower.includes(queryLower) || codeLower.includes(queryLower);
    });

    return (

        <section className="recent-urls">

            <h2>{title}</h2>

            <UrlTable
                urls={filteredUrls}
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