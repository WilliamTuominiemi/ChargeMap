'use client';

import { GoogleMap, Marker, Circle } from '@react-google-maps/api';
import React, { useState, useRef, useCallback } from 'react';

export const defaultMapContainerStyle = {
  width: '100%',
  height: '100vh',
};

const range = 50000;

const defaultMapCenter = new google.maps.LatLng(60.192059, 24.945831);

const defaultMapZoom = 7;

const defaultMapOptions = {
  mapId: process.env.MAP_ID,
  disableDefaultUI: true,
  zoomControl: true,
};

const MapComponent = () => {
  const [markerCoord, setMarkerCoord] = useState<google.maps.LatLng | null>(null);
  const [circle, setCircle] = useState<google.maps.Circle | null>(null);
  const mapRef = useRef<google.maps.Map | null>(null);

  const onMapClick = (e: google.maps.MapMouseEvent) => {
    if (e.latLng) {
      const coordinate = new google.maps.LatLng(e.latLng.lat(), e.latLng.lng());

      setMarkerCoord(coordinate);

      if (circle) {
        circle.setMap(null);
      }

      const newCircle = new window.google.maps.Circle({
        strokeColor: '#949494',
        strokeOpacity: 0.5,
        strokeWeight: 0.5,
        fillColor: '#AA98A9',
        fillOpacity: 0.1,
        radius: range,
        center: coordinate,
        clickable: false,
        map: mapRef.current,
      });

      setCircle(newCircle);
    }
  };

  const onLoad = (map: google.maps.Map): void => {
    mapRef.current = map;
  };

  return (
    <div className="w-full">
      <GoogleMap
        mapContainerStyle={defaultMapContainerStyle}
        center={defaultMapCenter}
        zoom={defaultMapZoom}
        options={defaultMapOptions}
        onClick={onMapClick}
        onLoad={onLoad}
      >
        {markerCoord && (
          <>
            <Marker
              position={markerCoord}
              icon={{
                url: 'https://maps.google.com/mapfiles/ms/icons/blue-dot.png',
                scaledSize: new window.google.maps.Size(20, 20),
              }}
            />
          </>
        )}
      </GoogleMap>
    </div>
  );
};

export { MapComponent };
