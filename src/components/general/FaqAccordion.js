"use client";

import { useState } from "react";
import { AngleIcon } from "../ui/Icons";
import { cn } from "@/lib/cn";

export default function FaqAccordion() {
  const [activeTab, setActiveTab] = useState(null);

  function toggleAccordionTab(key) {
    setActiveTab((prevKey) => {
      if (key === prevKey) {
        return null;
      }

      return key;
    });
  }

  const faqContent = [
    {
      header: "sdf1",
      body: "asf",
    },
    {
      header: "asf2",
      body: "asf",
    },
    {
      header: "asf3",
      body: "asf",
    },
  ];

  return (
    <div>
      {faqContent?.length > 0 &&
        faqContent.map((faqItem, index) => {
          return (
            <div key={`faqItem${index}`}>
              <h2>
                <button
                  type="button"
                  className="flex items-center justify-between w-full py-5 font-medium rtl:text-right text-gray-500 border-b border-gray-200"
                  onClick={() => toggleAccordionTab(`faqItem${index}`)}
                >
                  <span>{faqItem?.header}</span>
                  <AngleIcon
                    className={cn(
                      "transition-all",
                      activeTab === `faqItem${index}` && "rotate-180"
                    )}
                  />
                </button>
              </h2>
              <div
                className={cn(
                  "hidden",
                  activeTab === `faqItem${index}` && "block"
                )}
              >
                <div className="py-5 border-b border-gray-200">
                  <p className="mb-2 text-gray-500">{faqItem?.body}</p>
                </div>
              </div>
            </div>
          );
        })}
    </div>
  );
}
