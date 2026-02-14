import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import './AudioPlayer.css';

const CustomAudioPlayer = ({ src, title, artist }) => {
    return (
        <div className="custom-audio-player">
            <div className="audio-info">
                <h4>{title}</h4>
                {artist && <p className="artist-name">{artist}</p>}
            </div>
            <AudioPlayer
                src={src}
                autoPlay={false}
                showJumpControls={false}
                customAdditionalControls={[]}
                customVolumeControls={[]}
                layout="horizontal-reverse"
                style={{
                    borderRadius: '12px',
                    backgroundColor: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    boxShadow: 'none'
                }}
            />
        </div>
    );
};

export default CustomAudioPlayer;
