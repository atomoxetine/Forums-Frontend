'use client';
import { InView } from "react-intersection-observer";

export default function Page() {
    // Thanks elaina uwu
    //start elaina code
const Question = (props: { question: string; answer: string }) => (
  <div className="relative w-full">
    <InView
      as="div"
      className="absolute top-0 left-0 h-full w-full"
      threshold={0.67}
      initialInView={true}
      fallbackInView={true}
      onChange={(inView, event) => event.target?.parentElement?.children[1]?.classList.toggle('in-view', inView)}
    ></InView>

    <div className="collapse collapse-arrow bg-base-200 bg-opacity-65 rounded-lg in-view text-left">
      <input type="checkbox" />
      <h6 className="collapse-title flex"><span className="my-auto">{props.question}</span></h6>
      <div className="collapse-content bg-base-100 pt-2">
        <small>{props.answer}</small>
      </div>
    </div>
  </div>
);
//end elaina code

  return (
    <div className="flex flex-col gap-y-2">
      <h1 className="text-rainbow text-4xl md:text-5xl lg:text-6xl font-medium font-header lg:max-w-[72rem] mx-auto">
        Global Network Rules
      </h1>
      <p className="text-warning font-header font-medium mx-auto">
        Effective Date:  March 16th, 2024 | Last Updated:  March 16th, 2024
      </p>
      <div className="flex flex-col md:gap-y-4 mt-10">
        <p>
        We want to offer everybody a safe environment where they are able to have fun, meet new people, share their opinions, and be respected on the network. The focus of our rules is to ensure a positive and accepting environment for all our users.
        </p>
        <br></br>
        <p>In order to achieve this we enforce a set of rules focused on the following:</p>
        </div>
        <Question
        question="1. Keep your account secure"
        answer="Account security is your responsibility, you should never share your account to anyone for any reason. Make sure to always have a strong and unique password for all of your accounts. Do not use accounts that you did not purchase from https://www.minecraft.net/en-us/."
        />
        <Question
        question="2. Do not spam"
        answer="Do not participate in “spammy” or “trolling” behaviour that is inherently disruptful to MCCade or other users."
        />
        <Question
        question="3. Treat other users with respect"
        answer="Do not participate in or encourage rudeness, abuse, discrimination/racism, or harassment of other users. All members of our community have a right to be respected and partake in an enjoyable experience. Do not continue to try and interact with users after they have made clear they do not want to continue talking to you anymore."
        />
        <Question
        question="4. Do not use inappropriate language and/or create inappropriate content"
        answer="We want to offer users of all ages and backgrounds the opportunity to interact with all users on the network without being exposed to inappropriate content. This includes profanity, slurs, abbreviations, or any other content that is not appropriate for children of all ages."
        />
        <Question
        question="5. Do not make threats or recommendations of violence or malicious activity towards MCCade or other users, or partake in such activities"
        answer="Malicious threats or wishes of harm of any kind towards any user are not permitted, even as a “joke”."
        />
        <Question
        question="6. Do not abuse our platform to advertise external servers, websites, or services"
        answer="We explicitly filter links and IPs to services that may not be advertised on our platform. Do not attempt to circumvent our filters or actively promote/redirect users to check out content outside our approved platforms."
        />
        <Question
        question="7. Do not attempt to use our platforms for the purposes of engaging in any sort of transactions or scamming"
        answer="Do not attempt to use our platform(s) for the purposes of engaging in the exchange of any goods/items outside of approved giveaway purposes. Any attempt to scam users is not permitted.."
        />
        <Question
        question="8. Do not infringe on anyone’s intellectual property"
        answer="Plagiarising content without permission and/or giving appropriate credit is not permitted."
        />
        <Question
        question="9. Play fairly, don’t cheat"
        answer="Do not use any type of modification to the Minecraft client that allows you to have an advantage over others are not permitted. This can include hacking, unapproved modifications, etc. Additionally, do not use any flaws in the way a map is designed, bugs that you find in mechanics of the server/client, exploit means of gaining statistics, etc."
        />
      <br></br>
      <p>
      These rules are not a complete comprehensive list of all of the rules we have on the network but are more general guidelines that if you follow, 
      you should not be met with punishment. If you would like to see more comprehensive guidelines you are able to check any of the tabs above for those.
      </p>
      <br></br>
      <p>
      The rules exist at the discretion of the MCCade Developers, Agents, Administrators, Managers and Owners and may be changed without notice at any time.
      </p>
      <br></br>
      <p>
      Punishments may be enforced outside these specific clearly defined categories if deemed necessary at the direction of the aforementioned MCCade representatives.  
      </p>
      </div>
  );
}


