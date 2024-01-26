import './styles.css'
import MCBust from '@/components/Minecraft/MCBust';
import NavLink from '@/components/NavLink/component';
import React from "react";

export default function Forums() {
  return <>
  <section className="flex flex-col justify-center items-center">
    <div className="flex flex-row-reverse h-min w-fit p-4 gap-4 inner">
      <div className="grid grid-flow-row-dense aside flex-[0_0_min-content] justify-center mb-auto items-start h-fit w-fit gap-x-4">
        
      </div>
      <div className="content w-screen max-w-full">
        <div className="flex flex-col gap-4 w-full">
          <div className="flex flex-wrap gap-4">
            <NavLink className="btn bg-base-300 hover:bg-base-100 py-2 px-4 min-h-fit h-fit flex-1" href={'/'}>
              General
            </NavLink>
            <NavLink className="btn bg-base-300 hover:bg-base-100 py-2 px-4 min-h-fit h-fit flex-1" href={'/'}>
              Statistics
            </NavLink>
            <NavLink className="btn bg-base-300 hover:bg-base-100 py-2 px-4 min-h-fit h-fit flex-1" href={'/'}>
              Forums
            </NavLink>
          </div>
          <div className="h-[492px] w-full overflow-y-scroll overflow-x-hidden p-4 bg-base-200 rounded-lg inner-content">
          Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test 
          </div>
        </div>
      </div>
    </div>
  </section>
  </>;
}