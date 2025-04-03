import { useAuthStore } from '@/store/useAuthStore'
import { Camera, Mail, User, X } from 'lucide-react';
import React, { useState } from 'react'

const ProfilePage = () => {

  const { authUser, updateProfile, isUpdatingProfile } = useAuthStore();
  const [selectedImg, setSelectedImg] = useState(null);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onload = async () => {
      const base64ImgUrl = reader.result;
      setSelectedImg(base64ImgUrl);
      await updateProfile({ profilePic: base64ImgUrl });
    }
  }

  return (
    <div className='h-screen pt-20'>
      <div className="max-w-2xl py-8 mx-auto">
        <div className="rounded-xl bg-[#1F2021] p-6 space-y-8">
          <div className="text-center">
            <h1 className='text-2xl font-semibold'>Profile</h1>
            <p className='mt-4'>Your Profile Information</p>
          </div>
          {/* Avatar goes here */}
          <div className="flex flex-col items-center gap-4">
            <div className="relative">
              <img
                src={selectedImg || authUser.profilePic || "/avatar.png"}
                alt="Profile"
                className="object-cover border-4 rounded-full size-32 "
              />
              {/* <label
                htmlFor="cancel-upload"
                className={`
                  absolute bottom-20 right-0
                  bg-base-content hover:scale-105
                  p-2 rounded-full cursor-pointer 
                  transition-all duration-200
                  ${selectedImg ? "animate-pulse pointer-events-none" : ""}
                `}
              >
                <X className='size-5 text-base-200' />
              </label> */}
              <label
                htmlFor="avatar-upload"
                className={`
                  absolute bottom-0 right-0 
                  bg-base-content hover:scale-105
                  p-2 rounded-full cursor-pointer 
                  transition-all duration-200
                  ${isUpdatingProfile ? "animate-pulse pointer-events-none" : ""}
                `}
              >
                <Camera className="w-5 h-5 text-base-200" />
                <input
                  type="file"
                  id="avatar-upload"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={isUpdatingProfile}
                />
              </label>
            </div>
            <p className={`text-sm opacity-60`}>
              {isUpdatingProfile ? "Uploading..." : "Click on the camera icon to update your profile picture."}
            </p>
          </div>
          <div className="space-y-6">
            <div className="space-y-1.5">
              <div className="flex items-center gap-2 text-sm text-zinc-400">
                <User className="w-4 h-4" />
                Full Name
              </div>
              <p className="px-4 py-2.5 bg-zinc-800 rounded-lg border">{authUser?.name}</p>
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center gap-2 text-sm text-zinc-400">
                <Mail className="w-4 h-4" />
                Email Address
              </div>
              <p className="px-4 py-2.5 bg-zinc-800 rounded-lg border">{authUser?.email}</p>
            </div>
          </div>
          <div className="p-6 mt-6 bg-zinc-900 rounded-xl">
            <h2 className="mb-4 text-lg font-medium">Account Information</h2>
            <div className="space-y-3 text-sm">
              <div className="flex items-center justify-between py-2 border-b border-zinc-700">
                <span>Member Since</span>
                <span>{authUser.createdAt?.split("T")[0]}</span>
              </div>
              <div className="flex items-center justify-between py-2">
                <span>Account Status</span>
                <span className="text-green-500">Active</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfilePage