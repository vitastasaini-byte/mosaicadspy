import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

export default function PrintChart({ ads }) {
    if (!ads || ads.length === 0) return null;

    // Process data for the chart: Views per Ad
    const chartData = ads.map(ad => ({
        name: ad.competitor ? `${ad.competitor} (${ad.id.slice(-5)})` : `Ad ${ad.id.slice(-5)}`,
        Views: ad.views || 0,
        Theme: ad.theme || 'General'
    }));

    return (
        <div className="print-chart-container" style={{ width: '800px', margin: '0 auto' }}>
            <h3 style={{ marginBottom: '1rem', textAlign: 'center', color: 'var(--mw-teal-dark)' }}>
                Ad Performance Analysis: Views per Active Creative
            </h3>
            <div style={{ width: '800px', height: '400px' }}>
                <BarChart
                    width={800}
                    height={400}
                    data={chartData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 65 }}
                    isAnimationActive={false}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" angle={-45} textAnchor="end" height={60} />
                    <YAxis allowDecimals={false} label={{ value: 'Views', angle: -90, position: 'insideLeft', offset: -5 }} />
                    <Tooltip />
                    <Legend verticalAlign="top" height={36} />
                    <Bar dataKey="Views" fill="#00897b" isAnimationActive={false} />
                </BarChart>
            </div>
        </div>
    );
}
