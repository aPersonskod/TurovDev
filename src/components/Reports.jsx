// src/components/Reports.jsx
import {useEffect, useState} from 'react';
import DonutChart from './DonutChart';
import {fetchMonthReportData, fetchWholeReportData, fetchIntervalReportData} from '../api/reports';
import './Reports.css';

const PERIOD = {
    LAST_MONTH: 'lastMonth',
    WHOLE_PERIOD: 'wholePeriod',
    DATE_INTERVAL: 'dateInterval',
};

const PERIOD_OPTIONS = [
    {value: PERIOD.LAST_MONTH, label: 'Last month'},
    {value: PERIOD.WHOLE_PERIOD, label: 'Whole period'},
    {value: PERIOD.DATE_INTERVAL, label: 'Date intervals'},
];

export default function Reports() {
    const [period, setPeriod] = useState(PERIOD.LAST_MONTH);
    const [from, setFrom] = useState('');
    const [to, setTo] = useState('');

    const [report, setReport] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const isInterval = period === PERIOD.DATE_INTERVAL;

    // YYYY-MM-DD strings can be compared lexicographically
    const intervalError =
        isInterval && from && to && from >= to
            ? 'The first date must be earlier than the second one'
            : null;

    const intervalIncomplete = isInterval && (!from || !to);
    const canRequest = !isInterval || (!intervalIncomplete && !intervalError);
    const fetchData = async (active) => {
        setLoading(true);
        setError(null);
        try {
            let result = null;
            switch (period) {
                case PERIOD.LAST_MONTH:
                    result = await fetchMonthReportData();
                    break;
                case PERIOD.WHOLE_PERIOD:
                    result = await fetchWholeReportData();
                    break;
                case PERIOD.DATE_INTERVAL:
                    result = await fetchIntervalReportData(from, to);
                    break;
                default:
                    result = await fetchMonthReportData();
            }
            if (active) setReport(result);
        } catch (e) {
            if (active && e.name !== 'AbortError') {
                setError(e.message || 'Failed to load the report');
            }
        } finally {
            if (active) setLoading(false);
        }
    };

    useEffect(() => {
        if (!canRequest) return;

        const controller = new AbortController();
        let active = true;

        (async () => {
            await fetchData(active);
        })();

        return () => {
            active = false;
            controller.abort();
        };
    }, [period, from, to, isInterval, canRequest]);

    return (
        <div className="container-page py-16 sm:py-20">
            <section className="reports">
                <header className="reports__header">
                    <h2 className="reports__title">Reports</h2>

                    <div className="reports__controls">
                        <select
                            className="reports__select"
                            value={period}
                            onChange={(e) => setPeriod(e.target.value)}
                        >
                            {PERIOD_OPTIONS.map((opt) => (
                                <option key={opt.value} value={opt.value}>
                                    {opt.label}
                                </option>
                            ))}
                        </select>

                        {isInterval && (
                            <div className="reports__dates">
                                <label className="reports__field">
                                    <span>From</span>
                                    <input
                                        type="date"
                                        value={from}
                                        max={to || undefined}
                                        onChange={(e) => setFrom(e.target.value)}
                                    />
                                </label>

                                <label className="reports__field">
                                    <span>To</span>
                                    <input
                                        type="date"
                                        value={to}
                                        min={from || undefined}
                                        onChange={(e) => setTo(e.target.value)}
                                    />
                                </label>
                            </div>
                        )}
                    </div>
                </header>

                {intervalError && <p className="reports__error">{intervalError}</p>}
                {intervalIncomplete && !intervalError && (
                    <p className="reports__hint">Pick both dates to build the report</p>
                )}

                {loading && <p className="reports__hint">Loading…</p>}
                {error && <p className="reports__error">{error}</p>}

                {!loading && !error && report && (
                    <DonutChart
                        entries={report.reportEntries}
                        totalViews={report.totalViews}
                    />
                )}
            </section>
        </div>
    );
}