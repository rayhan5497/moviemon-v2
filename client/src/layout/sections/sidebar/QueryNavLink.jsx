import { NavLink, useLocation } from 'react-router-dom';

export default function QueryNavLink({ to, children, isSectionActive, className='' }) {
  const location = useLocation();
  const link = new URL(to, window.location.origin);

  const isActive =
    location.pathname === link.pathname && location.search === link.search;
  return (
    <NavLink
      to={to}
      className={`cursor-pointer block  ${className} ${
        isActive || isSectionActive
          ? 'text-teal-400 font-semibold'
          : 'hover:text-gray-400'
      }`}
    >
      {children}
    </NavLink>
  );
}
