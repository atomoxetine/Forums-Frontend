import './styles.css'

interface UserParams {
}
export default function Page({ }: UserParams) {
  const categories = [
    {
      title: 'Blockgame',
      subforums: [
        {
          title: 'Announcements',
          description: 'News, announcements, changes, and more.',
          posts: 1,
          lastActivity: { thread: 'Meow', user: 'Oestradiol', time: '2 minutes ago' }
        },
      ],
    },
    {
      title: 'Community',
      subforums: [
        {
          title: 'Announcements',
          description: 'News, announcements, changes, and more.',
          posts: 1,
          lastActivity: { thread: 'Meow', user: 'Oestradiol', time: '2 minutes ago' }
        },
        {
          title: 'Announcements',
          description: 'News, announcements, changes, and more.',
          posts: 1,
          lastActivity: { thread: 'Meow', user: 'Oestradiol', time: '2 minutes ago' }
        },
        {
          title: 'Announcements',
          description: 'News, announcements, changes, and more.',
          posts: 1,
          lastActivity: { thread: 'Meow', user: 'Oestradiol', time: '2 minutes ago' }
        },
      ],
    },
    {
      title: 'Gamemodes',
      subforums: [
        {
          title: 'Announcements',
          description: 'News, announcements, changes, and more.',
          posts: 1,
          lastActivity: { thread: 'Meow', user: 'Oestradiol', time: '2 minutes ago' }
        },
        {
          title: 'Announcements',
          description: 'News, announcements, changes, and more.',
          posts: 1,
          lastActivity: { thread: 'Meow', user: 'Oestradiol', time: '2 minutes ago' }
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
    <section className="flex flex-col justify-center items-center">
      <div className="flex flex-row h-min w-full p-4 gap-4 inner">
        <div className="flex flex-col overflow-y-scroll overflow-x-hidden w-full gap-4 rounded-lg h-[624px] categories">
          {categories.map((c, i) => <Category key={i} title={c.title} subforums={c.subforums}/>)}
        </div>
        <div className="grid-container h-min">
          {aside.map((a, i) => <Aside key={i} title={a.title} content={a.content}/>)}
        </div>
      </div>
    </section>
  </>;
}

interface SubforumData {
  title: string;
  description: string;
  posts: number;
  lastActivity: {
    thread: string;
    user: string;
    time: string;
  }
}
const Subforum = (props: SubforumData) => {
  const {
    title, description, posts,
    lastActivity: { thread, user, time }
  } = props;

  return (
    <div className="col-span-3 grid grid-cols-subgrid items-center py-2 px-3 mx-3 bg-base-200 font-semibold rounded-lg">
      <small className="flex flex-col items-start text-start text-neutral">
        {title}
        <small className="smaller">
          {description}
        </small>
      </small>
      <small className="flex justify-center text-center">{posts}</small>
      <small className="flex flex-col items-end text-end">
        <span className="text-neutral">{thread}</span>
        <span className="text-primary">{user}</span>
        <small className="smaller">
          {time}
        </small>
      </small>
    </div>
  );
}

interface CategoryData {
  title: string;
  subforums: SubforumData[];
}
const Category = (props: CategoryData) => {
  const {
    title,
    subforums
  } = props;

  return (
    <div className="forum-category border-[1px] border-base-200 gap-y-3 pb-3 rounded-lg">
      <div className="col-span-3 grid grid-cols-subgrid py-2 px-4 bg-base-300 rounded-t-lg">
        <small className="flex justify-start text-start smaller tracking-wider uppercase">{title}</small>
        <small className="flex justify-center text-center smaller tracking-wider uppercase">Posts</small>
        <small className="flex justify-end text-end smaller tracking-wider uppercase">Latest post</small>
      </div>
      {
        subforums.map((sf, i) => 
          <Subforum key={i} title={sf.title} description={sf.description} posts={sf.posts} lastActivity={sf.lastActivity}/>
        )
      }
    </div>
  );
}

interface AsideProps {
  title: string;
  content: JSX.Element[];
}
const Aside = (props: AsideProps) => {
  const {title, content} = props;

  return (
    <div className="forum-category border-[1px] border-base-200 gap-y-3 pb-3 rounded-lg">
      <small className="col-span-3 flex justify-center text-center smaller tracking-wider uppercase py-2 px-4 bg-base-300 rounded-t-lg">
        {title}
      </small>
      {
        content.map((c, i) => 
          <small key={i} className="col-span-3 flex flex-col items-end text-end py-2 px-3 mx-3 bg-base-200 rounded-lg font-semibold">{c}</small>
        )
      }
    </div>
  );
}