

const Footer = () => {
    return (
      <footer className="bg-[#0B1D3C] text-white py-8 px-4">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Left Section */}
          <div>
            <h2 className="font-bold text-xl">Telangana Police</h2>
            <h3 className="font-bold text-lg">Women Safety Wing</h3>
            <p className="mt-2 flex items-center gap-2">📍 Lakdikapool, Hyderabad - 500004</p>
            <p className="flex items-center gap-2">☎️ 040-27852246</p>
            <p className="flex items-center gap-2">📱 8712656858</p>
            <p className="flex items-center gap-2">📲 8712656858</p>
          </div>
  
          {/* Middle Section */}
          <div>
            <h2 className="font-bold text-lg">Get Help</h2>
            <ul className="mt-2 space-y-1">
              <li>Get help by issue</li>
              <li>Get help by location</li>
              <li>Contact Us</li>
            </ul>
            <h2 className="font-bold text-lg mt-4">Key Telangana Websites</h2>
            <ul className="mt-2 space-y-1">
              <li>Telangana Police Website</li>
              <li>Telangana State Website</li>
            </ul>
          </div>
  
          {/* Right Section */}
          <div>
            <h2 className="font-bold text-lg">Quick Links</h2>
            <ul className="mt-2 space-y-1">
              <li>About Us</li>
              <li>Get Involved</li>
              <li>Support Bharosa Society</li>
              <li>Careers</li>
              <li>T-Safe</li>
            </ul>
          </div>
        </div>
  
        {/* Bottom Copyright Section */}
        <div className="text-center text-sm mt-8 border-t border-gray-700 pt-4">
          All rights reserved © 2021 – 2025 | Telangana State Police – Women Safety Wing. Designed & maintained by Wundapix Technologies.
        </div>
      </footer>
    );
  };
  
  export default Footer;
  