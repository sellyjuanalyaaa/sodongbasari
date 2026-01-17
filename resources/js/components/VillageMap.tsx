import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix default marker icon issue in react-leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
    iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

interface MapUpdaterProps {
    center: [number, number];
    zoom: number;
}

function MapUpdater({ center, zoom }: MapUpdaterProps) {
    const map = useMap();
    useEffect(() => {
        map.setView(center, zoom);
    }, [center, zoom, map]);
    return null;
}

interface VillageMapProps {
    latitude?: number;
    longitude?: number;
    villageName?: string;
    totalRt?: number;
    totalRw?: number;
}

export default function VillageMap({ 
    latitude = -6.9447, 
    longitude = 109.3641, 
    villageName = "Desa Sodong Basari",
    totalRt = 0,
    totalRw = 0
}: VillageMapProps) {
    const position: [number, number] = [latitude, longitude];

    return (
        <div className="w-full h-64 rounded-xl overflow-hidden border-2 border-white/20 shadow-lg">
            <MapContainer
                center={position}
                zoom={14}
                scrollWheelZoom={false}
                style={{ height: '100%', width: '100%' }}
                className="z-0"
            >
                <MapUpdater center={position} zoom={14} />
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={position}>
                    <Popup>
                        <div className="text-center">
                            <strong className="font-bold text-base">{villageName}</strong>
                            <div className="mt-2 text-sm text-gray-600">
                                <div>RT: {totalRt}</div>
                                <div>RW: {totalRw}</div>
                            </div>
                        </div>
                    </Popup>
                </Marker>
            </MapContainer>
        </div>
    );
}
