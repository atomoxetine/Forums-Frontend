export default interface Thread {
  _id: string,
  title: string,
  body: string,
  forum: string,
  author: string,
  createdAt: string,
  lastEditedBy: string,
  lastEditedAt: string,
  lastReplyAt: string,
  pinned: boolean,
  locked: boolean,
  parentThreadId: string,
  authorName: string,
  authorWebColor: string,
  forumName: string,
  replies: Thread[] // Replies are subthreads
}