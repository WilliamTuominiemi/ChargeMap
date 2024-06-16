'use client';

import { GoogleMap } from '@react-google-maps/api';

export const defaultMapContainerStyle = {
  width: '100%',
  height: '100vh',
};

const defaultMapCenter = {
  lat: 60.192059,
  lng: 24.945831,
};

const defaultMapZoom = 7;

const defaultMapOptions = {
  mapId: '1c93ead7672f925d',
  disableDefaultUI: true,
  zoomControl: true,
};

const MapComponent = () => {
  return (
    <div className="w-full">
      <GoogleMap
        mapContainerStyle={defaultMapContainerStyle}
        center={defaultMapCenter}
        zoom={defaultMapZoom}
        options={defaultMapOptions}
      ></GoogleMap>
    </div>
  );
};

export { MapComponent };
