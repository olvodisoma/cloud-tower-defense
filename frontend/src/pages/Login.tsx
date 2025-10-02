// src/pages/Login.tsx
import { useMemo, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png"; // ← ide tedd a logód

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [show, setShow] = useState(false);

  // egyszerű jelszó-erősség (0..4)
  const strength = useMemo(() => {
    let s = 0;
    if (pw.length >= 8) s++;
    if (/[A-Z]/.test(pw)) s++;
    if (/\d/.test(pw)) s++;
    if (/[^A-Za-z0-9]/.test(pw)) s++;
    return s;
  }, [pw]);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!/\S+@\S+\.\S+/.test(email) || pw.length < 6) return;
    navigate("/lobby");
  }

  return (
    <div
      className="
        relative min-h-screen flex items-center justify-center p-6
        bg-stone-900 text-stone-900
        [background-image:radial-gradient(1200px_600px_at_50%_-10%,#27272a,transparent),linear-gradient(0deg,#0a0a0a,transparent)]
      "
      style={{
        backgroundBlendMode: "screen",
        fontFamily: '"Press Start 2P", system-ui, sans-serif',
      }}
    >
      {/* HALVÁNY VÍZJEL LOGO a háttérben */}
      <img
        src={logo}
        alt=""
        aria-hidden="true"
        className="pointer-events-none select-none
                   absolute inset-0 m-auto opacity-5 w-[60vmin] h-auto
                   [image-rendering:pixelated]"
      />

      <div className="relative w-full max-w-lg">
        {/* PIXEL KÁRTYA */}
        <div
          className="
            relative bg-amber-50
            border-[6px] border-stone-900 rounded-none
            shadow-[6px_6px_0_#111]
            p-7 sm:p-8
            [image-rendering:pixelated] group
          "
        >
          {/* LOGO BADGE a kártya tetején */}
          <div
            className="
              absolute -top-10 -right-10
              px-6 py-4 bg-stone-800 
              border-[8px] border-stone-900 rounded-none
              shadow-[8px_8px_0_#111]
              [image-rendering:pixelated]
              transition-transform duration-200 group-hover:-translate-y-1
            "
          >
            <img
              src={logo}
              alt="Versus TD"
              className="block h-20 w-auto sm:h-24 [image-rendering:pixelated]"
            />
          </div>

          {/* CÍMSOR */}
          <div className="mt-4 mb-8 flex items-center justify-start gap-3">
            {/* 8-bit nyíl ikon (inline SVG pixelesen) */}
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              className="text-red-700"
              shapeRendering="crispEdges"
            >
              <rect x="2" y="9" width="10" height="2" fill="currentColor" />
              <rect x="10" y="7" width="2" height="6" fill="currentColor" />
              <rect x="12" y="6" width="2" height="8" fill="currentColor" />
              <rect x="14" y="5" width="2" height="10" fill="currentColor" />
            </svg>
            <h1 className="text-xl sm:text-2xl tracking-tight">BELÉPÉS</h1>
          </div>

          {/* ŰRLAP */}
          <form onSubmit={onSubmit} className="grid gap-6">
            {/* EMAIL */}
            <label className="grid gap-2">
              <span className="text-[10px] text-stone-700">EMAIL</span>
              <input
                type="email"
                value={email}
                placeholder="lovag@birodalom.hu"
                onChange={(e) => setEmail(e.target.value)}
                className="
                  block w-full bg-white
                  border-[4px] border-stone-900 rounded-none
                  px-3 py-2 text-[12px] tracking-tight
                  focus:outline-none focus:border-red-700
                "
              />
            </label>

            {/* JELSZÓ */}
            <label className="grid gap-2">
              <span className="text-[10px] text-stone-700">JELSZÓ</span>
              <div className="flex items-stretch">
                <input
                  type={show ? "text" : "password"}
                  value={pw}
                  placeholder="********"
                  onChange={(e) => setPw(e.target.value)}
                  className="
                    block w-full bg-white
                    border-[4px] border-stone-900 rounded-none
                    px-3 py-2 text-[12px]
                    focus:outline-none focus:border-red-700
                  "
                />
                <button
                  type="button"
                  onClick={() => setShow((s) => !s)}
                  className="
                    ml-2 px-3 py-2 text-[10px]
                    border-[4px] border-stone-900 bg-stone-900 text-amber-50
                    rounded-none
                    shadow-[4px_4px_0_#111]
                    active:translate-x-[2px] active:translate-y-[2px] active:shadow-none
                  "
                >
                  {show ? "REJT" : "MUTAT"}
                </button>
              </div>

              {/* 8-bit ERŐSSÉG BLOKKOK */}
              <div className="flex gap-1 mt-1">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div
                    key={i}
                    className={`
                      h-3 w-8 border-[3px] border-stone-900 rounded-none
                      ${i < strength ? "bg-lime-500" : "bg-white"}
                    `}
                  />
                ))}
              </div>
            </label>

            {/* OPCIÓK */}
            <div className="flex items-center justify-between text-[10px]">
              <label className="inline-flex items-center gap-2 select-none">
                <input type="checkbox" className="accent-red-700" /> EMLÉKEZZ RÁM
              </label>
              <NavLink to="/register" className="text-red-700 hover:underline">
                NINCS FIÓKOD? REGISZTRÁCIÓ
              </NavLink>
            </div>

            {/* GOMB */}
            <button
              type="submit"
              className="
                mt-2 px-4 py-3
                bg-red-700 text-amber-50
                border-[6px] border-stone-900 rounded-none
                shadow-[6px_6px_0_#111]
                text-[12px] tracking-tight
                hover:brightness-110
                active:translate-x-[3px] active:translate-y-[3px] active:shadow-[3px_3px_0_#111]
              "
            >
              → BELÉPÉS
            </button>
          </form>
        </div>

        {/* LÁBJEGYZET */}
        <p className="mt-4 text-center text-[9px] text-amber-200">
          Versus TD • 8-BIT EDITION
        </p>
      </div>
    </div>
  );
}
