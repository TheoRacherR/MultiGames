
const Informations = ({title, description, buttonPlay, estimatedTime, infoBlocks}: {title: string, description: string, buttonPlay: JSX.Element, estimatedTime: string, infoBlocks: JSX.Element}) => {
  return (
    <div>
      <h2 className="text-4xl md:text-5xl font-extrabold leading-tight tracking-tight" style={{color: '#FFFFFF'}}>{title.toUpperCase()}</h2>
      <p className="mt-4 text-[#EDEBFF] max-w-xl">{description}</p>

      <div className="mt-6 flex flex-wrap items-center gap-3">
        {buttonPlay}

        <span className="ml-2 inline-flex items-center px-3 py-1 rounded-full bg-white/10 text-sm">
          <strong className="ml-2 mr-1">•</strong> Temps moyen : {estimatedTime}
        </span>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-3">
        {infoBlocks}
      </div>
    </div>
  )
}

export default Informations