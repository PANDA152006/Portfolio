import { useState, useEffect, useCallback } from 'react';

export const useGyroscope = () => {
    const [orientation, setOrientation] = useState({ x: 0, y: 0, z: 0 });
    const [isSupported, setIsSupported] = useState(false);
    const [hasPermission, setHasPermission] = useState(false);
    const [isListening, setIsListening] = useState(false);

    useEffect(() => {
        // Check if DeviceOrientation API is supported
        if (typeof DeviceOrientationEvent !== 'undefined') {
            setIsSupported(true);

            // Auto-start for Android and older iOS (no permission needed)
            if (typeof DeviceOrientationEvent.requestPermission !== 'function') {
                setHasPermission(true);
            }
        }
    }, []);

    const handleOrientation = useCallback((event) => {
        // beta: front-to-back tilt (-180 to 180)
        // gamma: left-to-right tilt (-90 to 90)
        // alpha: compass direction (0 to 360)

        if (event.beta !== null && event.gamma !== null) {
            // Normalize values to -1 to 1 range
            const x = Math.max(-1, Math.min(1, (event.gamma || 0) / 45)); // -1 to 1
            const y = Math.max(-1, Math.min(1, (event.beta - 45) / 45));  // Offset beta by 45 for better center
            const z = (event.alpha || 0) / 360; // 0 to 1

            setOrientation({ x, y, z });
        }
    }, []);

    const requestPermission = async () => {
        // iOS 13+ requires explicit permission
        if (typeof DeviceOrientationEvent !== 'undefined' &&
            typeof DeviceOrientationEvent.requestPermission === 'function') {
            try {
                const permission = await DeviceOrientationEvent.requestPermission();
                if (permission === 'granted') {
                    setHasPermission(true);
                    setIsListening(true);
                }
            } catch (error) {
                console.error('Error requesting device orientation permission:', error);
            }
        } else {
            // Android and older iOS don't require permission
            setHasPermission(true);
            setIsListening(true);
        }
    };

    useEffect(() => {
        if (isSupported && hasPermission && !isListening) {
            setIsListening(true);
        }
    }, [isSupported, hasPermission]);

    useEffect(() => {
        if (isListening) {
            window.addEventListener('deviceorientation', handleOrientation, true);

            return () => {
                window.removeEventListener('deviceorientation', handleOrientation, true);
            };
        }
    }, [isListening, handleOrientation]);

    return {
        orientation,
        isSupported,
        hasPermission,
        requestPermission,
        isListening
    };
};

export default useGyroscope;
