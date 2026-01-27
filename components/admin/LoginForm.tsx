import { User } from 'lucide-react';
import { User as FirebaseUser } from 'firebase/auth';

interface LoginFormProps {
  currentUser: FirebaseUser | null;
  handleLogin: () => void;
  loginRequired: boolean;
  title?: string;
  description?: string;
}

export default function LoginForm({
  currentUser,
  handleLogin,
  loginRequired,
  title = "Portfolio Manager Access Required",
  description = "Please sign in to manage your portfolio projects"
}: LoginFormProps) {
  if (!loginRequired) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0d0b1f] via-[#1e0625] to-[#1b1b3a] text-white flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-[#1a1a2e] border border-[#4a0e4e] rounded-xl p-8 text-center">
        <div className="flex justify-center mb-6">
          <div className="bg-[#611197] p-3 rounded-full">
            <User className="h-8 w-8" />
          </div>
        </div>
        <h1 className="text-2xl font-bold mb-2">{title}</h1>
        <p className="text-[#a9a9b3] mb-6">{description}</p>
        <button
          onClick={handleLogin}
          className="w-full bg-[#611197] hover:bg-[#4a0e73] py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-5 w-5">
            <path fill="#fff" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="#fff" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="#fff" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
            <path fill="#fff" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
          </svg>
          Sign in with Google
        </button>
      </div>
    </div>
  );
}