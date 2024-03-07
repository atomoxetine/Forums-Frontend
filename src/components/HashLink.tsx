'use client';
import { Url } from "next/dist/shared/lib/router/router";
import Link from "next/link";
import {CSSProperties} from "react";

/**
 * @deprecated Use Link instead
 */
const HashLink = (props: { href: Url; children: any; className?: string; style?: CSSProperties }) => (
  <Link tabIndex={0} href={props.href} className={props.className} style={props.style}
    onClick={() => {
      // Checks if href isn't empty;
      const href = props.href.toString();
      if (!href.length) return;

      // Checks if origin is current domain;
      const origin = window.location.origin;
      const url = href.charAt(0) === '/' ? new URL(href, origin) : new URL(href);
      if (url.origin !== origin) return;

      // Then, updates.
      window.location.hash = url.hash;
    }}
  >
    {props.children}
  </Link>
);

export default HashLink;
