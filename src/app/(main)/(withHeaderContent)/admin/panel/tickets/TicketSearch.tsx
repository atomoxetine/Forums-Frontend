'use client'

import { stringToDate, toLocaleString } from "@/libs/Utils";
import Ticket from "@/libs/types/entities/Ticket";
import TicketCategory from "@/libs/types/entities/TicketCategory";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { FaSearch } from "react-icons/fa";
import "./styles.css";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight, MdKeyboardDoubleArrowLeft, MdKeyboardDoubleArrowRight } from "react-icons/md";

export interface Props {
  tickets: Ticket[];
  categories: TicketCategory[];
  userCache: { [key: string]: { uuid: string, name: string, color: string } };
}

const PAGE_LEN = 10;
const LCS_TRESHOLD = 0.8; // 80% correct at least
const BREAKS = /[\s\n\r\t,;.!?: ]/g;

function max(a: number, b: number) {
  return a > b ? a : b;
}

function min(a: number, b: number) {
  return a < b ? a : b;
}

/**
 * Implementation of this thing but without whitespace, punctiation, etc
 * https://en.wikipedia.org/wiki/Longest_increasing_subsequence
 *
 */
function LCSWithBreaks(str: string, query: string) {
  if (!str) return 0;
  if (!query) return 0;
  if (str.length == 0) return 0;
  if (query.length == 0) return 0;

  const strTrim = str.toLowerCase().replaceAll(BREAKS, "");
  const queryTrim = query.toLowerCase().replaceAll(BREAKS, "");

  const dp: number[][] = Array(strTrim.length + 1)
    .fill(0)
    .map(() => Array(queryTrim.length + 1).fill(0));

  for (let i = 1; i <= strTrim.length; i++) {
    for (let j = 1; j <= queryTrim.length; j++) {
      dp[i][j] = max(dp[i - 1][j], dp[i][j - 1]);
      if (strTrim[i - 1] === queryTrim[j - 1])
        dp[i][j] = max(dp[i][j], 1 + dp[i - 1][j - 1]);
    }
  }

  return dp[strTrim.length][queryTrim.length];
}

function matches(str: string, query: string) {
  return LCSWithBreaks(str, query) >= Math.floor(query.length * LCS_TRESHOLD);
}

export default function TicketSearch(props: Props) {
  const { tickets, categories, userCache } = props;

  const categoryMap = useMemo(() => categories
    .reduce<{ [key: string]: TicketCategory }>((obj, crr) => {
      obj[crr._id] = crr
      return obj
    }, {}), []);

  const [categoryFilter, setCategoryFilter] = useState<string[]>([]);
  const [statusFilter, setStatusFilter] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<"category" | "status" | "lastUpdated" | "createdAt" | "title">("lastUpdated");
  const [order, setOrder] = useState<"asc" | "desc">("desc");
  const [query, setQuery] = useState<string>("");
  const [page, setPage] = useState<number>(0);

  const selectedTickets = useMemo(() => {
    const ticketsTmp = tickets
      .filter(t => categoryFilter.length == 0
        || categoryFilter.find(f => t.category == f))
      .filter(t => statusFilter.length == 0
        || statusFilter.find(f => t.status == f))
      .filter(t => query == ""
        || matches(t.title, query)
        // || matches(t.body, query)
        || matches(userCache[t.author]?.name || "", query)
        || matches(t.result, query));

    const orderFact = order == "asc" ? -1 : 1;

    switch (sortBy) {
      case "category":
        ticketsTmp.sort((a, b) => {
          const aN = categoryMap[a.category]?.name || "Unknown";
          const bN = categoryMap[b.category]?.name || "Unknown";
          if (aN < bN) return orderFact;
          if (aN > bN) return -orderFact;
          return 0;
        });
        break;
      case "status":
        ticketsTmp.sort((a, b) => {
          const aS = a.status;
          const bS = b.status;
          if (aS < bS) return orderFact;
          if (aS > bS) return -orderFact;
          return 0;
        });
        break;
      case "lastUpdated":
        ticketsTmp.sort((a, b) => {
          const aT = a.lastUpdatedAt;
          const bT = b.lastUpdatedAt;
          if (aT < bT) return orderFact;
          if (aT > bT) return -orderFact;
          return 0;
        });
        break;
      case "createdAt":
        ticketsTmp.sort((a, b) => {
          const aT = a.createdAt;
          const bT = b.createdAt;
          if (aT < bT) return orderFact;
          if (aT > bT) return -orderFact;
          return 0;
        });
        break;
      case "title":
        ticketsTmp.sort((a, b) => {
          const aN = a.title;
          const bN = b.title;
          if (aN < bN) return orderFact;
          if (aN > bN) return -orderFact;
          return 0;
        });
    }

    setPage(0);
    return ticketsTmp;

  }, [categoryFilter, sortBy, order, statusFilter, query]);

  const lastPage = Math.floor(selectedTickets.length / PAGE_LEN);

  return <div className="flex flex-col gap-3 bg-base-200 p-2">
    <div className="flex flex-col gap-2 bg-base-300 p-2">
      <div className="rounded-md bg-base-100 flex flex-row">
        <FaSearch className="h-6 w-6 mx-2 mt-[6px]" />
        <input
          className="text-lg w-full rounded-e-md"
          placeholder="Search"
          onInput={e => setQuery(e.currentTarget.value)} />
      </div>
      <div className="flex flex-row flex-wrap gap-3">
        <select
          className="p-2 bg-blue-600 rounded-lg text-white"
          onChange={e => e.currentTarget.value == "*"
            ? setCategoryFilter([])
            : setCategoryFilter([e.currentTarget.value])}>
          <option value="*">Select Category</option>
          {categories.map(c  =>
            <option key={c._id} value={c._id}>{c.name}</option>
          )}
        </select>
        <select
          className="p-2 bg-blue-600 rounded-lg text-white"
          onChange={e => setSortBy(e.currentTarget.value as "category" | "status" | "lastUpdated" | "createdAt" | "title")}>
          <option value="lastUpdated">Sort: Last Updated</option>
          <option value="createdAt">Sort: Created At</option>
          <option value="title">Sort: Title</option>
          <option value="status">Sort: Status</option>
          <option value="category">Sort: Category</option>
        </select>
        <select
          className="p-2 bg-blue-600 rounded-lg text-white"
          onChange={e => setOrder(e.currentTarget.value as "asc" | "desc")}>
          <option value="desc">Order: Descending</option>
          <option value="asc">Order: Ascending</option>
        </select>
        <select
          className="p-2 bg-blue-600 rounded-lg text-white"
          onChange={e => e.currentTarget.value == "*"
            ? setStatusFilter([])
            : setStatusFilter([e.currentTarget.value])}>
          <option value="*">Select Status</option>
          <option value="open">Status: Open</option>
          <option value="closed">Status: Closed</option>
          <option value="archived">Status: Archived</option>
        </select>
      </div>
    </div>
    <div className="rounded-md bg-base-100 px-5 py-2 flex flex-row justify-between w-fit mx-auto">
      <MdKeyboardDoubleArrowLeft
        className="page-anchor w-full" disabled={page == 0}
        onClick={() => setPage(0)} />
      <MdKeyboardArrowLeft
        className="page-anchor w-full" disabled={page == 0}
        onClick={() => setPage(max(page - 1, 0))} />
      {Array.apply(null, Array(5))
        .map((_, i) => page + (i - 2))
        .map(k =>
          <div
            key={k}
            className="page-anchor text-lg mx-2"
            style={{ fontWeight: k == page ? "bolder" : "normal" }}
            onClick={() => setPage(k)}>
            {k >= 0 && k <= lastPage ? k + 1 : ""}
          </div>
        )}
      <MdKeyboardArrowRight
        className="page-anchor" disabled={page == lastPage}
        onClick={() => setPage(min(page + 1, lastPage))} />
      <MdKeyboardDoubleArrowRight
        className="page-anchor" disabled={page == lastPage}
        onClick={() => setPage(lastPage)} />
    </div>
    <div className="flex flex-col gap-2 p-2 min-h-[650px]">
      <div className="flex flex-row justify-between gap-2 p-2 ticket-header">
        <div className="max-w-[10%] min-w-[10%]">Title</div>
        <div className="max-w-[10%] min-w-[10%]">Author</div>
        <div className="max-w-[12%] min-w-[12%]">Category</div>
        <div className="max-w-[8%] min-w-[8%]">Status</div>
        <div className="max-w-[8%] min-w-[8%]">Result</div>
        <div className="max-w-[16%] min-w-[16%]">Created At</div>
        <div className="max-w-[16%] min-w-[16%]">Updated At</div>
        <div className="max-w-[6%] min-w-[6%]">Replies</div>
      </div>
      {selectedTickets.slice(page * PAGE_LEN, page + PAGE_LEN).map(t =>
        <Link key={t._id} href={`/support/tickets/${t._id}`}>
          <div className="flex flex-row justify-between gap-2 bg-base-100 p-2 ticket">
            <div className="max-w-[10%] min-w-[10%]">{t.title}</div>
            <div className="max-w-[10%] min-w-[10%]">{userCache[t.author].name || "Unknown"}</div>
            <div className="max-w-[12%] min-w-[12%]">{categoryMap[t.category]?.name || "Unknown"}</div>
            <div className="max-w-[8%] min-w-[8%]">{t.status}</div>
            <div className="max-w-[8%] min-w-[8%]">{t.result}</div>
            <div className="max-w-[16%] min-w-[16%]">{toLocaleString(stringToDate(t.createdAt))}</div>
            <div className="max-w-[16%] min-w-[16%]">{toLocaleString(stringToDate(t.lastUpdatedAt))}</div>
            <div className="max-w-[6%] min-w-[6%]">{t.replies.length}</div>
          </div>
        </Link>
      )}
    </div>
  </div>
}
