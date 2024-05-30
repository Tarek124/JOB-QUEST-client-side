/* eslint-disable no-unused-vars */
// src/ResumeBuilder.js
import { useState } from "react";
import { PDFDownloadLink } from "@react-pdf/renderer";
import ResumePDF from "./ResumePDF";
import { Box } from "@mui/material";

const ResumeBuilder = () => {
  const [resumeData, setResumeData] = useState({
    name: "",
    email: "",
    phone: "",
    summary: "",
    experiences: [
      {
        jobTitle: "",
        company: "",
        startDate: "",
        endDate: "",
        description: "",
      },
    ],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setResumeData({
      ...resumeData,
      [name]: value,
    });
  };

  const handleExperienceChange = (index, e) => {
    const { name, value } = e.target;
    const experiences = [...resumeData.experiences];
    experiences[index][name] = value;
    setResumeData({
      ...resumeData,
      experiences,
    });
  };

  return (
    <Box
      sx={{
        bgcolor: "background.default",
        color: "text.primary",
      }}
      className="py-8"
    >
      <Box
        className="p-6 max-w-4xl mx-auto shadow-xl rounded-lg border"
      >
        <h1 className="text-3xl font-bold mb-4">Resume Builder</h1>
        <form>
          <div className="mb-4">
            <label className="block text-sm font-medium" htmlFor="name">
              Name:
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={resumeData.name}
              onChange={handleChange}
              className="mt-1 p-2 block w-full border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 dark:text-white"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium" htmlFor="email">
              Email:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={resumeData.email}
              onChange={handleChange}
              className="mt-1 p-2 block w-full border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 dark:text-white"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium" htmlFor="phone">
              Phone:
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={resumeData.phone}
              onChange={handleChange}
              className="mt-1 p-2 block w-full border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 dark:text-white"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium" htmlFor="summary">
              Summary:
            </label>
            <textarea
              id="summary"
              name="summary"
              value={resumeData.summary}
              onChange={handleChange}
              className="mt-1 p-2 block w-full border border-gray-300 dark:border-gray-600 rounded-md"
              rows="4"
              required
            />
          </div>

          <h3 className="text-xl font-bold mb-2">Work Experience</h3>
          {resumeData.experiences.map((experience, index) => (
            <div
              key={index}
              className="mb-4 p-4 border border-gray-200 dark:border-gray-600 rounded-lg"
            >
              <div className="mb-4">
                <label
                  className="block text-sm font-medium"
                  htmlFor={`jobTitle-${index}`}
                >
                  Job Title:
                </label>
                <input
                  type="text"
                  id={`jobTitle-${index}`}
                  name="jobTitle"
                  value={experience.jobTitle}
                  onChange={(e) => handleExperienceChange(index, e)}
                  className="mt-1 p-2 block w-full border border-gray-300 dark:border-gray-600 rounded-md"
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-sm font-medium"
                  htmlFor={`company-${index}`}
                >
                  Company:
                </label>
                <input
                  type="text"
                  id={`company-${index}`}
                  name="company"
                  value={experience.company}
                  onChange={(e) => handleExperienceChange(index, e)}
                  className="mt-1 p-2 block w-full border border-gray-300 dark:border-gray-600 rounded-md"
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-sm font-medium"
                  htmlFor={`startDate-${index}`}
                >
                  Start Date:
                </label>
                <input
                  type="date"
                  id={`startDate-${index}`}
                  name="startDate"
                  value={experience.startDate}
                  onChange={(e) => handleExperienceChange(index, e)}
                  className="mt-1 p-2 block w-full border border-gray-300 dark:border-gray-600 rounded-md"
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-sm font-medium"
                  htmlFor={`endDate-${index}`}
                >
                  End Date:
                </label>
                <input
                  type="date"
                  id={`endDate-${index}`}
                  name="endDate"
                  value={experience.endDate}
                  onChange={(e) => handleExperienceChange(index, e)}
                  className="mt-1 p-2 block w-full border border-gray-300 dark:border-gray-600 rounded-md"
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-sm font-medium"
                  htmlFor={`description-${index}`}
                >
                  Description:
                </label>
                <textarea
                  id={`description-${index}`}
                  name="description"
                  value={experience.description}
                  onChange={(e) => handleExperienceChange(index, e)}
                  className="mt-1 p-2 block w-full border border-gray-300 dark:border-gray-600 rounded-mdte"
                  rows="4"
                  required
                />
              </div>
            </div>
          ))}
        </form>
        <PDFDownloadLink
          document={<ResumePDF resumeData={resumeData} />}
          fileName="resume.pdf"
        >
          {({ blob, url, loading, error }) =>
            loading ? (
              "Generating PDF..."
            ) : (
              <button className="px-4 py-2 bg-green-500 text-white rounded-md">
                Download PDF
              </button>
            )
          }
        </PDFDownloadLink>{" "}
      </Box>
    </Box>
  );
};

export default ResumeBuilder;
