import UrlTableRow from "./UrlTableRow";

function UrlTable({
    urls = [],
    onDelete,
    onEdit,
}) {

    return (

        <div className="url-table-container">

            <table className="url-table">

                <thead>

                    <tr>
                        <th>Original URL</th>
                        <th>Short Code</th>
                        <th>Created</th>
                        <th>Expires</th>
                        <th>Actions</th>
                    </tr>

                </thead>

                <tbody>

                    {urls.length === 0 ? (

                        <tr>

                            <td
                                colSpan="5"
                                className="empty-table"
                            >
                                No URLs found.
                            </td>

                        </tr>

                    ) : (

                        urls.map((url) => (

                            <UrlTableRow
                                key={url.id}
                                url={url}
                                onDelete={onDelete}
                                onEdit={onEdit}
                            />

                        ))

                    )}

                </tbody>

            </table>

        </div>

    );

}

export default UrlTable;