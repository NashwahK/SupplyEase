const Scale = ({ title, percentage }) => {
  // Clamp percentage between 0 and 100
  const clamped = Math.min(Math.max(percentage, 0), 100);
  const radius = 60;
  const circumference = Math.PI * radius;

  const progress = (clamped / 100) * circumference;

  return (
    <div className="bg-[#2E2047] p-4 rounded-xl text-white shadow-md w-full">
      <h3 className="text-lg font-semibold mb-4 p-2">{title}</h3>
      <div className="relative w-40 h-20 mx-auto">
        <svg width="100%" height="100%" viewBox="0 0 160 80">
          {/* Background arc (white or gray) */}
          <path
            d="M 20 80 A 60 60 0 0 1 140 80"
            fill="none"
            stroke="#e5e7eb" 
            strokeWidth="35"
          />
          {/* Progress arc */}
          <path
            d="M 20 80 A 60 60 0 0 1 140 80"
            fill="none"
            stroke="#4ACBAE"
            strokeWidth="35"
            strokeDasharray={circumference}
            strokeDashoffset={circumference - progress}
            strokeLinecap="round"
          />
        </svg>
      </div>
      <p className="text-center text-3xl font-bold mt-8">{clamped}%</p>
      <p className="text-center text-sm text-gray-400">orders shipped on time</p>
    </div>
  );
};

export default Scale;
