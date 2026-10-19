// src/api/reports.js
const API_URL = import.meta.env.VITE_API_URL ?? '/api/reports';
const Host = 'localhost';
const Port = '7059';
export const BaseAddress = `https://${Host}:${Port}/api/attendance-report`;

// Set VITE_USE_MOCK=false in .env to hit the real backend
const USE_MOCK = import.meta.env.VITE_USE_MOCK !== 'false';

const MOCK_RESPONSE = {
    reportEntries: [
        { recommender: 'petya', viewsCount: 4 },
        { recommender: 'test', viewsCount: 3 },
        { recommender: 'vasya', viewsCount: 4 },
    ],
    totalViews: 11,
};

export const createViewRequest = async (recommender) => {
    try {
        let query = `${BaseAddress}/add-view`;
        let options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(
                {
                    "recommender": recommender
                }
            ),
        }
        return await fetch(query, options);
    } catch (err) {
        console.error("Failed create order:", err);
        throw err;
    }
}

export const fetchMonthReportData = async () => {
    try {
        let query = `${BaseAddress}/get-month-report`;
        let options = {
            method: 'GET'
        }
        const response = await fetch(query, options);
        if(response.ok){
            return await response.json();
        }
        await throwHandledException(response);
    } catch (err) {
        console.error("Failed to fetch orders data:", err);
        throw err;
    }
}

export const fetchWholeReportData = async () => {
    try {
        let query = `${BaseAddress}/get-whole-report`;
        let options = {
            method: 'GET'
        }
        const response = await fetch(query, options);
        if(response.ok){
            return await response.json();
        }
        await throwHandledException(response);
    } catch (err) {
        console.error("Failed to fetch orders data:", err);
        throw err;
    }
}

export const fetchIntervalReportData = async (startDate, endDate) => {
    try {
        let query = `${BaseAddress}/get-interval-report?startDate=${startDate}&endDate=${endDate}`;
        let options = {
            method: 'GET'
        }
        const response = await fetch(query, options);
        if(response.ok){
            return await response.json();
        }
        await throwHandledException(response);
    } catch (err) {
        console.error("Failed to fetch orders data:", err);
        throw err;
    }
}

export const throwHandledException = async (response) => {
    if (!response.ok) {
        let status = `Status code ${response.status}:`;
        let myLocalError = await response.json();
        throw new Error(`${status} ${myLocalError.detail}`);
    }
};