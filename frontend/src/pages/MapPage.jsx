import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet.markercluster/dist/MarkerCluster.css';
import 'leaflet.markercluster/dist/MarkerCluster.Default.css';
import 'leaflet.markercluster';
import axios from 'axios';

const MapPage = () => {

    // mapRef stores the Leaflet map instance
    // prevents re-initialization on re-renders
    const mapRef = useRef(null);

    // reports fetched from backend
    const [reports, setReports] = useState([]);

    // loading state while fetching reports
    const [loading, setLoading] = useState(true);

    // ─────────────────────────────────────
    // Step 1: fetch all reports from backend
    // runs once when component mounts
    // ─────────────────────────────────────
    useEffect(() => {
        const fetchReports = async () => {
            try {
                const response = await axios.get('/api/reports');
                setReports(response.data);
            } catch (err) {
                console.error('Failed to fetch reports:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchReports();
    }, []);

    // ─────────────────────────────────────
    // Step 2: initialize map and place pins
    // runs after reports are fetched
    // ─────────────────────────────────────
    useEffect(() => {

        // dont initialize until reports are loaded
        if (loading) return;

        // dont initialize if already done
        if (mapRef.current) return;

        // initialize Leaflet map
        // setView([lat, lng], zoomLevel)
        // 12 is a good zoom level for city view
        const map = L.map('map').setView([26.9124, 75.7873], 12);

        // add OpenStreetMap tiles — free, no API key needed
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors'
        }).addTo(map);

        // create marker cluster group
        // this handles the red/yellow/green zone coloring automatically
        const clusterGroup = L.markerClusterGroup({
            iconCreateFunction: (cluster) => {
                const count = cluster.getChildCount();

                // color based on case density
                let bgColor;
                if (count >= 10) bgColor = '#ef4444';      // red
                else if (count >= 4) bgColor = '#eab308';  // yellow
                else bgColor = '#22c55e';                  // green

                return L.divIcon({
                    html: `
                        <div style="
                            background: ${bgColor};
                            color: white;
                            border-radius: 50%;
                            width: 40px;
                            height: 40px;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            font-weight: bold;
                            font-size: 14px;
                            border: 2px solid white;
                            box-shadow: 0 2px 6px rgba(0,0,0,0.3);
                        ">${count}</div>
                    `,
                    className: '',
                    iconSize: [40, 40]
                });
            }
        });

        // pin color based on severity
        const colorMap = {
            Emergency: '#ef4444',   // red
            High: '#f97316',        // orange
            Medium: '#eab308',      // yellow
            Low: '#22c55e'          // green
        };

        // place a pin for each report
        reports.forEach((report) => {

            // skip reports without coordinates
            if (!report.location || !report.location.coordinates) return;

            // swap coordinates — MongoDB stores [lng, lat], Leaflet needs [lat, lng]
            const [lng, lat] = report.location.coordinates;

            // create circle marker at this location
            const marker = L.circleMarker([lat, lng], {
                radius: 8,
                fillColor: colorMap[report.severity] || '#gray',
                color: '#ffffff',   // white border
                weight: 1.5,
                fillOpacity: 0.9
            });

            // popup shows when user clicks the pin
            marker.bindPopup(`
                <div style="min-width: 180px;">
                    <b style="font-size: 14px;">${report.caseType}</b><br/>
                    <span style="color: gray; font-size: 12px;">${report.address}</span><br/>
                    <hr style="margin: 6px 0"/>
                    <b>Severity:</b> ${report.severity}<br/>
                    <b>Status:</b> ${report.status}<br/>
                    <b>Reported:</b> ${new Date(report.createdAt).toLocaleDateString()}
                </div>
            `);

            // add marker to cluster group
            clusterGroup.addLayer(marker);
        });

        // add all markers to map at once
        map.addLayer(clusterGroup);

        // store map instance in ref
        mapRef.current = map;

        // cleanup — remove map when component unmounts
        return () => {
            map.remove();
            mapRef.current = null;
        };

    }, [loading, reports]);  // runs when loading or reports changes


    // count reports by severity for dashboard
    const counts = {
        Emergency: reports.filter(r => r.severity === 'Emergency').length,
        High: reports.filter(r => r.severity === 'High').length,
        Medium: reports.filter(r => r.severity === 'Medium').length,
        Low: reports.filter(r => r.severity === 'Low').length,
    };

    return (
        <div className="w-full">

            {/* page header */}
            <div className="p-4 bg-white border-b">
                <h1 className="text-2xl font-bold text-center">
                    StrayShield Live Map — Jaipur
                </h1>
                <p className="text-center text-gray-500 text-sm mt-1">
                    All active stray dog cases in Jaipur
                </p>
            </div>

            {/* loading state */}
            {loading && (
                <div className="flex justify-center items-center h-64">
                    <p className="text-gray-500">Loading map...</p>
                </div>
            )}

            {/* map container */}
            {/* height must be set explicitly for Leaflet to render */}
            <div
                id="map"
                style={{ height: '70vh', width: '100%' }}
            />

            {/* dashboard below map */}
            <div className="bg-white border-t p-4">
                <h2 className="text-center font-semibold text-lg mb-3">
                    Active Cases Dashboard
                </h2>
                <div className="flex justify-center gap-6 flex-wrap">

                    <div className="flex items-center gap-2 bg-red-50 px-4 py-2 rounded-xl">
                        <span className="w-4 h-4 rounded-full bg-red-500 inline-block"/>
                        <span className="font-medium">Emergency</span>
                        <span className="text-red-600 font-bold text-lg">
                            {counts.Emergency}
                        </span>
                    </div>

                    <div className="flex items-center gap-2 bg-orange-50 px-4 py-2 rounded-xl">
                        <span className="w-4 h-4 rounded-full bg-orange-500 inline-block"/>
                        <span className="font-medium">High</span>
                        <span className="text-orange-600 font-bold text-lg">
                            {counts.High}
                        </span>
                    </div>

                    <div className="flex items-center gap-2 bg-yellow-50 px-4 py-2 rounded-xl">
                        <span className="w-4 h-4 rounded-full bg-yellow-400 inline-block"/>
                        <span className="font-medium">Medium</span>
                        <span className="text-yellow-600 font-bold text-lg">
                            {counts.Medium}
                        </span>
                    </div>

                    <div className="flex items-center gap-2 bg-green-50 px-4 py-2 rounded-xl">
                        <span className="w-4 h-4 rounded-full bg-green-500 inline-block"/>
                        <span className="font-medium">Low</span>
                        <span className="text-green-600 font-bold text-lg">
                            {counts.Low}
                        </span>
                    </div>

                    <div className="flex items-center gap-2 bg-gray-50 px-4 py-2 rounded-xl">
                        <span className="font-medium">Total Active Cases:</span>
                        <span className="font-bold text-lg">{reports.length}</span>
                    </div>

                </div>
            </div>

        </div>
    );
};

export default MapPage;