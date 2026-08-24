import React from 'react';

/**
 * Geometric Diamond Bullet Component
 * Implements 'The Centered Horizon' design requirement for diamond list markers
 */
export const DiamondBullet = ({ size = 8, color = 'var(--accent-cyan)' }) => {
  return (
    <span className="diamond-bullet" aria-hidden="true">
      <span
        className="diamond-bullet-shape"
        style={{
          width: `${size}px`,
          height: `${size}px`,
        }}
      />
    </span>
  );
};

/**
 * Horizon Geometric Axis Divider
 * Symmetrical horizontal divider with diamond cluster
 */
export const HorizonDivider = ({ text = '' }) => {
  return (
    <div className="horizon-divider" role="separator">
      <div className="horizon-line" />
      <div className="horizon-diamond-cluster">
        <span className="horizon-diamond subtle" />
        <span className="horizon-diamond" />
        {text && <span style={{ fontSize: '0.8rem', fontWeight: 600, letterSpacing: '0.08em', color: 'var(--accent-cyan)', textTransform: 'uppercase' }}>{text}</span>}
        <span className="horizon-diamond" />
        <span className="horizon-diamond subtle" />
      </div>
      <div className="horizon-line" />
    </div>
  );
};

export default DiamondBullet;
