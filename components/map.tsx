'use client';

import { GoogleMap, Marker } from '@react-google-maps/api';
import { useState } from 'react';

export const defaultMapContainerStyle = {
  width: '100%',
  height: '100vh',
};

const defaultMapCenter = new google.maps.LatLng(60.192059, 24.945831);

const defaultMapZoom = 7;

const defaultMapOptions = {
  mapId: '1c93ead7672f925d',
  disableDefaultUI: true,
  zoomControl: true,
};

const MapComponent = () => {
  const [markerCoord, setMarkerCoord] = useState<google.maps.LatLng>(defaultMapCenter);

  const onMapClick = (e: google.maps.MapMouseEvent) => {
    if (e.latLng) setMarkerCoord(new google.maps.LatLng(e.latLng.lat(), e.latLng.lng()));
  };

  return (
    <div className="w-full">
      <GoogleMap
        mapContainerStyle={defaultMapContainerStyle}
        center={defaultMapCenter}
        zoom={defaultMapZoom}
        options={defaultMapOptions}
        onClick={onMapClick}
      >
        <Marker
          position={markerCoord}
          icon={{
            url: 'https://maps.google.com/mapfiles/ms/icons/blue-dot.png',
            scaledSize: new window.google.maps.Size(40, 40),
          }}
        />
      </GoogleMap>
    </div>
  );
};

export { MapComponent };
