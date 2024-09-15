"use client";

import MentorshipProgram from "./components/MentorshipProgram";
import MainSec from "./components/main";
import ContentSection from "./components/ContentSection";
import CodingChallenges from "./components/CodingChallenges";
import FrontendLayout from "./layout";

export default function Home() {
  return (
    <FrontendLayout>
      <MainSec />
      <ContentSection />
      <CodingChallenges />
      <MentorshipProgram />
    </FrontendLayout>
  );
}
