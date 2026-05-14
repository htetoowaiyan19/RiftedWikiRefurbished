import { Navbar, NavbarBrand, NavbarCollapse, NavbarLink, NavbarToggle } from "flowbite-react";
import logo from "../assets/rbtu-logo-mini.svg";
import React from "react";
import { useLocation } from "react-router-dom";

const links = [
  { href: "/", label: "Home", active: (path) => path === "/" || path === "/home" },
  { href: "/characters", label: "Characters", active: (path) => path === "/characters" || path.startsWith("/character/") },
  { href: "/relics", label: "Relics", active: (path) => path === "/relics" || path.startsWith("/relic/") },
  { href: "/matters", label: "Matters", active: (path) => path === "/matters" || path.startsWith("/matter/") },
  { href: "/gameplay", label: "Gameplay", active: (path) => path === "/gameplay" },
  { href: "/trialwarps", label: "Trial Warps", active: (path) => path === "/trialwarps" },
];

const NavBar = () => {
  const location = useLocation();

  return (
    <div className="px-3 pt-3 sm:px-4">
      <Navbar
        fluid
        rounded
        className="wiki-panel mx-auto max-w-[92rem] rounded-[1.75rem] border-white/10 bg-slate-950/70 px-2 py-2"
      >
        <NavbarBrand href="/" className="gap-3">
          <div className="rounded-2xl border border-cyan-300/10 bg-white/5 p-2 shadow-[0_10px_30px_-18px_rgba(103,232,249,0.65)]">
            <img src={logo} className="h-7 sm:h-8" alt="Rifted: Beyond the Universe" />
          </div>
          <div>
            <span className="block whitespace-nowrap text-lg font-bold tracking-wide text-white sm:text-xl">
              Rifted Wiki
            </span>
            <span className="hidden text-xs uppercase tracking-[0.26em] text-cyan-200/75 sm:block">
              Beyond The Universe Archive
            </span>
          </div>
        </NavbarBrand>
        <NavbarToggle className="border border-white/10 bg-white/5 text-slate-200 hover:bg-white/10" />
        <NavbarCollapse>
          {links.map((link) => (
            <NavbarLink
              key={link.href}
              href={link.href}
              active={link.active(location.pathname)}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                link.active(location.pathname)
                  ? "bg-cyan-300/15 text-white"
                  : "text-slate-300 hover:bg-white/10 hover:text-white"
              }`}
            >
              {link.label}
            </NavbarLink>
          ))}
        </NavbarCollapse>
      </Navbar>
    </div>
  );
};

export default NavBar;
