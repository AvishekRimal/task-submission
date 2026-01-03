interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export const Input = ({ label, error, ...props }: InputProps) => (
  <div className="flex flex-col gap-1 w-full">
    <label className="text-sm font-semibold text-gray-700">{label}</label>
    <input 
      {...props} 
      className={`border p-2 rounded-md outline-none transition ${error ? 'border-red-500' : 'border-gray-300'}`} 
    />
    {error && <span className="text-red-500 text-xs mt-1">{error}</span>}
  </div>
);