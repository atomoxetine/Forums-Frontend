export default function Page() {
  return (
    <div className="flex flex-col items-center w-full h-full">
      <h3 className="mb-5 mt-2 text-primary font-bold text-center">Frequently Asked Questions</h3>

      <div className="h-full w-full flex flex-col items-center justify-around gap-4">
        <Question
          question="How do I report rule breakers?"
          answer="General Reporting: Using /report is a way, in-game, of reporting players who you believe are breaking our rules. | Evidence Reporting: If you have sufficient evidence, such as a screenshot or video recording, you are able to create a player report on our website https://www.mccade.net/. "></Question>
        <Question
          question="How do I signup on the MCCade forums?"
          answer="Step 1: Log on into our server and type /register followed by your email. 
          Step 2: Check your email as you should have received a confirmation email to finish setting up your account.
          Step 3: Click the link in the email, set a password and complete the signup process."></Question>
        <Question
          question="How do I sync my discord account to my minecraft account?          "
          answer="Step 1: Log on into our server and type /sync.
          Step 2: From the message provided, head to ⁠📡︱sync-channel and type /sync (code). "></Question>
        <Question
          question="How do I obtain a donator rank on MCCade?"
          answer="Purchasing Ranks: To purchase a donator rank, you can head to our store at https://store.mccade.net/ where you will be able to purchase and view our different items on offer!
          Winning Events & Giveaways: By simply entering our giveaways and events, you may be subject to winning a rank as a prize! Make sure to tune in on all events and giveaways to have a chance!"></Question>
        <Question
          question="Question that is soooo frequently asked..."
          answer="Answer that is soooo frequently said...."></Question>
      </div>
    </div>
  );
}

const Question = (props: { question: string; answer: string; }) => (
  <div className="collapse collapse-arrow bg-base-100 bg-opacity-65 rounded-lg in-view">
    <input type="checkbox"/>
    <h6 className="flex items-center collapse-title">
      {props.question}
    </h6>
    <div className="collapse-content flex items-start"> 
      <small>{props.answer}</small>
    </div>
  </div>
);
