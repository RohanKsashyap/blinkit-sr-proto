import React, { useState } from 'react';
import { X, Mail, Lock,User, Phone } from 'lucide-react';
import axios from 'axios';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: () => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onLogin }) => {
  const [isSignUp, setIsSignUp] = useState(true);
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  if (!isOpen) return null;

  const handleSubmit =  async(e: React.FormEvent) => {
    e.preventDefault()
try {
const response = await axios.post('http://localhost:5000/api/user',
  {
    name,
    email,
    phone,
    password

  },
  
  {
  
headers:{
  "Content-Type": "application/json"

}

})
console.log(response.data)



    onLogin();
    setEmail('');
    setName('')
    setPassword('')
    setPhone('');
  
} catch (error) {
  console.log("error sending data ",error)
  
}

    
  };

  return (
<>
{isSignUp?(<div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-96 bg-white rounded-lg shadow-xl">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold">
              {isSignUp ? 'Create Account' : 'Welcome Back'}
            </h2>
            <button onClick={onClose}>
              <X size={24} />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">

{/* name */}


          <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
               Full Name
              </label>
              <div className="relative">
                <input
                  type="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  placeholder="Enter your fullname"
                  required
                />
                < User className="absolute left-3 top-2.5 text-gray-400" size={20} />
              </div>
            </div>
            {/* contact */}

            
          <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
             Contact
              </label>
              <div className="relative">
                <input
                  type="number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  placeholder="Enter your contact"
                  required
                />
                < Phone className="absolute left-3 top-2.5 text-gray-400" size={20} />
              </div>
            </div>

{/* email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(f) => setEmail(f.target.value)}
                  className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  placeholder="Enter your email"
                  required
                />
                <Mail className="absolute left-3 top-2.5 text-gray-400" size={20} />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <div className="relative">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  placeholder="Enter your password"
                  required
                />
                <Lock className="absolute left-3 top-2.5 text-gray-400" size={20} />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition-colors"
            >
              Sign Up
            </button>
          </form>

          <div className="mt-4 text-center">
            <button
              className="text-green-500 hover:text-green-600"
              onClick={()=>{setIsSignUp(false)}}
            >
               Already have an account? Login
            </button>
          </div>
        </div>
      </div>
    </div>)
    
    :
    
    
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-96 bg-white rounded-lg shadow-xl">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold">
              {isSignUp ? 'Create Account' : 'Welcome Back'}
            </h2>
            <button onClick={onClose}>
              <X size={24} />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">

{/* name */}


            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  placeholder="Enter your email"
                  required
                />
                <Mail className="absolute left-3 top-2.5 text-gray-400" size={20} />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <div className="relative">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  placeholder="Enter your password"
                  required
                />
                <Lock className="absolute left-3 top-2.5 text-gray-400" size={20} />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition-colors"
            >
                Login
            </button>
          </form>

          <div className="mt-4 text-center">
            <button
              className="text-green-500 hover:text-green-600"
              onClick={()=>{setIsSignUp(true)}}
            >
               Don't have an account? Sign Up
            
            </button>
          </div>
        </div>
      </div>
    </div>}

 </>
  );
};

export default AuthModal;