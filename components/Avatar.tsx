export const Avatar: React.FC = ({ children }) => (
  <figure className="w-8 h-8 sm:w-16 sm:h-16">
    <div className="">
      <span className="sm:text-2xl">{children}</span>
    </div>

    <style jsx>{`
      figure {
        font-weight: 700;
        color: white;
        line-height: 1;
        text-align: center;
        display: flex;
        flex-direction: column;
        justify-content: center;
        overflow: hidden;
        border-radius: 50%;
        background-image: linear-gradient(
          to left top,
          rgb(244, 114, 182),
          rgb(59, 130, 246),
          rgb(109, 40, 217)
        );
      }
    `}</style>
  </figure>
);
