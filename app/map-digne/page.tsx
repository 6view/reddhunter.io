'use client';

import React, { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';

const MapComponent = dynamic(() => import('@/components/map/RouteTracer'), {
  ssr: false,
  loading: () => <div className="w-full h-screen flex items-center justify-center bg-gray-100">Chargement de la carte...</div>
});

export default function MapDignePage() {
  return (
    <div className="w-full h-screen flex flex-col">
      <header className="bg-white shadow-md p-4 z-10">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Route Tracer - Digne-les-Bains</h1>
            <p className="text-sm text-gray-600">Tracez votre itinéraire de course à pied et calculez la distance</p>
          </div>
          <Link href="/" className="text-blue-600 hover:text-blue-800">← Retour</Link>
        </div>
      </header>

      <div className="flex-1 overflow-hidden">
        <MapComponent />
      </div>
    </div>
  );
}
