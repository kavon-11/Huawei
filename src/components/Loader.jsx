import React from 'react';
import PropTypes from 'prop-types';

const Loader = ({
    size = 48,
    color = '#0d6efd',
    thickness = 4,
    label = 'Loading...',
    fullScreen = false,
    className = '',
    style
}) => {
    const wrapperStyle = fullScreen
        ? {
                position: 'fixed',
                inset: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'rgba(255,255,255,0.6)',
                zIndex: 9999
            }
        : {};

    const spinnerSize = size;
    const radius = (spinnerSize - thickness) / 2;
    const circumference = 2 * Math.PI * radius;

    return (
        <div
            className={`loader-wrapper ${className}`}
            style={{ ...wrapperStyle, ...style }}
            role="status"
            aria-live="polite"
            aria-label={label}
        >
            <div style={{ display: 'inline-flex', flexDirection: 'column', alignItems: 'center' }}>
                <svg
                    width={spinnerSize}
                    height={spinnerSize}
                    viewBox={`0 0 ${spinnerSize} ${spinnerSize}`}
                    style={{ animation: 'spin 1s linear infinite' }}
                >
                    <circle
                        cx={spinnerSize / 2}
                        cy={spinnerSize / 2}
                        r={radius}
                        fill="none"
                        stroke={color}
                        strokeWidth={thickness}
                        strokeLinecap="round"
                        strokeDasharray={circumference}
                        strokeDashoffset={circumference * 0.25}
                    />
                </svg>
                {label && (
                    <span
                        style={{
                            marginTop: 8,
                            fontSize: Math.max(12, size * 0.25),
                            color: '#333'
                        }}
                    >
                        {label}
                    </span>
                )}
            </div>
            <style>
                {`
                    @keyframes spin {
                        0% { transform: rotate(0deg); }
                        100% { transform: rotate(360deg); }
                    }
                `}
            </style>
        </div>
    );
};

Loader.propTypes = {
    size: PropTypes.number,
    color: PropTypes.string,
    thickness: PropTypes.number,
    label: PropTypes.string,
    fullScreen: PropTypes.bool,
    className: PropTypes.string,
    style: PropTypes.object
};

export default Loader;