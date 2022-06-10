import Link from "next/link";

type PropTypes = {
  children?: React.ReactNode;
  className?: string;
  href?: string;
  onClick?: () => void;
};

const Button = ({
  children,
  onClick = () => {},
  href,
  className = "",
  ...props
}: PropTypes) => {
  if (href)
    return (
      <Link href={href}>
        <a className={className} {...props}>
          {children}
        </a>
      </Link>
    );
  return (
    <button className={className} onClick={onClick} {...props}>
      {children}
    </button>
  );
};

export default Button;
