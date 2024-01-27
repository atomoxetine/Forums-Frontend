export default function Page() {
  return (
    <div className="flex flex-col items-center w-full h-full">
      <h3 className="mb-5 mt-2 text-primary font-bold text-center">Frequently Asked Questions</h3>

      <div className="h-full w-full flex flex-col items-center justify-around gap-4">
        <Question
          question="Question that is soooo frequently asked..."
          answer="Answer that is soooo frequently said...."></Question>
        <Question
          question="Question that is soooo frequently asked..."
          answer="Answer that is soooo frequently said...."></Question>
        <Question
          question="Question that is soooo frequently asked..."
          answer="Answer that is soooo frequently said...."></Question>
        <Question
          question="Question that is soooo frequently asked..."
          answer="Answer that is soooo frequently said...."></Question>
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