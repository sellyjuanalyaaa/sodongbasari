import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap, LayersControl, GeoJSON } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import type { FeatureCollection } from "geojson";
import { Link } from '@inertiajs/react';
import { ExternalLink } from 'lucide-react';

// Fix default marker icon issue in react-leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
    iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

interface MapUpdaterProps {
    boundary: FeatureCollection | null;
    zoom: number;
}

function MapUpdater({ boundary }: MapUpdaterProps) {
    const map = useMap();

    // automatic zoom to layer
    useEffect(() => {
        if (!boundary) return;
        const layer = L.geoJSON(boundary);
        map.fitBounds(layer.getBounds(), {
            padding: [10, 10],
        });
    }, [boundary, map]);

    return null;
}

interface VillageMapProps {
    latitude?: number;
    longitude?: number;
}

export default function VillageMap({
    latitude = 
    // -7.1163628,
    -7.11632744773697, 
    longitude = 
    // 109.3063082,
    109.3088472502586,
}: VillageMapProps) {
    const position: [number, number] = [latitude, longitude];
    const [boundary, setBoundary] = useState<FeatureCollection | null>(null);

    // get polygon data
    useEffect(() => {
        fetch("/geojson/Batas_Desa_Sodong_Basari_Pro.json")
            .then((res) => res.json())
            .then((data) => setBoundary(data));
    }, []);

    return (
        <div className="w-full h-64 rounded-xl overflow-hidden border-2 border-white/20 shadow-lg">
            <MapContainer
                center={position}
                zoom={14}
                scrollWheelZoom={false}
                style={{ height: '100%', width: '100%' }}
                className="z-0"
            >
                <MapUpdater boundary={boundary} zoom={10} />

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
                        <div className="text-center gap-0">
                            <div className="font-semibold text-md">Balai Desa Sodong Basari</div>
                            <div className="text-sm">
                                <Link href="https://maps.app.goo.gl/exRWRDGizawmETX67" target="_blank" 
                                    className="flex justify-center items-center gap-1">
                                    lihat di google map
                                    <ExternalLink className="h-3 w-3"/>
                                </Link>
                            </div>
                        </div>
                    </Popup>
                </Marker>

                {boundary && 
                    <GeoJSON 
                        data={boundary}
                        style={{ 
                            color: "red",
                            weight: 1,
                            fillOpacity: 0.2
                        }}

                        // popup
                        onEachFeature={(features: any, layer: any) => {
                            layer.bindPopup(features.properties.name);
                        }}
                    />
                }
            </MapContainer>
        </div>
    );
}
