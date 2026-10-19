// src/components/DonutChart.jsx
const COLORS = [
    '#4f8cff', '#22c55e', '#f59e0b', '#ef4444', '#a855f7',
    '#06b6d4', '#ec4899', '#84cc16', '#f97316', '#8b5cf6',
    '#14b8a6', '#eab308', '#3b82f6', '#10b981', '#d946ef',
    '#f43f5e', '#0ea5e9', '#64748b', '#78350f', '#16a34a',
    '#9333ea', '#c2410c', '#0891b2', '#be123c', '#4d7c0f',
    '#7c3aed', '#b45309', '#047857', '#1e40af', '#86198f',
];

export default function DonutChart({
                                       entries = [],
                                       totalViews = 0,
                                       size = 240,
                                       thickness = 30,
                                   }) {
    const center = size / 2;
    const radius = (size - thickness) / 2;
    const circumference = 2 * Math.PI * radius;

    let offset = 0;
    const segments = entries.map((entry, index) => {
        // Proportions for drawing only: viewsCount / totalViews (both from API)
        const fraction = totalViews > 0 ? entry.viewsCount / totalViews : 0;
        const length = fraction * circumference;

        const segment = {
            ...entry,
            color: COLORS[index % COLORS.length],
            dasharray: `${length} ${circumference - length}`,
            dashoffset: -offset,
        };

        offset += length;
        return segment;
    });

    return (
        <div className="donut">
            <div className="donut__chart" style={{ width: size, height: size }}>
                <svg
                    width={size}
                    height={size}
                    viewBox={`0 0 ${size} ${size}`}
                    role="img"
                    aria-label="Views by recommender"
                >
                    <g transform={`rotate(-90 ${center} ${center})`}>
                        <circle
                            cx={center}
                            cy={center}
                            r={radius}
                            fill="none"
                            stroke="#eef1f6"
                            strokeWidth={thickness}
                        />
                        {segments.map((s) => (
                            <circle
                                key={s.recommender}
                                cx={center}
                                cy={center}
                                r={radius}
                                fill="none"
                                stroke={s.color}
                                strokeWidth={thickness}
                                strokeDasharray={s.dasharray}
                                strokeDashoffset={s.dashoffset}
                            >
                                <title>{`${s.recommender}: ${s.viewsCount}`}</title>
                            </circle>
                        ))}
                    </g>
                </svg>

                <div className="donut__center">
                    <span className="donut__total">{totalViews}</span>
                    <span className="donut__total-label">total views</span>
                </div>
            </div>

            <ul className="donut__legend">
                {segments.map((s) => (
                    <li key={s.recommender} className="donut__legend-item">
                        <span className="donut__dot" style={{ background: s.color }} />
                        <span className="donut__name">{s.recommender}</span>
                        <span className="donut__value">{s.viewsCount}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
}