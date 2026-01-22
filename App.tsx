
import React, { useState, useEffect } from 'react';
import { Screen } from './types';
import Welcome from './components/Screens/Welcome';
import Home from './components/Screens/Home';
import Invitation from './components/Screens/Invitation';
import Schedule from './components/Screens/Schedule';
import { generateGreeting } from './services/geminiService';

const App: React.FC = () => {
  const [guestName, setGuestName] = useState<string>('');
  const [currentScreen, setCurrentScreen] = useState<Screen>(Screen.WELCOME);
  const [personalizedWish, setPersonalizedWish] = useState<string>('');
  const [loadingGreeting, setLoadingGreeting] = useState<boolean>(false);
  const [isMusicPlaying, setIsMusicPlaying] = useState<boolean>(false);
  const [hasStarted, setHasStarted] = useState<boolean>(false);

  // Kiểm tra tên từ URL khi tải trang
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const nameFromUrl = params.get('name');
    if (nameFromUrl) {
      handleStart(nameFromUrl);
    }
  }, []);

  const handleStart = async (name: string) => {
    setGuestName(name);
    setLoadingGreeting(true);
    setCurrentScreen(Screen.HOME);
    setHasStarted(true);
    setIsMusicPlaying(true);
    
    // Cập nhật URL mà không reload trang
    const newUrl = `${window.location.origin}${window.location.pathname}?name=${encodeURIComponent(name)}`;
    window.history.pushState({ path: newUrl }, '', newUrl);

    // Fetch personalized greeting from Gemini
    const wish = await generateGreeting(name);
    setPersonalizedWish(wish);
    setLoadingGreeting(false);
  };

  const navigate = (screen: Screen) => {
    setCurrentScreen(screen);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toggleMusic = () => {
    setIsMusicPlaying(!isMusicPlaying);
  };

  const copyShareLink = () => {
    const shareUrl = `${window.location.origin}${window.location.pathname}?name=${encodeURIComponent(guestName)}`;
    navigator.clipboard.writeText(shareUrl).then(() => {
      alert('Đã sao chép link cá nhân hóa cho ' + guestName + '!');
    });
  };

  return (
    <main className="min-h-screen flex justify-center items-center p-4 relative bg-[#f4f7f9]">
      {/* Background Music Player (Hidden YouTube Embed) */}
      {hasStarted && (
        <div className="fixed -top-full left-0 opacity-0 pointer-events-none">
          <iframe
            width="560"
            height="315"
            src={`https://www.youtube.com/embed/h-_6yWsfGCI?autoplay=1&loop=1&playlist=h-_6yWsfGCI&controls=0&mute=${isMusicPlaying ? '0' : '1'}`}
            title="Background Music"
            allow="autoplay"
          ></iframe>
        </div>
      )}

      {/* Control Buttons (Fixed bottom) */}
      {hasStarted && (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
          {/* Nút Chia sẻ link */}
          <button
            onClick={copyShareLink}
            className="bg-white/90 backdrop-blur-sm p-3 rounded-full shadow-xl border border-[#c5a059] hover:scale-110 transition-transform text-[#1a365d]"
            title="Sao chép link chia sẻ"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
            </svg>
          </button>
          
          {/* Nút Âm nhạc */}
          <button
            onClick={toggleMusic}
            className="bg-white/90 backdrop-blur-sm p-3 rounded-full shadow-xl border border-[#c5a059] hover:scale-110 transition-transform text-[#1a365d]"
            aria-label="Toggle Music"
          >
            {isMusicPlaying ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
              </svg>
            )}
          </button>
        </div>
      )}

      <div className="w-full max-w-lg transition-all duration-500 ease-in-out">
        {currentScreen === Screen.WELCOME && (
          <Welcome onStart={handleStart} />
        )}
        {currentScreen === Screen.HOME && (
          <Home 
            guestName={guestName} 
            loading={loadingGreeting}
            onNavigate={navigate} 
          />
        )}
        {currentScreen === Screen.INVITATION && (
          <Invitation 
            personalizedWish={personalizedWish}
            onNavigate={navigate} 
          />
        )}
        {currentScreen === Screen.SCHEDULE && (
          <Schedule 
            guestName={guestName}
            onNavigate={navigate} 
          />
        )}
      </div>
    </main>
  );
};

export default App;
