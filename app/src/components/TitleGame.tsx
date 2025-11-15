
const TitleGame = ({title}: {title: string}) => {
  return (
    <h1
      className="text-6xl text-center mb-14 font-bold"
      style={{ color: "var(--color-primary)" }}
    >
      {title.toUpperCase()}
    </h1>
  )
}

export default TitleGame