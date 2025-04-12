import React from "react";
import { X } from "lucide-react";

interface ProfileDialogProps {
  isOpen: boolean;
  onClose: () => void;
  userData: {
    name: string;
    email: string;
    mobile_number: string;
    createdAt: string;
  };
}

export function ProfileDialog({
  isOpen,
  onClose,
  userData,
}: ProfileDialogProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-96 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <X size={20} />
        </button>

        <h2 className="text-2xl font-bold mb-6">Profile Information</h2>

        <div className="space-y-4">
          <div>
            <label className="text-sm text-gray-500">Name</label>
            <p className="text-lg font-medium">{userData.name}</p>
          </div>

          <div>
            <label className="text-sm text-gray-500">Email</label>
            <p className="text-lg font-medium">{userData.email}</p>
          </div>

          <div>
            <label className="text-sm text-gray-500">Mobile Number</label>
            <p className="text-lg font-medium">{userData.mobile_number}</p>
          </div>

          <div>
            <label className="text-sm text-gray-500">Member Since</label>
            <p className="text-lg font-medium">
              {new Date(userData.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
