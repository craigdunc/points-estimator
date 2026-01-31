// src/components/LeafletMap.jsx
import React, { useMemo } from 'react';
import { MapContainer, GeoJSON, Circle, CircleMarker, Tooltip, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import worldData from '../assets/world-countries.json';

// Fix for default marker icons in React Leaflet
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

// Custom Dot Icon for non-selected affordable items to match old style slightly? 
// Or stick to standard pins. User said "The only labels we want is from our app with our labels for destinations."
// pins are good.

// Style for the GeoJSON layer (Grey world)
const geoStyle = {
    fillColor: '#d9d9d9', // Grey fill
    weight: 0,            // No border for cleaner look
    opacity: 1,
    color: '#d9d9d9',
    fillOpacity: 1
};

// Component to handle View changes
function MapController({ center, zoom }) {
    const map = useMap();
    map.setView(center, zoom);
    return null;
}

export default function LeafletMap({
    flights,
    origin,
    selectedFlightId,
    affordableIds,
    onFlightClick
}) {
    const sydney = [origin.lat, origin.lon];

    // Calculate radius for affordability circle
    // Find the max distance (approx) of affordable flights
    const maxAffordableDistance = useMemo(() => {
        let maxDist = 0;
        const originLatLng = L.latLng(origin.lat, origin.lon);

        flights.forEach(f => {
            if (affordableIds.includes(f.id)) {
                const dist = originLatLng.distanceTo(L.latLng(f.lat, f.lon));
                if (dist > maxDist) maxDist = dist;
            }
        });
        // Add a bit of padding (e.g., 500km)
        return maxDist > 0 ? maxDist + 500000 : 0;
    }, [flights, affordableIds, origin]);

    return (
        <div className="relative w-full h-full bg-[#f2f2f2] overflow-hidden rounded-lg">
            {/* bg-[#f2f2f2] is the ocean color */}
            <MapContainer
                center={sydney}
                zoom={2}
                scrollWheelZoom={true}
                style={{ height: '100%', width: '100%', background: '#f2f2f2' }}
                attributionControl={false} // Clean look
                zoomControl={false} // Clean look, can add back if needed
            >
                <GeoJSON data={worldData} style={geoStyle} />

                {/* Affordability Circle */}
                {maxAffordableDistance > 0 && (
                    <Circle
                        center={sydney}
                        radius={maxAffordableDistance}
                        pathOptions={{
                            color: 'white',
                            fillColor: 'white',
                            fillOpacity: 0.2,
                            weight: 2,
                            dashArray: '5, 10' // optional styling
                        }}
                    />
                )}

                {/* Markers */}
                {flights.map(f => {
                    const isAffordable = affordableIds.includes(f.id);
                    const isSelected = f.id === selectedFlightId;

                    return (
                        <CircleMarker
                            key={f.id}
                            center={[f.lat, f.lon]}
                            radius={isSelected ? 12 : 6}
                            pathOptions={{
                                fillColor: isAffordable ? '#e61c2e' : '#999999',
                                color: isSelected ? 'white' : 'transparent',
                                weight: 2,
                                fillOpacity: 1
                            }}
                            eventHandlers={{
                                click: () => onFlightClick && onFlightClick(f.id),
                            }}
                        />
                    );
                })}

                {/* Force re-center if selection changes significantly? 
            Maybe not, let user explore. 
        */}
            </MapContainer>
        </div>
    );
}
