import './styles.css';

export default function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>
    <div id="withNav" className="flex flex-col justify-center items-center h-full w-full p-4">
      <div className="flex flex-col h-fit w-fit rounded-xl">
        <div className="w-full rounded-t-xl pt-6 bg-base-200">

        </div>
        <div className="flex h-fit w-fit inner p-2 gap-4 bg-base-300 rounded-b-xl">
          {children}
        </div>
      </div>
    </div>
  </>;  
}