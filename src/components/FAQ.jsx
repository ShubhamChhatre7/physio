import React, { useState } from 'react';
import './FAQ.css';
import { ChevronDown, ChevronUp } from 'lucide-react';

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqData = [
    {
      category: "General Information",
      items: [
        {
          question: "What is physiotherapy?",
          answer: "Physiotherapy is a healthcare profession that focuses on improving movement, function, and overall well-being through various physical methods such as exercises, manual therapy, education, and advice."
        },
        {
          question: "Do I need a doctor's referral to see a physiotherapist?",
          answer: "No, you don't need a referral to book an appointment. However, some insurance providers may require a doctor's referral for coverage."
        }
      ]
    },
    {
      category: "Services and Treatments",
      items: [
        {
          question: "What conditions do you treat?",
          answer: "We treat a variety of conditions, including:\n• Back and neck pain\n• Sports injuries\n• Post-surgical rehabilitation\n• Arthritis and joint issues\n• Neurological disorders (e.g., stroke, Parkinson's disease)\n• Pediatric conditions"
        },
        {
          question: "What types of treatments do you offer?",
          answer: "Our clinic provides:\n• Manual therapy\n• Exercise therapy\n• Electrotherapy (e.g., TENS, ultrasound)\n• Postural correction\n• Dry needling\n• Education and prevention strategies"
        }
      ]
    },
    {
      category: "Appointments and Scheduling",
      items: [
        {
          question: "How do I book an appointment?",
          answer: "You can book an appointment by calling us, visiting our website, or using our online booking system."
        },
        {
          question: "What should I bring to my first appointment?",
          answer: "Please bring the following:\n• Any relevant medical reports or imaging (e.g., X-rays, MRIs)\n• Comfortable clothing suitable for movement\n• Your insurance information (if applicable)"
        }
      ]
    },
    {
      category: "Payment and Insurance",
      items: [
        {
          question: "Do you accept insurance?",
          answer: "Yes, we accept most major insurance providers. Please contact us to confirm coverage."
        },
        {
          question: "What payment methods do you accept?",
          answer: "We accept cash, credit/debit cards, and digital payments."
        }
      ]
    },
    {
      category: "During the Appointment",
      items: [
        {
          question: "What can I expect during my first session?",
          answer: "Your first session will include:\n• A thorough assessment of your condition\n• Discussion of your medical history\n• Development of a personalized treatment plan"
        },
        {
          question: "How long is each session?",
          answer: "Sessions typically last between 30-60 minutes, depending on your treatment plan."
        }
      ]
    },
    {
      category: "Miscellaneous",
      items: [
        {
          question: "Is physiotherapy painful?",
          answer: "Some treatments may cause temporary discomfort, especially during rehabilitation of injuries. Your physiotherapist will work within your tolerance to ensure a safe and effective recovery."
        },
        {
          question: "How many sessions will I need?",
          answer: "The number of sessions depends on your condition and recovery goals. Your physiotherapist will provide an estimated treatment plan after the initial assessment."
        }
      ]
    }
  ];

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  let globalIndex = 0;
  
  return (
    <div className="faq-container">
      <div className="faq-header">
        <h1>Frequently Asked Questions</h1>
        <p>Find answers to common questions about our physiotherapy services</p>
      </div>
      
      <div className="faq-list">
        {faqData.map((category, categoryIndex) => (
          <div key={categoryIndex} className="faq-category">
            <h2>{category.category}</h2>
            {category.items.map((item) => {
              const currentIndex = globalIndex++;
              return (
                <div 
                  key={currentIndex}
                  className={`faq-item ${activeIndex === currentIndex ? 'active' : ''}`}
                >
                  <div 
                    className="faq-question"
                    onClick={() => toggleAccordion(currentIndex)}
                  >
                    <h3>{item.question}</h3>
                    {activeIndex === currentIndex ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
                  </div>
                  <div className="faq-answer">
                    <p>{item.answer.split('\n').map((line, i) => (
                      <React.Fragment key={i}>
                        {line}
                        <br />
                      </React.Fragment>
                    ))}</p>
                  </div>
                </div>
              );
            })}
          </div>
        ))}
      </div>

      <div className="faq-footer">
        <p>Still have questions? Contact us at (555) 123-4567 or email info@physioclinic.com</p>
      </div>
    </div>
  );
};

export default FAQ;