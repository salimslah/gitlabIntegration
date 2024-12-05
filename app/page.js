import Image from "next/image";
import GitLabUser from "./components/GitLabUser/GitLabUser";
import GitLabProjects from "./components/GitLabProjects/GitLabProjects";
import ProjectsWithCommits from "./components/GitLabProjects/ProjectCommits.js";
import Navbar from "./components/Navbar";


export default function Home() {
  return (
    <div>
      <Navbar/>
    </div>
  );
}
