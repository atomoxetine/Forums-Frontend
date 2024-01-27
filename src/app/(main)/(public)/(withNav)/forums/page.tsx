import Category, { CategoryData } from './(components)/Category';
import AsideInfo from './(components)/AsideInfo';
import './styles.css'

interface UserParams {
}
export default function Page({ }: UserParams) {
  const categories: CategoryData[] = [
    {
      title: 'Blockgame',
      subforums: [
        {
          id: 'announcements',
          title: 'Announcements',
          description: 'News, announcements, changes, and more.',
          threadN: 1,
          lastActivity: {
            thread: {
              id: "1",
              title:"Meow"
            },
            user: 'Oestradiol',
            time: '2 minutes ago'
          },
        },
      ],
    },
    {
      title: 'Community',
      subforums: [
        {
          id: 'announcements',
          title: 'Announcements',
          description: 'News, announcements, changes, and more.',
          threadN: 1,
          lastActivity: {
            thread: {
              id: "1",
              title:"Meow"
            },
            user: 'Oestradiol',
            time: '2 minutes ago'
          },
        },
        {
          id: 'announcements',
          title: 'Announcements',
          description: 'News, announcements, changes, and more.',
          threadN: 1,
          lastActivity: {
            thread: {
              id: "1",
              title:"Meow"
            },
            user: 'Oestradiol',
            time: '2 minutes ago'
          },
        },
        {
          id: 'announcements',
          title: 'Announcements',
          description: 'News, announcements, changes, and more.',
          threadN: 1,
          lastActivity: {
            thread: {
              id: "1",
              title:"Meow"
            },
            user: 'Oestradiol',
            time: '2 minutes ago'
          },
        },
      ],
    },
    {
      title: 'Gamemodes',
      subforums: [
        {
          id: 'announcements',
          title: 'Announcements',
          description: 'News, announcements, changes, and more.',
          threadN: 1,
          lastActivity: {
            thread: {
              id: "1",
              title:"Meow"
            },
            user: 'Oestradiol',
            time: '2 minutes ago'
          },
        },
        {
          id: 'announcements',
          title: 'Announcements',
          description: 'News, announcements, changes, and more.',
          threadN: 1,
          lastActivity: {
            thread: {
              id: "1",
              title:"Meow"
            },
            user: 'Oestradiol',
            time: '2 minutes ago'
          },
        },
      ],
    },
  ];

  const aside = [
    {
      title: 'Latest Threads',
      content: [
        <>
          <span className="text-neutral">Meow</span>
          <span className="text-primary">Oestradiol</span>
          <small className="smaller">2 minutes ago</small>
        </>,
        <>
          <span className="text-neutral">Meow</span>
          <span className="text-primary">Oestradiol</span>
          <small className="smaller">2 minutes ago</small>
        </>,
      ]
    },
    {
      title: 'Latest Replies',
      content: [
        <>
          <span className="inline-flex gap-1 flex-nowrap whitespace-nowrap">
            <span className="text-primary">Oestradiol</span> replied to
          </span>
          <span className="text-neutral">Meow</span>
          <small className="smaller">2 minutes ago</small>
        </>,
        <>
          <span className="inline-flex gap-1 flex-nowrap whitespace-nowrap">
            <span className="text-primary">Oestradiol</span> replied to
          </span>
          <span className="text-neutral">Meow</span>
          <small className="smaller">2 minutes ago</small>
        </>,
      ]
    },
  ]
  return <>
    <div className="flex flex-wrap-reverse h-full w-full gap-4">
      <div className="flex flex-col overflow-y-scroll overflow-x-hidden gap-3 rounded-lg min-h-[579px] h-[579px] w-screen categories content">
        {categories.map((c, i) => <Category key={i} title={c.title} subforums={c.subforums}/>)}
      </div>
      <aside className="aside-container gap-3 w-full self-end">
        {aside.map((a, i) => <AsideInfo key={i} title={a.title} content={a.content}/>)}
      </aside>
    </div>
  </>;
}