import HomeHeader from './HomeHeader'
import DiscordWidget from '@/components/DiscordWidget/component'
import NewsWidget from '@/components/NewsWidget/component'
import MCServerWidget from '@/components/Minecraft/MCServerWidget/component'

export default function Page() {
  return (
    <div className="home-h flex-none flex flex-col items-center">
      <HomeHeader />

      <div className="w-screen max-w-screen-xl px-4 sm:px-6 py-6 flex flex-col">
        <div className="flex flex-wrap md:flex-nowrap gap-6 mb-6">
          <div className="home-border inline-flex gap-2 items-center justify-center rounded-lg bg-base-300 min-w-[350px] min-h-full flex-[3_0_min-content] py-2 px-4">
            <div className="bullet"/>
            <h6 className="mb-0.5 uppercase font-bold tracking-wider">Make sure a very important headline goes here!</h6>
          </div>
          <MCServerWidget className="flex-[1_0_min-content]"/>
        </div>

        <div className="flex flex-wrap gap-6">
          <div className="flex flex-col flex-[1_0_min-content] w-fit news-container">
            <NewsWidget className="main" src="/img/mccade-stamp.png" title="Title"
              body="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."/>
            <hr className="my-6 mx-auto"/>
            <div className="flex flex-row w-full justify-center gap-4">
              <Featured title="Featured:" body="1500 Coins [+200 free!]" price={20}/>
              <Featured title="Featured:" body="1500 Coins [+200 free!]" price={20}/>
              <Featured title="Featured:" body="1500 Coins [+200 free!]" price={20}/>
            </div>
            <hr className="my-6 mx-auto"/>
            <div className="flex flex-row w-fit gap-4">
              <NewsWidget src="/img/mccade-stamp.png" title="Title"
                body="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
              />
              <NewsWidget src="/img/mccade-stamp.png" title="Title"
                body="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
              />
              <NewsWidget src="/img/mccade-stamp.png" title="Title"
                body="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
              />
            </div>
          </div>

          <DiscordWidget className="flex flex-col flex-[1_0_min-content]" guildId="1196302844316364860"/>
        </div>
      </div>
    </div>
  );
}


interface FeaturedProps {
  title: string;
  body: string;
  price: number;
  className?: string;
}
const Featured = (props: FeaturedProps) => {
  const {title, body, price, className} = props;
  return (
    <div className={`flex flex-col ${className || ''}`}>
      <div className="flex rounded-xl justify-between bg-base-200 hover:bg-base-300 cursor-pointer gap-4 p-4">
        <div className="flex flex-col gap-2">
          <small className="uppercase">{title}</small>
          <h5 className="font-bold title">{body}</h5>
          <p className="body">${price}</p>
        </div>

        <div className="flex justify-center items-center flex-[0_0_min-content]">
          {body}
        </div>
      </div>
    </div>
  );
}