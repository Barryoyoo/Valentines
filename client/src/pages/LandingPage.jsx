import React, { useMemo, useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

async function logClick(type) {
  try {
    await fetch('/api/log-click', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type })
    });
  } catch (err) {
    console.error('Click logging failed', err);
  }
}

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== 'undefined' ? window.innerWidth <= 768 : false
  );

  useEffect(() => {
    function handleResize() {
      setIsMobile(window.innerWidth <= 768);
    }
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return isMobile;
}

export default function LandingPage() {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const [noPos, setNoPos] = useState({ top: null, left: null });
  const noButtonRef = useRef(null);

  useEffect(() => {
    if (isMobile) return;
    // Set an initial pixel-based position so transitions between positions are smooth
    const initialTop = window.innerHeight * 0.6;
    const initialLeft = window.innerWidth * 0.55;
    setNoPos({ top: initialTop, left: initialLeft });
  }, [isMobile]);

  const containerStyle = useMemo(
    () => ({
      minHeight: '100vh',
      backgroundColor: '#FFC0CB',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: "'Quicksand', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      padding: '16px'
    }),
    []
  );

  const cardStyle = useMemo(
    () => ({
      position: 'relative',
      maxWidth: '720px',
      width: '100%',
      backgroundColor: 'rgba(255, 255, 255, 0.9)',
      borderRadius: '24px',
      padding: '40px 28px 48px',
      boxShadow: '0 24px 60px rgba(255, 105, 180, 0.35)',
      textAlign: 'center',
      overflow: 'hidden'
    }),
    []
  );

  const titleStyle = useMemo(
    () => ({
      fontFamily: "'Dancing Script', cursive",
      fontSize: 'clamp(2.5rem, 6vw, 3.5rem)',
      color: '#C2185B',
      marginBottom: '24px'
    }),
    []
  );

  const subtitleStyle = useMemo(
    () => ({
      fontSize: '1rem',
      color: '#AD1457',
      maxWidth: '420px',
      margin: '0 auto 32px'
    }),
    []
  );

  const buttonsWrapperStyle = useMemo(
    () => ({
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '20px',
      marginTop: '12px',
      minHeight: '80px'
    }),
    []
  );

  const yesButtonStyle = useMemo(
    () => ({
      padding: '12px 32px',
      borderRadius: '999px',
      border: 'none',
      background: 'linear-gradient(135deg, #F50057, #FF4081)',
      color: '#fff',
      fontWeight: 600,
      letterSpacing: '0.04em',
      textTransform: 'uppercase',
      cursor: 'pointer',
      boxShadow: '0 12px 30px rgba(244, 67, 54, 0.45)',
      transition: 'transform 0.15s ease, box-shadow 0.15s ease, background 0.15s ease',
      fontSize: '0.9rem'
    }),
    []
  );

  const noButtonBaseStyle = useMemo(
    () => ({
      padding: '10px 26px',
      borderRadius: '999px',
      border: '2px solid #FF80AB',
      backgroundColor: 'white',
      color: '#C2185B',
      fontWeight: 500,
      letterSpacing: '0.03em',
      textTransform: 'uppercase',
      cursor: 'pointer',
      boxShadow: '0 8px 18px rgba(244, 143, 177, 0.5)',
      transition:
        'transform 0.25s ease-out, box-shadow 0.25s ease-out, left 0.4s ease-out, top 0.4s ease-out',
      fontSize: '0.8rem'
    }),
    []
  );

  function handleYes() {
    logClick('yes');
    navigate('/yes');
  }

  function handleNoClick() {
    if (isMobile) {
      logClick('no');
      alert('Sorry, please try again');
      navigate('/');
    }
  }

  function moveNoButton() {
    if (isMobile || !noButtonRef.current) return;

    const btnRect = noButtonRef.current.getBoundingClientRect();
    const padding = 32;
    const vw = window.innerWidth;
    const vh = window.innerHeight;

    const maxLeft = vw - btnRect.width - padding;
    const maxTop = vh - btnRect.height - padding;

    const newLeft = Math.random() * (maxLeft - padding) + padding;
    const newTop = Math.random() * (maxTop - padding) + padding;

    setNoPos({
      top: newTop,
      left: newLeft
    });
  }

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <div className="lp-glow lp-glow--left" />
        <div className="lp-glow lp-glow--right" />
        <div className="lp-floating-hearts" />

        <h1 style={titleStyle}>Hello Zari, will you be my Valentine?</h1>
        <p style={subtitleStyle}>
          I tried to make this button say &quot;No&quot;... but it seems the universe keeps pushing us back to
          &quot;Yes&quot;. Maybe it&apos;s a sign.
        </p>

        <div style={buttonsWrapperStyle}>
          <button
            type="button"
            style={yesButtonStyle}
            className="lp-yes-button"
            onClick={handleYes}
          >
            Yes 💘
          </button>

          <button
            ref={noButtonRef}
            type="button"
            style={{
              ...noButtonBaseStyle,
              position: isMobile ? 'static' : 'fixed',
              top: isMobile ? undefined : noPos.top != null ? `${noPos.top}px` : '60%',
              left: isMobile ? undefined : noPos.left != null ? `${noPos.left}px` : '55%'
            }}
            className="lp-no-button"
            onClick={handleNoClick}
            onMouseEnter={moveNoButton}
          >
            No 🙈
          </button>
        </div>
      </div>
    </div>
  );
}

