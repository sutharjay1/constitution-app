interface ContinueButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "green";
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  type?: "button" | "submit" | "reset" | undefined;
  key?: string;
}

const ContinueButton = ({
  children,
  variant = "default",
  ...props
}: ContinueButtonProps) => {
  const baseStyles =
    "px-6 py-3 text-sm font-bold uppercase rounded-xl border-2 cursor-pointer transition-all duration-200 ease-in-out active:translate-y-[6px] active:shadow-none";
  const variants = {
    default:
      "bg-white text-zinc-800 border-zinc-300 shadow-[0_4px_0_#a79980] hover:bg-[##b39d74] active:translate-y-[4px] active:shadow-none ",
    green:
      "bg-mediumBlue text-white border-transparent  hover:bg-darkBlue transition-colors active:translate-y-[8px] shadow-[0_4px_0_#a79980]  active:shadow-none",
  };

  return (
    <button className={`${baseStyles} ${variants[variant]}`} {...props}>
      {children}
    </button>
  );
};

export default ContinueButton;
