export const Avatar = ({ children }: { children: React.ReactNode }) => (
  <figure className="avatar">
    <div className="">
      <span className="avatar-initials">{children}</span>
    </div>
  </figure>
);
