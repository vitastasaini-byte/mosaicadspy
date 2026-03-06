export default function AdTable({ ads, pageId }) {
    if (!ads || ads.length === 0) {
        return <div className="card"><p>No live ads found for this competitor.</p></div>;
    }

    const formatBadge = (mediaType) => {
        switch (mediaType?.toLowerCase()) {
            case 'video': return <span className="badge video">Video</span>;
            case 'image': return <span className="badge image">Static Image</span>;
            case 'carousel': return <span className="badge carousel">Carousel</span>;
            default: return <span className="badge">{mediaType || 'Unknown'}</span>;
        }
    };

    return (
        <div className="table-container">
            <table>
                <thead>
                    <tr>
                        <th>Ad ID</th>
                        <th>Type</th>
                        <th>Started Running</th>
                        <th>Hook Summary</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {ads.map((ad, idx) => (
                        <tr key={ad.id || idx}>
                            <td style={{ fontWeight: 500 }}>{ad.id || 'N/A'}</td>
                            <td>{formatBadge(ad.mediaType)}</td>
                            <td>{ad.startDate ? new Date(ad.startDate).toLocaleDateString() : 'N/A'}</td>
                            <td style={{ maxWidth: '400px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                <span className="badge" style={{ marginRight: '0.5rem', backgroundColor: '#e9ecef', color: '#495057' }}>
                                    {ad.theme || 'General'}
                                </span>
                                {ad.adCopy || 'No text found'}
                            </td>
                            <td>
                                <a
                                    href={`https://www.facebook.com/ads/library/?id=${ad.id}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn-primary"
                                    style={{ padding: '0.25rem 0.75rem', fontSize: '0.75rem' }}
                                >
                                    View Library Live
                                </a>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
