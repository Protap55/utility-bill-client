import React, { useState, useRef, useEffect } from "react";
import { FiPlus, FiMinus } from "react-icons/fi";

const faqs = [
  {
    question: "How can I create a new bill?",
    answer:
      "To create a new bill, go to the 'Add Bill' page, fill in the required details, and click 'Submit'.",
  },
  {
    question: "Can I edit a bill after submission?",
    answer:
      "Yes, you can edit your bills as long as they are not marked as paid.",
  },
  {
    question: "How do I pay my bills?",
    answer:
      "Go to the 'Total Bills' page for the current month and click on 'Pay Bill' for the bill you want to pay.",
  },
  {
    question: "Is my data secure?",
    answer:
      "Only bills created by the currently logged-in user are shown, ensuring personalized and secure data access.",
  },
];

const AccordionItem = ({ faq, isActive, onToggle }) => {
  const contentRef = useRef(null);
  const [height, setHeight] = useState("0px");

  useEffect(() => {
    if (contentRef.current) {
      setHeight(isActive ? `${contentRef.current.scrollHeight}px` : "0px");
    }
  }, [isActive]);

  return (
    <div className="bg-gradient-to-br  from-blue-50 to-blue-100 dark:from-gray-800 dark:to-gray-900 rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl">
      <button
        onClick={onToggle}
        className="w-full px-6 py-5 flex justify-between items-center text-left font-semibold text-gray-800 dark:text-gray-100 focus:outline-none"
      >
        {faq.question}
        <span className="ml-2 text-2xl transition-transform duration-300">
          {isActive ? <FiMinus /> : <FiPlus />}
        </span>
      </button>

      <div
        ref={contentRef}
        style={{ maxHeight: height }}
        className="px-6 overflow-hidden transition-all duration-500 ease-in-out"
      >
        <p className="text-gray-700 dark:text-gray-300 py-4">{faq.answer}</p>
      </div>
    </div>
  );
};

const FaqPage = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="max-w-5xl pt-32 mx-auto px-6 py-24  dark:bg-gray-900 transition-colors duration-500">
      <h1 className="text-5xl font-bold text-center  mb-12 text-blue-500 dark:text-gray-100">
        Frequently Asked Questions
      </h1>

      <div className="space-y-6">
        {faqs.map((faq, index) => (
          <AccordionItem
            key={index}
            faq={faq}
            isActive={activeIndex === index}
            onToggle={() => toggleAccordion(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default FaqPage;
