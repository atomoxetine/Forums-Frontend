
export interface Props {
  title: string,
  entries: string[],
  backgroundImage: string,
}

export default async function StatsWidget(props: Props) {
  const { title, entries, backgroundImage } = props;
  const widgetStyle = {
    backgroundColor: "#505050",
    backgroundImage: `url(${backgroundImage})`,
    backgroundBlendMode: "lighten",
  }

  return <>
    <div className="rounded-lg max-w-[350px] min-w-[250px] min-h-[300px] p-2 text-center shadow-inner bg-full" style={widgetStyle}>
      <div className="flex flex-col gap-2 p-3 bg-gray-800/[90%] rounded-lg h-[100%] w-[100%]">
        <h4 className="font-extrabold text-2xl mx-5 text-white">{title}</h4>
        <div className="flex flex-wrap flex-row gap-2 mt-3 justify-center">
          {entries.map(entry =>
            <span key={entry} className="rounded-lg w-fit font-bold bg-gray-900/[85%] p-4">{entry}</span>
          )}
        </div>
      </div>
    </div>
  </>
}
