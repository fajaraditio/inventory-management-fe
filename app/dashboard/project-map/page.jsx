'use client';

import B2BProjectService from "@/app/lib/services/B2BProjectService";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { AdvancedMarker, APIProvider, ControlPosition, InfoWindow, Map, MapControl, Pin, useAdvancedMarkerRef, useMap, useMapsLibrary } from "@vis.gl/react-google-maps";
import { useFormatter, useTranslations } from "next-intl";
import { useCallback, useEffect, useRef, useState } from "react";

const AdvancedMarkerWithRef = (props) => {
    const { children, onMarkerClick, ...advancedMarkerProps } = props;
    const [markerRef, marker] = useAdvancedMarkerRef();

    return (
        <AdvancedMarker
            onClick={() => {
                if (marker) {
                    onMarkerClick(marker);
                }
            }}
            ref={markerRef}
            {...advancedMarkerProps}>
            {children}
        </AdvancedMarker>
    );
};

const PlaceAutocomplete = ({ onPlaceSelect }) => {
    const [placeAutocomplete, setPlaceAutocomplete] = useState(null);
    const inputRef = useRef(null);
    const places = useMapsLibrary("places");

    useEffect(() => {
        if (!places || !inputRef.current) return;

        const options = {
            fields: ["geometry", "name", "formatted_address"],
        };

        setPlaceAutocomplete(new places.Autocomplete(inputRef.current, options));
    }, [places]);

    useEffect(() => {
        if (!placeAutocomplete) return;

        placeAutocomplete.addListener("place_changed", () => {
            onPlaceSelect(placeAutocomplete.getPlace());
        });
    }, [onPlaceSelect, placeAutocomplete]);

    return (
        <div className="autocomplete-container p-2">
            <Input ref={inputRef} className="w-screen" />
        </div>
    );
};

const MapHandler = ({ place, marker }) => {
    const map = useMap();

    useEffect(() => {
        if (!map || !place || !marker) return;

        if (place.geometry?.viewport) {
            map.fitBounds(place.geometry?.viewport);
        }

        marker.position = place.geometry?.location;
    }, [map, place, marker]);

    return null;
};

const ProjectMapPage = () => {
    const t = useTranslations('ProjectMapPage');
    const formatter = useFormatter();

    const [markerRef, marker] = useAdvancedMarkerRef();

    const [dataset, setDataset] = useState(null);
    const [selectedMarker, setSelectedMarker] = useState(null);
    const [mapMarkers, setMapMarkers] = useState([]);
    const [infoWindowShown, setInfoWindowShown] = useState(false);
    const [selectedPlace, setSelectedPlace] = useState(null);

    useEffect(() => async () => {
        let response = await B2BProjectService.fetch();

        let datasetMarkers = [];

        for (let i = 0; i < response.data.length; i++) {
            datasetMarkers.push({
                id: i,
                position: {
                    lat: parseFloat(response.data[i].latitude),
                    lng: parseFloat(response.data[i].longitude)
                },
                zIndex: i,
                type: 'html'
            });
        }

        setMapMarkers(datasetMarkers);
    }, []);

    const onMarkerClick = useCallback(async (id, marker) => {
        if (id) {
            let response = await B2BProjectService.fetchId(id);

            setDataset(response.data);
        }

        if (marker) {
            setSelectedMarker(marker);
        }

        setInfoWindowShown((isShown) => !isShown);
    }, []);

    const handleInfowindowCloseClick = useCallback(() => setInfoWindowShown(false), []);

    return (
        <>
            <div className="flex flex-col gap-6">
                <h1 className="font-medium text-2xl">{t('title')}</h1>

                <Separator></Separator>

                <div className="flex flex-col justify-center items-center">
                    <APIProvider apiKey={process.env.mapsAPIKey} solutionChannel="GMP_devsite_samples_v3_rgmautocomplete">
                        <Map
                            defaultZoom={12}
                            defaultCenter={{ lat: -6.1150, lng: 106.8283 }}
                            mapId={'92c7fc4dafbb50c6'}
                            style={{ height: '500px' }}
                            gestureHandling={'greedy'}
                            disableDefaultUI={true}
                        >
                            <AdvancedMarker ref={markerRef} position={null} />
                            {
                                mapMarkers.map(({ id, zIndex, position, type }) => {
                                    return (
                                        <AdvancedMarkerWithRef
                                            key={id}
                                            zIndex={zIndex}
                                            className="custom-marker"
                                            position={position}
                                            onMarkerClick={(marker) => onMarkerClick(id, marker)}>
                                            <Pin background={'#15489B'} glyphColor={'#fff'} borderColor={'#15489B'}></Pin>
                                        </AdvancedMarkerWithRef>
                                    )
                                })
                            }
                        </Map>
                        <MapControl position={ControlPosition.TOP_LEFT}>
                            <PlaceAutocomplete onPlaceSelect={setSelectedPlace} />
                        </MapControl>
                        <MapHandler place={selectedPlace} marker={marker} />
                        {infoWindowShown && selectedMarker && (
                            <InfoWindow
                                anchor={selectedMarker}
                                pixelOffset={[0, -2]}
                                onCloseClick={handleInfowindowCloseClick}>
                                <h2 className="font-medium">{dataset?.project_code}</h2>
                                <h1 className="font-medium text-lg">{dataset?.project_name}</h1>
                                <p className="mb-3">{dataset?.detail_address}</p>
                                <p>Salesman: {dataset?.salesman_name}</p>
                                <p>Total Amount: {formatter.number(dataset?.total_amount, { style: 'currency', currencyDisplay: 'narrowSymbol', currency: 'IDR', maximumFractionDigits: 0 })}</p>
                            </InfoWindow>
                        )}
                    </APIProvider>

                </div>
            </div>
        </>
    );
}

export default ProjectMapPage;