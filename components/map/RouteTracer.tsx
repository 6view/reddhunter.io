'use client';

import React, { useEffect, useRef, useState } from 'react';
import { RotateCcw, Download, Share2, Trash2 } from 'lucide-react';

interface Point {
  lat: number;
  lng: number;
}

interface Route {
  points: Point[];
  distance: number;
}

export default function RouteTracer() {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<any>(null);
  const [route, setRoute] = useState<Route>({ points: [], distance: 0 });
  const [isDrawing, setIsDrawing] = useState(false);
  const [markerGroup, setMarkerGroup] = useState<any>(null);
  const [polyline, setPolyline] = useState<any>(null);
  const [mapReady, setMapReady] = useState(false);

  // Coordonnées de Digne-les-Bains
  const DIGNE_CENTER = [44.0895, 6.2303];

  // Calcul de la distance entre deux points (formule Haversine)
  const calculateDistance = (lat1: number, lng1: number, lat2: number, lng2: number): number => {
    const R = 6371; // Rayon de la Terre en km
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLng = (lng2 - lng1) * (Math.PI / 180);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLng / 2) * Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  // Calcul de la distance totale de la route
  const calculateTotalDistance = (points: Point[]): number => {
    let total = 0;
    for (let i = 1; i < points.length; i++) {
      total += calculateDistance(
        points[i - 1].lat,
        points[i - 1].lng,
        points[i].lat,
        points[i].lng
      );
    }
    return total;
  };

  // Initialiser la carte
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
    script.async = true;

    const link = document.createElement('link');
    link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
    link.rel = 'stylesheet';

    document.head.appendChild(link);
    script.onload = () => {
      const L = (window as any).L;

      const mapInstance = L.map(mapContainer.current).setView(DIGNE_CENTER, 13);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
        maxZoom: 19,
      }).addTo(mapInstance);

      // Ajouter un marqueur pour Digne-les-Bains
      L.marker(DIGNE_CENTER)
        .bindPopup('<b>Digne-les-Bains</b>')
        .addTo(mapInstance);

      map.current = mapInstance;
      setMapReady(true);
    };

    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
      document.head.removeChild(link);
    };
  }, []);

  // Gestion du clic sur la carte pour dessiner l'itinéraire
  useEffect(() => {
    if (!mapReady || !map.current) return;

    const L = (window as any).L;

    const handleMapClick = (e: any) => {
      if (!isDrawing) return;

      const { lat, lng } = e.latlng;
      const newPoint: Point = { lat, lng };
      const newPoints = [...route.points, newPoint];

      // Ajouter un marqueur
      L.circleMarker([lat, lng], {
        radius: 5,
        fillColor: '#3b82f6',
        color: '#1e40af',
        weight: 2,
        opacity: 1,
        fillOpacity: 0.8,
      }).addTo(map.current);

      // Mettre à jour la polyline
      if (polyline) {
        map.current.removeLayer(polyline);
      }

      const newPolyline = L.polyline(
        newPoints.map((p) => [p.lat, p.lng]),
        {
          color: '#3b82f6',
          weight: 3,
          opacity: 0.8,
          smoothFactor: 1.0,
        }
      ).addTo(map.current);

      setPolyline(newPolyline);

      const distance = calculateTotalDistance(newPoints);
      setRoute({ points: newPoints, distance });
    };

    map.current.on('click', handleMapClick);

    return () => {
      if (map.current) {
        map.current.off('click', handleMapClick);
      }
    };
  }, [mapReady, isDrawing, route.points, polyline]);

  // Réinitialiser la route
  const handleReset = () => {
    if (!mapReady || !map.current) return;

    const L = (window as any).L;

    // Supprimer tous les marqueurs et lignes
    map.current.eachLayer((layer: any) => {
      if (layer instanceof L.CircleMarker || layer instanceof L.Polyline) {
        map.current.removeLayer(layer);
      }
    });

    setRoute({ points: [], distance: 0 });
    setPolyline(null);
  };

  // Télécharger la route en JSON
  const handleDownload = () => {
    const data = JSON.stringify(route, null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `route-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Exporter en GPX
  const handleExportGPX = () => {
    const gpxContent = `<?xml version="1.0" encoding="UTF-8"?>
<gpx version="1.1">
  <trk>
    <name>Route de course - Digne-les-Bains</name>
    <trkseg>
      ${route.points
        .map(
          (p) => `      <trkpt lat="${p.lat}" lon="${p.lng}">
        <ele>0</ele>
      </trkpt>`
        )
        .join('\n')}
    </trkseg>
  </trk>
</gpx>`;

    const blob = new Blob([gpxContent], { type: 'application/gpx+xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `route-${new Date().toISOString().slice(0, 10)}.gpx`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="w-full h-full flex flex-col">
      {/* Carte */}
      <div
        ref={mapContainer}
        className="flex-1 relative"
        style={{ minHeight: '0' }}
      />

      {/* Panneau de contrôle */}
      <div className="bg-white shadow-lg border-t border-gray-200">
        <div className="max-w-7xl mx-auto p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div>
                <p className="text-sm text-gray-600">Distance totale</p>
                <p className="text-3xl font-bold text-blue-600">
                  {route.distance.toFixed(2)} km
                </p>
              </div>
              <div className="text-sm text-gray-600 border-l-2 border-gray-300 pl-4">
                <p>{route.points.length} points tracés</p>
                {route.distance > 0 && (
                  <p>Durée estimée: {Math.round((route.distance / 10) * 60)} min</p>
                )}
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => setIsDrawing(!isDrawing)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  isDrawing
                    ? 'bg-red-500 text-white hover:bg-red-600'
                    : 'bg-blue-500 text-white hover:bg-blue-600'
                }`}
              >
                {isDrawing ? '✏️ En cours de traçage... Cliquez' : '✏️ Commencer le traçage'}
              </button>

              <button
                onClick={handleReset}
                className="px-4 py-2 rounded-lg bg-gray-200 text-gray-800 hover:bg-gray-300 flex items-center gap-2"
                title="Réinitialiser"
              >
                <RotateCcw size={18} />
              </button>

              <button
                onClick={handleDownload}
                className="px-4 py-2 rounded-lg bg-green-500 text-white hover:bg-green-600 flex items-center gap-2"
                title="Télécharger en JSON"
              >
                <Download size={18} />
              </button>

              <button
                onClick={handleExportGPX}
                className="px-4 py-2 rounded-lg bg-purple-500 text-white hover:bg-purple-600 flex items-center gap-2"
                title="Exporter en GPX"
              >
                <Share2 size={18} />
              </button>
            </div>
          </div>

          {/* Information supplémentaire */}
          {route.points.length > 0 && (
            <div className="mt-4 text-sm text-gray-600">
              <p>
                Allure moyenne: {route.distance > 0 ? (60 / (route.distance / 10)).toFixed(1) : '0'} min/km
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
