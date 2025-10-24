// Header.jsx
import React from "react";

const Header = () => {
  return (
    <header className="bg-[#2c1142] text-white shadow-md">
      <div className="container mx-auto flex items-center justify-between p-4">
        {/* Logo */}
        <div className="text-2xl font-bold">
          MiLogo
        </div>

        {/* Navegación */}
        <nav className="space-x-6 hidden md:flex">
          <a href="#" className="hover:text-gray-300">Inicio</a>
          <a href="#" className="hover:text-gray-300">Productos</a>
          <a href="#" className="hover:text-gray-300">Servicios</a>
          <a href="#" className="hover:text-gray-300">Contacto</a>
        </nav>

    

        {/* Menú móvil (opcional) */}
        <div className="md:hidden">
          <button>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none"
                 viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
