import { Hero } from "@/components/home/Hero";
import { Problem } from "@/components/home/Problem";
import { Format } from "@/components/home/Format";
import { Team } from "@/components/home/Team";
import { ApplicationForm } from "@/components/home/ApplicationForm";
import { DividerLine } from "@/components/ui/DividerLine";

export default function Home() {
  return (
    <>
      <Hero />
      <Problem />
      <DividerLine />
      <Format />
      <Team />
      <ApplicationForm />
    </>
  );
}
