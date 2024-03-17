'use client';

import './styles.css';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const fallbackImage = "/img/mccade-stamp.png"
interface NewsWidgetProps {
  src: string;
  title: string;
  body: string;
  className?: string;
  useFallback?: boolean;
  href: string;
}
const NewsWidget = (props: NewsWidgetProps) => {
  let { src, title, body, className, useFallback, href } = props;
  if (useFallback === true)
    src = fallbackImage;

  return (
    <Link href={href}>
      <div className={`news-widget flex flex-col ${className || ''}`}>
        <div className="inner flex flex-wrap justify-center gap-6">
          <div className="img-container flex justify-center items-center flex-[1_0_min-content]">
            <Image width={1200} height={800} src={src || "/img/placeholder.png"} alt="" />
          </div>

          <div className="content flex flex-col gap-2 max-w-[600px] max-h-[400px]">
            <h3 className="font-bold title">{title}</h3>
            <p className="body" dangerouslySetInnerHTML={{__html: body}}></p>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default NewsWidget;
