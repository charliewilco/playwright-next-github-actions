export const Avatar: React.FC = ({ children }) => (
  <figure>
    <div className="">
      <span className="sm:text-2xl">{children}</span>
    </div>

    <style jsx>{`
      figure {
        --size: 2rem;
        width: var(--size);
        height: var(--size);
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

      span {
        font-size: 1rem;
      }

      @media (min-width: 48rem) {
        figure {
          --size: 4rem;
        }

        span {
          font-size: 1.5rem;
        }
      }
    `}</style>
  </figure>
);
