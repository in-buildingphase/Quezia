export default function LaptopMockup() {
  return (
    <section className="py-10 relative overflow-hidden">
      
        {/* Laptop Mockup */}
        <div className="flex items-center justify-center">
          <div className="relative w-[95%] max-w-7xl aspect-[16/10] rounded-2xl shadow-2xl border-4 border-gray-700 bg-black overflow-hidden">
            
            {/* Top Navigation (macOS style bar) */}
            <div className="absolute top-0 left-0 w-full h-8 bg-gray-800 flex items-center justify-start px-3 text-white text-xs">
              <div className="flex space-x-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
            </div>

        

            {/* Bottom Dock */}
          </div>
        </div>
    </section>
  );
}
