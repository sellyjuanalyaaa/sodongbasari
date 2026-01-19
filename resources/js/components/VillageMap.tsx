import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap, LayersControl } from 'react-leaflet';
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
    latitude = -7.1163628, 
    longitude = 109.3063082, 
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
                
                <LayersControl position="topright">
                    {/* OpenStreetMap Layer */}
                    <LayersControl.BaseLayer checked name="Peta">
                        <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                    </LayersControl.BaseLayer>
                    
                    {/* Satellite Layer - Esri World Imagery */}
                    <LayersControl.BaseLayer name="Satelit">
                        <TileLayer
                            attribution='&copy; <a href="https://www.esri.com/">Esri</a>'
                            url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
                        />
                    </LayersControl.BaseLayer>
                    
                    {/* Hybrid Layer - Satellite with Labels */}
                    <LayersControl.BaseLayer name="Hybrid (Satelit + Label)">
                        <TileLayer
                            attribution='&copy; <a href="https://www.esri.com/">Esri</a>'
                            url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
                        />
                        <TileLayer
                            attribution='&copy; <a href="https://www.esri.com/">Esri</a>'
                            url="https://server.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}"
                        />
                    </LayersControl.BaseLayer>
                </LayersControl>

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
