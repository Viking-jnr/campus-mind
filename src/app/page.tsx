'use client'
import { useState } from "react";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, db } from "../lib/firebase"
import { GoogleAuthProvider } from "firebase/auth";
import CampusMind from "./assets/CampusMind.png";
import Image from "next/image";
import { doc, setDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";

export default function Home() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [university, setUniversity] = useState("");
  const [course, setCourse] = useState("");
  const [error, setError] = useState("");
  const [isFlipped, setIsFlipped] = useState(false);
  const router = useRouter();

  {/* Handle Login Function */}
  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/dashboard");
    } catch (err: any) {
      setError("Invalid email or password");
    }
  };
  {/*Sign in with google function */}
  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({
      prompt: "select_account"
    })
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      await setDoc(doc(db, "users", user.uid), {
        email: user.email,
        name: user.displayName,
      }, {merge: true });
      
      router.push('/dashboard');
    }catch(err: any){
      setError("Google sign-in failed");
    }
  }
  {/*Sign Up Function */}
  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);
      const user = result.user;
      console.log("User Created:", user);
      
      await setDoc(doc(db, "users", user.uid), {
        email: user.email,
        name: name,
        university: university,
        course: course,
        createdAt: new Date().toISOString(),
      });
      router.push("/dashboard");
    }catch(err: any){
      setError("Sign-Up failed: " + err.message);
    }
  }

  return (
    <div className="flex min-h-screen">
      {/* Left Side */}
      <div className="w-1/2 flex flex-col items-center mt-10 ">
        <Image loading="eager" src={CampusMind} alt="Campus Mind" title="Campus Mind" width={300} height={300} />
        <h1 className="text-4xl font-bold mb-4 text-[#6366F1]">Campus Mind</h1>
        <p className="text-lg text-[#3B82F6]">
          Smart AI helpers for assignments, study groups, and campus life
        </p>
      </div>

      {/* Right Side */}
      <div className="w-1/2 flex justify-center item-start p-10">
      <div className="relative w-full max-w-md perspective">
      <div className= {`w-full mt-0 transition-transform duration-700 transform-style-preserve-3d ${isFlipped ? "rotate-y-180": ""}`}>
      
      {/* Login Form */}
        <form onSubmit={handleLogin} className=" absolute bg-white shadow-md rounded px-8 pt-6 pb-8 w-full max-w-md backface-hidden">
          <h2 className="text-2xl font-semibold mb-6 text-[#6366F1] text-center">Log In</h2>
          
          <div className="mb-4">
            <label className="block text-black text-sm font-bold mb-2">
              Email
            </label>
            <input type="email" placeholder="student@example.com" value={email} onChange={(e) =>setEmail(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-6">
            <label className="block text-black text-sm font-bold mb-2">
              Password
            </label>
            <input type="password" placeholder="********" value={password} onChange={(e) =>setPassword(e.target.value)}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <button type="submit" 
                  className="bg-blue-900 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full">
                    Login
          </button> 
          <button onClick={handleGoogleLogin}
            className="bg-red-900 hover:bg-red-700 text-white font-bold py-2 px-4 rounded w-full mt-4">
            Sign in with Google
          </button>
          <p className="text-center text-blue-600 mt-3 cursor-pointer" onClick={() => setIsFlipped(true)}>Don't Have an Account? Sign Up</p>
        </form>

        {/* Sign Up Form */}
        <form onSubmit={handleSignUp} className="absolute backface-hidden bg-white shadow-md rounded px-8 pt-6 pb-8 w-full max-w-md rotate-y-180">
          <h2 className="text-2xl font-semibold mb-6 text-[#6366F1] text-center">Sign Up</h2>
          
          <div className="mb-4">
            <label className="block text-black font-bold text-sm mb-2 ">Full Name</label>
            <input type="text" placeholder="Full Name" value={name} onChange={(e) => setName(e.target.value) }
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
             />
             <label className="block text-black font-bold text-sm mb-2 ">University</label>
            <input type="text" placeholder="University" value={university} onChange={(e) => setUniversity(e.target.value) }
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
             />
             <label className="block text-black font-bold text-sm mb-2 ">Course</label>
            <input type="text" placeholder="Your Course" value={course} onChange={(e) => setCourse(e.target.value) }
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
             />
            <label className="block text-black text-sm font-bold mb-2">
              Email
            </label>
            <input type="email" placeholder="student@example.com" value={email} onChange={(e) =>setEmail(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-6">
            <label className="block text-black text-sm font-bold mb-2">
              Password
            </label>
            <input type="password" placeholder="********" value={password} onChange={(e) =>setPassword(e.target.value)}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <button type="submit" 
                  className="bg-blue-900 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full">
                    Sign Up
          </button> 
          <p className="text-center text-blue-600 mt-3 cursor-pointer" onClick={() => setIsFlipped(false)}>Already Have an Account? Log In</p>
        </form>
      </div>
      </div>
      </div>
    </div>
    
  );
}
