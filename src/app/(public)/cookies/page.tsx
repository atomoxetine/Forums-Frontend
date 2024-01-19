import './styles.css';

export default function Cookies() {
  return (
    <section id="terms" className="flex flex-col items-center justify-center gap-y-6 w-full h-full p-16 pt-32">
      <div className="flex flex-col gap-y-2 max-w-[1180px]">
        <h1 className="text-rainbow text-4xl md:text-5xl lg:text-6xl font-medium font-header lg:max-w-[72rem] mx-auto">
          Cookie Policy
        </h1>
        <p className="text-warning font-header font-medium mx-auto">
          Effective Date:  January 11th, 2024 | Last Updated:  January 11th, 2024
        </p>
        <div className="flex flex-col md:gap-y-4 mt-10">
          <h4 className="font-bold text-secondary">1. Introduction</h4>
          <p>
            Welcome to the PinkCloud Studios website. This Cookie Policy is designed to inform you about our use of cookies and similar technologies when you visit our website. By using our website, you agree to the use of cookies as described in this policy.
          </p>
          <h4 className="font-bold text-secondary">2. What are cookies?</h4>
          <p>
            Cookies are small text files that are stored on your computer or mobile device when you visit a website. They are widely used to enhance user experience, improve website performance, and provide certain functionalities.
          </p>
          <h4 className="font-bold text-secondary">3. Types of Cookies</h4>
          <ol className="inline-flex flex-col gap-2">
            <li>
              <h6 className="font-bold">Essential Cookies</h6>
              <p>
                These cookies are necessary for the proper functioning of our website. They enable you to navigate our site and use its features. Without these cookies, certain services may not be provided. 
              </p>
            </li>
            <li>
              <h6 className="font-bold">Analytical/Performance Cookies</h6>
              <p>
                We use these cookies to collect information about how visitors use our website. The data collected is used to improve the performance and functionality of our site. These cookies do not collect personally identifiable information.
              </p>
            </li>
            <li>
              <h6 className="font-bold">Functionality Cookies</h6>
              <p>
                These cookies allow our website to remember choices you make and provide enhanced features. They may also be used to provide services you request, such as language preferences or personalized content.
              </p>
            </li>
            <li>
              <h6 className="font-bold">Third-Party Cookies</h6>
              <p>
                Some of our web pages may contain content from third-party websites (e.g., social media plugins) that may set their own cookies. We do not have control over the placement of these cookies, and you should review the third-party websites' cookie policies.  
              </p>
            </li>
          </ol>
          <h4 className="font-bold text-secondary">4. How to Manage Cookies</h4>
          <p>
            Most web browsers allow you to control cookies through their settings. You can usually find these settings in the "options" or "preferences" menu of your browser. However, disabling certain cookies may impact the functionality of our website.  
          </p>
          <h4 className="font-bold text-secondary">5. Changes to this Policy</h4>
          <p>
            We may update our Cookie Policy from time to time to reflect changes in technology or applicable regulations. Any changes will be posted on this page, and the date of the last update will be revised accordingly.   
          </p>
        </div>
      </div>
    </section>
  );
}