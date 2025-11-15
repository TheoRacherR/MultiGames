const Surface = ({ children }: { children: JSX.Element }) => {
  return (
    <div className="min-h-screen bg-[var(--color-primary)] text-white flex items-start justify-center p-8">
      <div className="w-full max-w-6xl">
        <section className="bg-[var(--color-primary)] rounded-2xl shadow-2xl p-[36px] mb-8 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {children}
        </section>
      </div>
    </div>
  );
};

export default Surface;
