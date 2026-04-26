import { ReactNode } from 'react';

interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit';
  variant?: 'primary' | 'secondary' | 'danger';
  className?: string;
}

export const Button = ({ children, onClick, type = 'button', variant = 'primary', className = '' }: ButtonProps) => {
  const baseStyles = "px-8 py-4 rounded-full font-black text-lg transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-3 shadow-xl";
  
  const variants = {
    primary: "bg-[#1a1a2e] hover:bg-[#3f5efb] text-white shadow-blue-900/10",
    secondary: "bg-gray-100 hover:bg-gray-200 text-gray-500 shadow-none",
    danger: "bg-red-600 hover:bg-red-700 text-white shadow-red-600/20"
  };

  return (
    <button 
      type={type} 
      onClick={onClick} 
      className={`${baseStyles} ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
};
