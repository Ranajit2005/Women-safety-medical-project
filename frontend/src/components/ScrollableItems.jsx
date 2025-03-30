import React, { useEffect, useRef, useState } from "react";

const AutoScrollBox = () => {
  const boxRef = useRef(null);
  const itemRef = useRef(null);
  const [itemWidth, setItemWidth] = useState(0);

  useEffect(() => {
    const box = boxRef.current;

    if (itemRef.current) {
      setItemWidth(itemRef.current.offsetWidth); // Width + margin  
    }

    const scrollBox = () => {
      if (box) {
        box.scrollBy({ left: itemWidth, behavior: "smooth" });
        if (box.scrollLeft + box.clientWidth >= box.scrollWidth) {
          box.scrollTo({ left: 0, behavior: "smooth" });
        }
      }
    };

    const interval = setInterval(scrollBox, 5000);
    return () => clearInterval(interval);
  }, [itemWidth]);

  // Fixed width for all items (adjust as needed)
  const itemStyle = "w-[270px] sm:w-[450px]"; 

  return (
    <div
      ref={boxRef}
      className="flex overflow-x-auto my-1 sm:my-3 rounded-lg w-full scrollbar-hide"
    >
      <div className="flex space-x-4">

        {/* Item 1 (with measurement ref) */}
        <div
          ref={itemRef}
          className={`bg-[#fa86cf] text-black rounded-lg h-72 overflow-auto ${itemStyle} shadow-lg`}
        >
          
          <div className="flex flex-col pl-1 pt-3 sm:pl-5">
            <h1 className="pb-4 text-2xl sm:text-3xl"> 𝙈𝙔𝙏𝙃: "𝙔𝙤𝙪 𝘾𝙖𝙣’𝙩 𝙂𝙚𝙩 𝙋𝙧𝙚𝙜𝙣𝙖𝙣𝙩 𝘿𝙪𝙧𝙞𝙣𝙜 𝙔𝙤𝙪𝙧 𝙋𝙚𝙧𝙞𝙤𝙙."</h1>
            <p className="text-justify pr-5 pt-1">
            🔥 𝑻𝑯𝑬 𝑻𝑹𝑼𝑻𝑯: 𝑻𝒉𝒊𝒏𝒌 𝒂𝒈𝒂𝒊𝒏! 𝑺𝒑𝒆𝒓𝒎 𝒄𝒂𝒏 𝒔𝒖𝒓𝒗𝒊𝒗𝒆 𝒇𝒐𝒓 𝒖𝒑 𝒕𝒐 5 𝒅𝒂𝒚𝒔 𝒊𝒏𝒔𝒊𝒅𝒆 𝒕𝒉𝒆 𝒃𝒐𝒅𝒚. 𝑰𝒇 𝒚𝒐𝒖 𝒐𝒗𝒖𝒍𝒂𝒕𝒆 𝒆𝒂𝒓𝒍𝒚, 𝒑𝒓𝒆𝒈𝒏𝒂𝒏𝒄𝒚 𝒄𝒂𝒏 𝒔𝒕𝒊𝒍𝒍 𝒉𝒂𝒑𝒑𝒆𝒏—𝒆𝒗𝒆𝒏 𝒓𝒊𝒈𝒉𝒕 𝒂𝒇𝒕𝒆𝒓 𝒚𝒐𝒖𝒓 𝒑𝒆𝒓𝒊𝒐𝒅 𝒆𝒏𝒅𝒔. 𝑫𝒐𝒏’𝒕 𝒕𝒂𝒌𝒆 𝒕𝒉𝒆 𝒓𝒊𝒔𝒌! <br/> 🔍 𝑹𝒆𝒂𝒍𝒊𝒕𝒚 𝒄𝒉𝒆𝒄𝒌: 𝑼𝒔𝒆 𝒑𝒓𝒐𝒕𝒆𝒄𝒕𝒊𝒐𝒏 𝒆𝒗𝒆𝒓𝒚 𝒕𝒊𝒎𝒆, 𝒏𝒐 𝒎𝒂𝒕𝒕𝒆𝒓 𝒘𝒉𝒆𝒏!         </p>
          </div>
        </div>




        <div
          ref={itemRef}
          className={`bg-[#fa86cf] text-black rounded-lg h-72 overflow-auto ${itemStyle} shadow-lg`}
        >
          
          <div className="flex flex-col pl-1 pt-3 sm:pl-5">
            <h1 className="pb-5 text-2xl sm:text-3xl"> 𝙈𝙔𝙏𝙃: "𝙑𝙖𝙜𝙞𝙣𝙖𝙡 𝘿𝙞𝙨𝙘𝙝𝙖𝙧𝙜𝙚 = 𝙄𝙣𝙛𝙚𝙘𝙩𝙞𝙤𝙣."</h1>
            <p className="text-justify pr-5 pt-1">
            💡 𝑻𝑯𝑬 𝑻𝑹𝑼𝑻𝑯: 𝑵𝒐𝒑𝒆! 𝑵𝒐𝒓𝒎𝒂𝒍 𝒅𝒊𝒔𝒄𝒉𝒂𝒓𝒈𝒆 𝒊𝒔 𝒚𝒐𝒖𝒓 𝒃𝒐𝒅𝒚’𝒔 𝒏𝒂𝒕𝒖𝒓𝒂𝒍 𝒔𝒆𝒍𝒇-𝒄𝒍𝒆𝒂𝒏𝒊𝒏𝒈 𝒔𝒚𝒔𝒕𝒆𝒎. 𝑰𝒕 𝒌𝒆𝒆𝒑𝒔 𝒚𝒐𝒖𝒓 𝒗𝒂𝒈𝒊𝒏𝒂 𝒉𝒆𝒂𝒍𝒕𝒉𝒚!<br/>  🚨 𝑾𝒉𝒆𝒏 𝒕𝒐 𝒘𝒐𝒓𝒓𝒚: 𝑰𝒇 𝒚𝒐𝒖𝒓 𝒅𝒊𝒔𝒄𝒉𝒂𝒓𝒈𝒆 𝒉𝒂𝒔 𝒂 𝒔𝒕𝒓𝒐𝒏𝒈 𝒔𝒎𝒆𝒍𝒍, 𝒐𝒅𝒅 𝒄𝒐𝒍𝒐𝒓, 𝒐𝒓 𝒄𝒂𝒖𝒔𝒆𝒔 𝒅𝒊𝒔𝒄𝒐𝒎𝒇𝒐𝒓𝒕, 𝒊𝒕 𝒎𝒊𝒈𝒉𝒕 𝒔𝒊𝒈𝒏𝒂𝒍 𝒂𝒏 𝒊𝒏𝒇𝒆𝒄𝒕𝒊𝒐𝒏—𝒔𝒆𝒆 𝒂 𝒅𝒐𝒄𝒕𝒐𝒓!...
            </p>
          </div>
        </div>






        <div
          ref={itemRef}
          className={`bg-[#fa86cf] text-black rounded-lg h-72 overflow-auto ${itemStyle} shadow-lg`}
        >
          
          <div className="flex flex-col pl-1 pt-3 sm:pl-5">
            <h1 className="pb-5 text-2xl sm:text-3xl"> 𝙈𝙔𝙏𝙃: "𝙒𝙚𝙖𝙧𝙞𝙣𝙜 𝙖 𝘽𝙧𝙖 24/7 𝙋𝙧𝙚𝙫𝙚𝙣𝙩𝙨 𝙎𝙖𝙜𝙜𝙞𝙣𝙜."</h1>
            <p className="text-justify pr-5 pt-1">
            🎭 𝑻𝑯𝑬 𝑻𝑹𝑼𝑻𝑯: 𝑩𝒓𝒂 𝒐𝒓 𝒏𝒐 𝒃𝒓𝒂, 𝒈𝒓𝒂𝒗𝒊𝒕𝒚 𝒂𝒏𝒅 𝒈𝒆𝒏𝒆𝒕𝒊𝒄𝒔 𝒅𝒆𝒄𝒊𝒅𝒆 𝒕𝒉𝒂𝒕 𝒇𝒐𝒓 𝒚𝒐𝒖! 𝑨𝒈𝒊𝒏𝒈, 𝒑𝒓𝒆𝒈𝒏𝒂𝒏𝒄𝒚, 𝒂𝒏𝒅 𝒄𝒐𝒍𝒍𝒂𝒈𝒆𝒏 𝒍𝒐𝒔𝒔 𝒂𝒓𝒆 𝒕𝒉𝒆 𝒓𝒆𝒂𝒍 𝒄𝒖𝒍𝒑𝒓𝒊𝒕𝒔—𝒏𝒐𝒕 𝒘𝒉𝒆𝒕𝒉𝒆𝒓 𝒚𝒐𝒖 𝒘𝒆𝒂𝒓 𝒂 𝒃𝒓𝒂 𝒂𝒍𝒍 𝒕𝒉𝒆 𝒕𝒊𝒎𝒆.<br/>  🛑 𝑺𝒐, 𝒘𝒆𝒂𝒓 𝒘𝒉𝒂𝒕 𝒎𝒂𝒌𝒆𝒔 𝒚𝒐𝒖 𝒇𝒆𝒆𝒍 𝒈𝒐𝒐𝒅! 𝑩𝒓𝒂𝒍𝒆𝒔𝒔? 𝑪𝒐𝒎𝒇𝒚. 𝑷𝒂𝒅𝒅𝒆𝒅? 𝑪𝒐𝒐𝒍. 𝑰𝒕’𝒔 𝒚𝒐𝒖𝒓 𝒄𝒉𝒐𝒊𝒄𝒆!...
            </p>
          </div>
        </div>





        <div
          ref={itemRef}
          className={`bg-[#fa86cf] text-black rounded-lg h-72 overflow-auto ${itemStyle} shadow-lg`}
        >
          
          <div className="flex flex-col pl-1 pt-3 sm:pl-5">
            <h1 className="pb-5 text-2xl sm:text-3xl"> 𝙈𝙔𝙏𝙃: "𝘾𝙤𝙡𝙙 𝘿𝙧𝙞𝙣𝙠𝙨 𝙈𝙖𝙠𝙚 𝙋𝙚𝙧𝙞𝙤𝙙 𝘾𝙧𝙖𝙢𝙥𝙨 𝙒𝙤𝙧𝙨𝙚."</h1>
            <p className="text-justify pr-5 pt-1">
            🍹 𝑻𝑯𝑬 𝑻𝑹𝑼𝑻𝑯: 𝑻𝒉𝒆𝒓𝒆’𝒔 𝒁𝑬𝑹𝑶 𝒔𝒄𝒊𝒆𝒏𝒕𝒊𝒇𝒊𝒄 𝒆𝒗𝒊𝒅𝒆𝒏𝒄𝒆 𝒃𝒆𝒉𝒊𝒏𝒅 𝒕𝒉𝒊𝒔! 𝒀𝒐𝒖𝒓 𝒖𝒕𝒆𝒓𝒖𝒔 𝒅𝒐𝒆𝒔𝒏’𝒕 𝒄𝒂𝒓𝒆 𝒊𝒇 𝒚𝒐𝒖 𝒅𝒓𝒊𝒏𝒌 𝒊𝒄𝒆-𝒄𝒐𝒍𝒅 𝒘𝒂𝒕𝒆𝒓 𝒐𝒓 𝒉𝒐𝒕 𝒕𝒆𝒂—𝒄𝒓𝒂𝒎𝒑𝒔 𝒉𝒂𝒑𝒑𝒆𝒏 𝒅𝒖𝒆 𝒕𝒐 𝒉𝒐𝒓𝒎𝒐𝒏𝒂𝒍 𝒄𝒐𝒏𝒕𝒓𝒂𝒄𝒕𝒊𝒐𝒏𝒔, 𝒏𝒐𝒕 𝒘𝒉𝒂𝒕’𝒔 𝒐𝒏 𝒚𝒐𝒖𝒓 𝒑𝒍𝒂𝒕𝒆. <br/> 🧊 𝑺𝒐 𝒈𝒐 𝒂𝒉𝒆𝒂𝒅—𝒅𝒓𝒊𝒏𝒌 𝒕𝒉𝒂𝒕 𝒊𝒄𝒆𝒅 𝒄𝒐𝒇𝒇𝒆𝒆!...
            </p>
          </div>
        </div>






        <div
          ref={itemRef}
          className={`bg-[#fa86cf] text-black rounded-lg h-72 overflow-auto ${itemStyle} shadow-lg`}
        >
          
          <div className="flex flex-col pl-1 pt-3 sm:pl-5">
            <h1 className="pb-4 text-2xl sm:text-3xl"> 𝙈𝙔𝙏𝙃: "𝙎𝙝𝙖𝙫𝙞𝙣𝙜 𝙈𝙖𝙠𝙚𝙨 𝙃𝙖𝙞𝙧 𝙂𝙧𝙤𝙬 𝘽𝙖𝙘𝙠 𝙏𝙝𝙞𝙘𝙠𝙚𝙧 & 𝘿𝙖𝙧𝙠𝙚𝙧."</h1>
            <p className="text-justify pr-5 pt-1">
            🪒 𝑻𝑯𝑬 𝑻𝑹𝑼𝑻𝑯: 𝑰𝒕 𝒐𝒏𝒍𝒚 𝒍𝒐𝒐𝒌𝒔 𝒕𝒉𝒂𝒕 𝒘𝒂𝒚! 𝑾𝒉𝒆𝒏 𝒚𝒐𝒖 𝒔𝒉𝒂𝒗𝒆, 𝒊𝒕 𝒄𝒖𝒕𝒔 𝒕𝒉𝒆 𝒉𝒂𝒊𝒓 𝒔𝒕𝒓𝒂𝒊𝒈𝒉𝒕 𝒂𝒄𝒓𝒐𝒔𝒔, 𝒎𝒂𝒌𝒊𝒏𝒈 𝒊𝒕 𝒂𝒑𝒑𝒆𝒂𝒓 𝒃𝒍𝒖𝒏𝒕 𝒂𝒏𝒅 𝒓𝒐𝒖𝒈𝒉. 𝑩𝒖𝒕 𝒊𝒕 𝒅𝒐𝒆𝒔𝒏’𝒕 𝒄𝒉𝒂𝒏𝒈𝒆 𝒕𝒉𝒊𝒄𝒌𝒏𝒆𝒔𝒔, 𝒄𝒐𝒍𝒐𝒓, 𝒐𝒓 𝒔𝒑𝒆𝒆𝒅 𝒐𝒇 𝒈𝒓𝒐𝒘𝒕𝒉.<br/>  🌟 𝑾𝒂𝒏𝒕 𝒔𝒎𝒐𝒐𝒕𝒉𝒆𝒓 𝒔𝒌𝒊𝒏? 𝑻𝒓𝒚 𝒘𝒂𝒙𝒊𝒏𝒈 𝒐𝒓 𝒍𝒂𝒔𝒆𝒓 𝒉𝒂𝒊𝒓 𝒓𝒆𝒎𝒐𝒗𝒂𝒍!...
            </p>
          </div>
        </div>





        <div
          ref={itemRef}
          className={`bg-[#fa86cf] text-black rounded-lg h-72 overflow-auto ${itemStyle} shadow-lg`}
        >
          
          <div className="flex flex-col pl-1 pt-3 sm:pl-5">
            <h1 className="pb-5 text-2xl sm:text-3xl"> 𝙈𝙔𝙏𝙃: "𝙒𝙤𝙢𝙚𝙣 𝙉𝙚𝙚𝙙 𝙇𝙚𝙨𝙨 𝙋𝙧𝙤𝙩𝙚𝙞𝙣 𝙏𝙝𝙖𝙣 𝙈𝙚𝙣."</h1>
            <p className="text-justify pr-5 pt-1">
            💪 𝑻𝑯𝑬 𝑻𝑹𝑼𝑻𝑯: 𝒀𝒐𝒖𝒓 𝒃𝒐𝒅𝒚 𝒏𝒆𝒆𝒅𝒔 𝒑𝒓𝒐𝒕𝒆𝒊𝒏—𝒋𝒖𝒔𝒕 𝒍𝒊𝒌𝒆 𝒎𝒆𝒏! 𝑰𝒕’𝒔 𝒆𝒔𝒔𝒆𝒏𝒕𝒊𝒂𝒍 𝒇𝒐𝒓 𝒎𝒖𝒔𝒄𝒍𝒆𝒔, 𝒃𝒐𝒏𝒆𝒔, 𝒂𝒏𝒅 𝒉𝒐𝒓𝒎𝒐𝒏𝒆 𝒃𝒂𝒍𝒂𝒏𝒄𝒆. 𝒀𝒐𝒖𝒓 𝒏𝒆𝒆𝒅𝒔 𝒅𝒆𝒑𝒆𝒏𝒅 𝒐𝒏 𝒚𝒐𝒖𝒓 𝒘𝒆𝒊𝒈𝒉𝒕 𝒂𝒏𝒅 𝒍𝒊𝒇𝒆𝒔𝒕𝒚𝒍𝒆, 𝒏𝒐𝒕 𝒚𝒐𝒖𝒓 𝒈𝒆𝒏𝒅𝒆𝒓. <br/> 🥩 𝑺𝒐 𝒈𝒐 𝒂𝒉𝒆𝒂𝒅 𝒂𝒏𝒅 𝒆𝒏𝒋𝒐𝒚 𝒕𝒉𝒂𝒕 𝒑𝒓𝒐𝒕𝒆𝒊𝒏-𝒑𝒂𝒄𝒌𝒆𝒅 𝒎𝒆𝒂𝒍—𝒚𝒐𝒖𝒓 𝒃𝒐𝒅𝒚 𝒘𝒊𝒍𝒍 𝒕𝒉𝒂𝒏𝒌 𝒚𝒐𝒖!...
            </p>
          </div>
        </div>

        

        

        {/* Add more items as needed */}
      </div>
    </div>
  );
};

export default AutoScrollBox;