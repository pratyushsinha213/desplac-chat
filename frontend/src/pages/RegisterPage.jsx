import { useAuthStore } from "@/store/useAuthStore";
import {
  Eye,
  EyeOff,
  Loader2,
  Lock,
  Mail,
  MessageSquare,
  User,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";

import React, { useState } from "react";
import { Link } from "react-router-dom";
import AuthImagePattern from "@/components/AuthImagePattern";

const RegisterPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const { register, isRegister } = useAuthStore();

  const validateForm = () => {

    if (!formData.name.trim()){
      return toast.error("Name is required.");
    }
    if (!formData.email.trim()) {
      return toast.error("Email is required.");
    }
    if (!formData.password.trim()) {
      return toast.error("Password is required.");
    }
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      return toast.error("Invalid email format");
    }
    if (formData.password.length < 6) {
      return toast.error("Password must atleast 6 characters");
    }

    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const success = validateForm();

    if (success === true) {
      register(formData);
      // toast.success("Registered user successfully.");
    }
  };

  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      {/* Left Side */}
      <div className="flex flex-col items-center justify-center p-6 sm:p-12">
        <div className="w-full max-w-md space-y-8">
          {/* Logo */}
          <div className="mb-8 text-center">
            <div className="flex flex-col items-center gap-2 group">
              <div className="flex items-center justify-center transition-colors size-12 rounded-xl bg-blue-500/10 hover:bg-blue-500/20">
                <MessageSquare className="text-blue-500 size-8" />
              </div>
              <h1 className="mt-2 text-2xl font-bold">Create Account</h1>
              <p className="text-base-content/60">
                Get started with your free account
              </p>
            </div>
          </div>
          {/* Register Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="form-control">
              <label className="label">
                <span className="mb-3 font-medium label-text">Full Name</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none z-999">
                  <User className="size-5 text-base-content/40" />
                </div>
                <input
                  type="text"
                  className={" input input-bordered w-full pl-10"}
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                />
                {/* <Input type="text"
                className={'w-full h-12 px-10 py-3 border-white/40'}
                placeholder="John Doe"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}/> */}
              </div>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="mb-3 font-medium label-text">Email</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none z-999">
                  <Mail className="size-5 text-base-content/40" />
                </div>
                <input
                  type="email"
                  className={" input input-bordered w-full pl-10"}
                  placeholder="john@doe.com"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
                {/* <Input type="email"
                className={'w-full h-12 px-10 py-3 border-white/40'}
                placeholder="john@doe.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}/> */}
              </div>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="mb-3 font-medium label-text">Password</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none z-999">
                  <Lock className="size-5 text-base-content/40" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  className={" input input-bordered w-full pl-10"}
                  placeholder="*********"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                />
                {/* <Input type={showPassword ? "text": "password"}
                className={'w-full h-12 px-10 py-3 border-white/40'}
                placeholder="*********"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}/> */}
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 flex items-center pr-3"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="cursor-pointer size-5 text-base-content/40" />
                  ) : (
                    <Eye className="cursor-pointer size-5 text-base-content/40" />
                  )}
                </button>
                {/* <Button
                type="button"
                className="absolute inset-y-0 flex items-center pr-3 cursor-pointer top-1.5 right-3"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ?
                  <EyeOff className="size-5 text-base-content/40" />
                  :
                  <Eye className="size-5 text-base-content/40" />}
              </Button> */}
              </div>
            </div>

            <button
              type="submit"
              className="w-full mt-4 btn btn-primary"
              disabled={isRegister}
            >
              {isRegister ? (
                <>
                  <Loader2 className="size-5 animate-spin" />
                  Loading...
                </>
              ) : (
                "Create Account"
              )}
            </button>
            {/* <Button type="submit" className={`mt-4 w-full py-5 bg-blue-500 hover:bg-blue-700 cursor-pointer`} disabled={isRegister}>
            {isRegister ?
              <>
                <Loader2 className="animate-spin" /> Loading...
              </> :
              (
                "Create Account"
              )}
          </Button> */}
          </form>

          <div className="text-center">
            <p className="text-sm">
              Already have an account? {"  "}
              <Link className="link link-primary" to="/login">Sign In</Link>
            </p>
          </div>
        </div>
      </div>

      {/* Right side */}
      <AuthImagePattern
        title="Join the community!"
        subtitle="Connect with your friends and families, share your best moments, and stay connected with your loved ones."
      />
    </div>
  );
};

export default RegisterPage;
