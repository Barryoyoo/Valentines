import React from 'react';
import HeartAudioPlayer from '../components/HeartAudioPlayer.jsx';

export default function YesPage() {
  return (
    <div className="yes-page">
      <div className="yes-page__bg-hearts" />
      <div className="yes-page__roses">
        <div className="rose rose--tl" />
        <div className="rose rose--tr" />
        <div className="rose rose--bl" />
        <div className="rose rose--br" />
      </div>

      <div className="yes-page__content">
        <div className="letter-card">
          <div className="letter-card__border" />
          <div className="letter-card__header">
            <span className="letter-card__tag">For Echo</span>
            {/*<span className="letter-card__date">Valentine&apos;s Day</span>*/}
          </div>

          <div className="letter-card__body">
            <p>Dear Zari,</p>

            <p>
              From the moment we met, something in me shifted — like the stars aligned just to bring you into my orbit.
              Your smile lights up my world, your laughter is my favorite melody, and your presence makes everything feel
              right.
            </p>

            <p>
              I’ve watched you grow, shine, and love with such grace that I can’t help but fall deeper every day. You
              are my muse, my calm, my spark — and I wouldn’t trade this feeling for anything.
            </p>

            <p>
              So today, I ask not just with words, but with all my heart:
              <br />
              <strong>Will you be my Valentine?</strong>
            </p>

            <p>
              I love you more than words can say, and I promise to keep showing it in every little way.
            </p>

            <p className="letter-card__signature">
              Always,
              <br />
              <span>Barrack</span>
            </p>
          </div>

          <div className="letter-card__footer">
            <span className="letter-card__stamp">Sealed with love 💌</span>
          </div>
        </div>

        <div className="yes-page__side">
          {/*<HeartAudioPlayer />*/}
          <div className="floating-hearts">
            {Array.from({ length: 10 }).map((_, idx) => (
              <span key={idx} className={`floating-heart floating-heart--${(idx % 5) + 1}`} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

