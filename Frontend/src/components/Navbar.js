import React, { useContext } from "react";
import AddTransactionModal from "./Modals/AddTransactionModal";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
function Navbar({ index, setIndex }) {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  return (
    <nav class="bg-gray-800">
      <AddTransactionModal />
      <div class="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div class="relative flex h-16 items-center justify-between">
          <div class="absolute inset-y-0 left-0 flex items-center sm:hidden"></div>
          <div class="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div class="flex flex-shrink-0 items-center">
              <img class="h-8 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500" alt="Your Company" />
            </div>
            <div class="hidden sm:ml-6 sm:block">
              <div class="flex self-center space-x-4">
                <button onClick={() => setIndex(0)} className={`p-2 self-center text-white rounded-md font-sans font-semibold hover:scale-105 ${index === 0 && "bg-gray-900"}`}>
                  Dashboard
                </button>
                <button onClick={() => setIndex(1)} className={`self-center text-white p-2 rounded-md font-sans font-semibold hover:scale-105 ${index === 1 && "bg-gray-900"}`}>
                  Transactions
                </button>
              </div>
            </div>
          </div>
          <div className="font-sans self-center font-semibold -tracking-wider text-white text-md">Hey {user?.name}, Spendwise!</div>
          <div class=" flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <div class="relative ml-3">
              <div>
                {user ? (
                  <button
                    onClick={() => {
                      logout();
                      navigate("/login");
                    }}
                    class="relative border-2 flex rounded-full text-black text-sm bg-gray-100 font-semibold px-2 py-1 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                    aria-haspopup="true">
                    Sign out
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      navigate("/login");
                    }}
                    class="relative border-2 flex rounded-full text-black text-sm bg-gray-100 font-semibold px-2 py-1 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                    aria-haspopup="true">
                    Login
                  </button>
                )}
              </div>

              {/* <div
                class="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="user-menu-button"
                tabindex="-1">
                <Link href="#" class="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabindex="-1" id="user-menu-item-2">
                  Sign out
                </Link>
              </div> */}
            </div>
          </div>
        </div>
      </div>

      {/* <div class="sm:hidden" id="mobile-menu">
        <div class="space-y-1 px-2 pb-3 pt-2">
          <a href="#" class="bg-gray-900 text-white block rounded-md px-3 py-2 text-base font-medium" aria-current="page">
            Dashboard
          </a>
          <a href="#" class="text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium">
            Team
          </a>
          <a href="#" class="text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium">
            Projects
          </a>
          <a href="#" class="text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium">
            Calendar
          </a>
        </div>
      </div> */}
    </nav>
  );
}

export default Navbar;
