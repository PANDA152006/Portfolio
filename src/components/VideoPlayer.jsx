import { useState } from 'react';

const VideoPlayer = ({ src, poster, title }) => {
    const [isPlaying, setIsPlaying] = useState(false);

    return (
        <div style={{
            width: '100%',
            borderRadius: '12px',
            overflow: 'hidden',
            border: '1px solid rgba(255,255,255,0.1)',
            backgroundColor: 'rgba(0,0,0,0.3)'
        }}>
            {title && (
                <div style={{
                    padding: '1rem',
                    backgroundColor: 'rgba(255,255,255,0.05)',
                    borderBottom: '1px solid rgba(255,255,255,0.1)'
                }}>
                    <h4 style={{ margin: 0, fontSize: '1.1rem', color: 'var(--text-primary)' }}>
                        {title}
                    </h4>
                </div>
            )}
            <video
                controls
                poster={poster}
                style={{
                    width: '100%',
                    display: 'block',
                    backgroundColor: '#000'
                }}
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
            >
                <source src={src} type="video/mp4" />
                Your browser does not support the video tag.
            </video>
        </div>
    );
};

export default VideoPlayer;
