import { ChangeEvent } from 'react';

interface InputProps {
  label: string;
  name: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  placeholder?: string;
  type?: 'text' | 'textarea';
  required?: boolean;
}

export const Input = ({ label, name, value, onChange, placeholder, type = 'text', required = false }: InputProps) => {
  const baseStyles = "w-full px-8 py-5 bg-gray-50 border-2 border-transparent focus:border-[#3f5efb] focus:bg-white rounded-[30px] outline-none transition-all font-bold text-center text-xl placeholder:text-gray-300 shadow-sm";

  return (
    <div className="w-full">
      <label className="block text-[11px] font-black text-gray-400 uppercase tracking-[4px] mb-4 text-center">{label}</label>
      {type === 'text' ? (
        <input 
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={baseStyles}
          required={required}
        />
      ) : (
        <textarea 
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`${baseStyles} min-h-[120px] resize-none font-medium text-lg`}
          required={required}
        />
      )}
    </div>
  );
};
