
const BattleshipContainer = ({children}: {children: JSX.Element}) => {
  return (
    <div className="mx-auto flex">
        <div className="flex-auto m-0 min-h-screen text-[var(--color-text-primary)] flex items-start justify-center p-[48px]"
          style={{ background: "linear-gradient(180deg, var(--color-primary) 0%, #5B44E8 100%)" }}
        >
          <div className="max-w-[calc(100% - 96px)] rounded-[20px] shadow-[var(--shadow)] grid grid-cols-[1fr 360px] gap-[28px] bg-[linear-gradient(180deg, rgba(255,255,255,0.03), rgba(255,255,255,0.02))]">
            
            <section className="bg-[var(--color-surface)] text-[var(--color-text-dark)] rounded-[14px] p-[24px] shadow-[0 6px 20px rgba(44,26,121,0.06)] min-h-[620px]">
              {children}
            </section>

          </div>
        </div>
      </div>
  )
}

export default BattleshipContainer