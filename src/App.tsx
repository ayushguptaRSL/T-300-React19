import React from "react";
import { JobApplicationWizard } from "./components/JobApplicationWizard.tsx";

export const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6">
      <main className="max-w-2xl mx-auto">
        <JobApplicationWizard />
      </main>
    </div>
  );
};

export default App;
