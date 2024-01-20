export default function Terms() {
  return (
    <div className="flex flex-col gap-y-2">
      <h1 className="text-rainbow text-4xl md:text-5xl lg:text-6xl font-medium font-header lg:max-w-[72rem] mx-auto">
        Terms of Service
      </h1>
      <p className="text-warning font-header font-medium mx-auto">
        Effective Date:  January 20th, 2024 | Last Updated:  January 20th, 2024
      </p>

      <div className="flex flex-col md:gap-y-4 mt-10">
        <p>
          Welcome to MCCade's Terms of Service. By using our website, you are bond to the following terms and conditions. Please read them carefully.
        </p>
        <p>
          MCCade is a Minecraft server network, and is not affiliated with Mojang Studios. All content relating to Minecraft is owned by Mojang Studios.
        </p>
        <h4 className="text-blue">Trademarks and Copyright  </h4>
        <p>
        Minecraft content and materials are trademarks and copyrights of Mojang AB or its licensors. All rights reserved. This site is part of PinkCloud Studios and is licensed to MCCade Games.
        </p>

      </div>
      
    </div>
  );
}