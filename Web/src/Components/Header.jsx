import Logo from "../assets/Logo.png";
import { LogIn, User, Heart } from "lucide-react";
import { useAuthStore } from "../Store";
import { ThemeSwitch } from "../Helper";

export default function MainHeader() {
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const userName = useAuthStore((state) => state.userName);
 
  return (
    <header
      className="
        relative overflow-hidden
        flex items-center justify-between
        px-8 py-3

        bg-[#f7faf4]
        border-b border-[#d9e8d2]

        dark:bg-[#172018]
        dark:border-[#334235]

        transition-colors duration-300
      "
    >
  
      <div className="w-100 h-12 overflow-hidden flex items-center">
 <img
  src={Logo}
  alt="List & Found"
  className="h-12 w-60 object-contain"
/>
</div>

      {/* Right */}
      <div className="relative z-10 flex items-center gap-3">

        <button
          className="
            p-2.5 rounded-full
            text-[#52734d]
            hover:bg-[#e2efdc]

            dark:text-[#b7d3ae]
            dark:hover:bg-[#2b3a2d]

            transition
          "
        >
          {isLoggedIn}
          {userName}
          <User size={20} />
        </button>

        {!isLoggedIn && (
          <button
            className="
              flex items-center gap-2
              px-5 py-2.5
              rounded-full

              bg-[#5f7f54]
              text-white
              hover:bg-[#48683f]

              dark:bg-[#86a873]
              dark:text-[#152015]
              dark:hover:bg-[#9dbb8c]

              shadow-sm
              transition
            "
          >
            <LogIn size={18} />
            <span>Login</span>
          </button>
        )}

        <button
          className="
            p-2.5 rounded-full
            text-[#6f8c64]

            hover:bg-[#f4e7eb]
            hover:text-[#b85c7a]

            dark:text-[#b7d3ae]
            dark:hover:bg-[#3a2c31]
            dark:hover:text-[#f2a4bb]

            transition
          "
        >
          <Heart size={20} />
        </button>

        <ThemeSwitch />
      </div>
    </header>
  );
}