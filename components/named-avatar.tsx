export const Avatar: React.FC = ({ children }) => (
  <figure className="avatar">
    <div className="">
      <span className="avatar-initials">{children}</span>
    </div>
  </figure>
);
