import React, { useState } from "react";
import {
  MessageSquare,
  MessageSquareText,
  DatabaseZap,
  LogOut,
  User,
} from "lucide-react";
import type { DatabaseConnection } from "../types";
import querymateLogo from "../assests/querymate.png";
import Logo from "../assests/logo2.png";
import { ProfileDialog } from "./ProfileDialog";

interface SidebarProps {
  isOpen: boolean;
  activeView: "chat" | "history" | "credentials";
  dbConnection: DatabaseConnection | null;
  onViewChange: (view: "chat" | "history" | "credentials") => void;
  onSignOut: () => void;
  userData: {
    name: string;
    email: string;
    mobile_number: string;
    createdAt: string;
  };
}

export function Sidebar({
  isOpen,
  activeView,
  dbConnection,
  onViewChange,
  onSignOut,
  userData,
}: SidebarProps) {
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  return (
    <>
      <div
        className={`${
          isOpen ? "w-64" : "w-0"
        } bg-white border-r border-gray-200 transition-all duration-300 overflow-hidden flex flex-col h-screen`}
      >
        <div className="p-4 flex-1">
          <h1 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
            <img src={Logo} alt="QueryMate Logo" className="w-16 h-16" />
            QueryMate
          </h1>
          <nav className="space-y-2">
            <button
              onClick={() => onViewChange("chat")}
              disabled={!dbConnection}
              className={`w-full flex items-center gap-2 px-4 py-2 rounded-lg ${
                !dbConnection
                  ? "opacity-50 cursor-not-allowed"
                  : activeView === "chat"
                  ? "bg-blue-50 text-blue-600"
                  : "hover:bg-gray-50"
              }`}
            >
              <MessageSquare className="w-5 h-5" />
              New Chat
            </button>
            <button
              onClick={() => onViewChange("history")}
              disabled={!dbConnection}
              className={`w-full flex items-center gap-2 px-4 py-2 rounded-lg ${
                !dbConnection
                  ? "opacity-50 cursor-not-allowed"
                  : activeView === "history"
                  ? "bg-blue-50 text-blue-600"
                  : "hover:bg-gray-50"
              }`}
            >
              <MessageSquareText className="w-5 h-5" />
              Chat History
            </button>
            <button
              onClick={() => onViewChange("credentials")}
              className={`w-full flex items-center gap-2 px-4 py-2 rounded-lg ${
                activeView === "credentials"
                  ? "bg-blue-50 text-blue-600"
                  : "hover:bg-gray-50"
              }`}
            >
              <DatabaseZap className="w-5 h-5" />
              {dbConnection ? "Update DB Connection" : "Add DB Credentials"}
            </button>
          </nav>
        </div>

        <div className="p-4 border-t border-gray-200">
          <button
            onClick={() => setIsProfileOpen(true)}
            className="w-full flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-gray-50 mb-2"
          >
            <User className="w-5 h-5" />
            Profile
          </button>
          <button
            onClick={onSignOut}
            className="w-full flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-gray-50 text-red-600"
          >
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        </div>
      </div>

      <ProfileDialog
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
        userData={userData}
      />
    </>
  );
}
