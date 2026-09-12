export default function ResuLensLogo({ className = "w-5 h-5" }) {
  return (
    <svg 
      className={className} 
      viewBox="0 0 24 24" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Outer document / lens boundary */}
      <path 
        d="M14 2H6C4.89543 2 4 2.89543 4 4V20C4 21.1046 4.89543 22 6 22H18C19.1046 22 20 21.1046 20 20V8L14 2Z" 
        fill="url(#paint0_linear)" 
        fillOpacity="0.2"
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
      {/* Document fold */}
      <path 
        d="M14 2V8H20" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
      {/* Inner AI "Lens" / Search Sparkle element */}
      <circle cx="11" cy="13" r="3" stroke="#38bdf8" strokeWidth="2" />
      <path d="M13.5 15.5L17 19" stroke="#38bdf8" strokeWidth="2" strokeLinecap="round" />
      
      <defs>
        <linearGradient id="paint0_linear" x1="4" y1="2" x2="20" y2="22" gradientUnits="userSpaceOnUse">
          <stop stopColor="#6366f1" />
          <stop offset="1" stopColor="#38bdf8" />
        </linearGradient>
      </defs>
    </svg>
  );
}