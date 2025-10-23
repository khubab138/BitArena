import React from "react";

const page = () => {
  return (
    <div>
      <section className="min-h-screen flex items-center py-20">
        <div></div>
        <div className="px-4 mx-auto w-150">
          <h2 className="text-3xl font-bold mb-8 text-center bg-gradient-to-r  from-blue-800/80 to-cyan-500  bg-clip-text text-transparent ">
            Want to work with us
          </h2>
          <form action="" className="space-y-6">
            <div className="relative">
              <input
                type="text"
                placeholder="Name..."
                id="name"
                name="name"
                required
                className="w-full mb-4 hover:border-white/20 hover:bg-white/ bg-white/5 border border-e-white/10 rounded px-4 py-3 text-white transition focus:outline-none focus:border-blue-500 focus:bg-blue-500/5 "
              />
              <input
                type="email"
                placeholder="example@gmail.com"
                id="email"
                name="from_email"
                required
                className="w-full mb-4 hover:border-white/20 hover:bg-white/ bg-white/5 border border-e-white/10 rounded px-4 py-3 text-white transition focus:outline-none focus:border-blue-500 focus:bg-blue-500/5 "
              />
              <textarea
                placeholder="Your Message"
                id="message"
                name="message"
                rows={5}
                className="w-full mb-4 hover:border-white/20 hover:bg-white/ bg-white/5 border border-e-white/10 rounded px-4 py-3 text-white transition focus:outline-none focus:border-blue-500 focus:bg-blue-500/5 "
              />
              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-3 px-6 rounded font-medium transition rtelative overflow-hidden hover:-translate-y-0.5 hover:shadow-[0_0_50px_rgba(59,130,246,0.4)]"
              >
                Send
              </button>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
};

export default page;
