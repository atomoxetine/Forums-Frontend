'use client'

import "./styles.css"

export interface Props {
  color: string
}

export default function Bullet(props: Props) {
  const { color } = props;

  return <>
    <style jsx>
    {`
      .bullet::after,.bullet::before {
        background-color: ${color};
      }
    `}
    </style>
    <div className="bullet" />
  </>
}
