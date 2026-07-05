'use client';

import React from 'react';
import MuxPlayer from '@mux/mux-player-react';

interface MuxBackgroundVideoProps {
  playbackId?: string;
  thumbTime?: number;
  fallbackUrl?: string;
}

export function MuxBackgroundVideo({ playbackId, thumbTime, fallbackUrl }: MuxBackgroundVideoProps) {
  const posterTime = thumbTime !== undefined && thumbTime !== null ? thumbTime : 0;
  const posterUrl = playbackId
    ? `https://image.mux.com/${playbackId}/thumbnail.png?time=${posterTime}&width=1920&fit_mode=preserve`
    : fallbackUrl;

  if (!playbackId) {
    if (fallbackUrl) {
      return (
        <video
          autoPlay
          loop
          muted
          playsInline
          style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.78 }}
        >
          <source src={fallbackUrl} type="video/mp4" />
        </video>
      );
    }
    return null;
  }

  return (
    <MuxPlayer
      playbackId={playbackId}
      streamType="on-demand"
      autoPlay="muted"
      muted
      loop
      playsInline
      thumbnailTime={posterTime}
      poster={posterUrl}
      style={{
        width: '100%',
        height: '100%',
        opacity: 0.78,
        display: 'block',
        pointerEvents: 'none', // Prevents any clicking/hover interactions on the player
        '--controls': 'none',  // Hides the timeline and play/pause controls
        '--chrome': 'none',    // Hides any additional browser chrome/overlays
        '--media-object-fit': 'cover', // Sets object-fit on the internal video element
        '--media-object-position': 'center',
      } as any}
    />
  );
}
