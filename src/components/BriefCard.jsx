export default function BriefCard({ signals, brand }) {
    if (!signals) return null;

    return (
        <div className="card">
            <h2 style={{ marginBottom: '1.5rem', color: 'var(--mw-teal-dark)' }}>{brand} Intelligence Brief</h2>

            <div className="brief-grid">
                <div className="brief-item">
                    <h3>The Big Move</h3>
                    <p>{signals.bigMove || 'No significant strategic shifts detected this week.'}</p>
                </div>

                <div className="brief-item">
                    <h3>The 'Winner' to Watch</h3>
                    {signals.longevity && signals.longevity.length > 0 ? (
                        <p>
                            <strong>{signals.longevity[0].theme} hook ({signals.longevity[0].mediaType})</strong>
                            <br />
                            {signals.longevity[0].views ? (
                                <><span>{signals.longevity[0].views}</span><br /></>
                            ) : null}
                            Active for {signals.longevity[0].daysActive} days. Likely scaling due to effective messaging.
                        </p>
                    ) : (
                        <p>No ads currently running longer than 21 days.</p>
                    )}
                </div>

                <div className="brief-item">
                    <h3>Gap Analysis</h3>
                    <p>{signals.gapAnalysis || 'Consistent overlap with competitor themes. Differentiate on creative format.'}</p>
                </div>
            </div>

            <div className="action-item">
                <h3>⚡ Action Item</h3>
                <p>{signals.actionItem || 'Review top performing creatives and iterate.'}</p>
            </div>
        </div>
    );
}
