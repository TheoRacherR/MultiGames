
const InfoBlock = ({title, desc}: {title: string, desc: string}) => {
  return (
    <div className="p-4 bg-[var(--color-surface)] rounded-[12px] border-[1px] border-[var(--color-border)] shadow-[0 8px 20px rgba(86,68,202,0.06)pap]">
      <div className="text-sm text-[#6B5BEA] font-semibold">{title}</div>
      <div className="mt-2 text-sm text-[#334]">{desc}</div>
    </div>
  )
}

export default InfoBlock