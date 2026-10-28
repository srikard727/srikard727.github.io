import { createRoot } from "react-dom/client";
import { ArrowUpRight, Blocks, BrainCircuit, ChevronLeft, ChevronRight, Gamepad2, MessageCircle, ServerCog, Utensils, FileSearch, ChartNoAxesCombined } from "lucide-react";
import { useEffect, useState } from "react";
import RadialOrbitalTimeline, { type TimelineItem } from "./components/ui/radial-orbital-timeline";
import AuroraProjectBackground from "./components/ui/aurora-project-background";
import tetrisImage from "../images/image2.jpg.png";
import bloomImage from "../images/image.jpg.png";
import "./projects.css";

const projects: TimelineItem[] = [
  {
    id: 1,
    githubUrl: "https://github.com/usf272spring26/milestone-4-SirPopGhost",
    title: "Multiplayer Tetris Game",
    date: "",
    content: "Built a multiplayer Tetris game in Rust using the Bevy game engine. I used Bevy Lightyear for networking and WASM to connect the web server and game server to the browser, with HTML and CSS supporting the web experience.",
    category: "Rust · Bevy · Lightyear · WASM · HTML/CSS",
    icon: Blocks,
    relatedIds: [2],
    status: "completed",
    image: tetrisImage,
  },
  {
    id: 2,
    githubUrl: "https://github.com/ErneElg162/DangDezeDubiousDimensions",
    title: "DangDezeDubiousDimensions",
    date: "",
    content: "Created a Godot game with friends that used multiple shaders and custom movement ideas. We originally explored 4D concepts, then focused more on quaternions by experimenting with the w coordinate. We also built a grappling hook with our own physics.",
    category: "Godot · Shaders · Quaternions · Custom physics",
    icon: Gamepad2,
    relatedIds: [1],
    status: "completed",
    image: bloomImage,
  },
  {
    id: 3,
    githubUrl: "https://github.com/SirPopGhost/foodie-app",
    title: "Foodie App",
    date: "",
    content: "Built a restaurant recommendation app that combines Foursquare restaurant data with sentence-transformer embeddings. A FastAPI backend ranks nearby restaurants against a natural-language food request and returns a top recommendation with alternatives, ratings, prices, photos, and location details.",
    category: "Python · FastAPI · Sentence Transformers · Foursquare",
    icon: Utensils,
    relatedIds: [4, 5],
    status: "in-progress",
  },
  {
    id: 4,
    githubUrl: "https://github.com/srikard727/intern-extraction-task",
    title: "Glass RFQ Extraction",
    date: "",
    content: "Built a system that turns glass manufacturing quote-request emails and attachments into structured, per-item specifications. Claude and LangGraph handle extraction, Python validates and normalizes the results, and OCR reads scanned documents. Results are saved to a database and exported as JSON, with missing or ambiguous fields flagged for human review.",
    category: "Python · Claude · LangGraph · FastAPI · OCR",
    icon: FileSearch,
    relatedIds: [3, 5],
    status: "completed",
  },
  {
    id: 5,
    githubUrl: "https://github.com/srikard727/loan-defaulter",
    title: "Loan Default Prediction",
    date: "",
    content: "Built a loan-risk prediction MVP using a feature-engineered XGBoost model, a FastAPI scoring API, and a React dashboard. It includes risk scoring, model feature importance, rule-based review decisions, portfolio monitoring, and account-scoped audit logs.",
    category: "Python · XGBoost · FastAPI · React",
    icon: ChartNoAxesCombined,
    relatedIds: [3, 4],
    status: "in-progress",
  },
];

const views = ["Interests", "Languages", "Projects"] as const;

const interests = [
  {
    title: "Software Engineering",
    cue: "Build, secure, optimize",
    description: "I enjoy setting up reliable systems, finding ways to improve performance without driving up costs, and thinking through security from the start. I like figuring out how all the pieces fit together and making them work better.",
    icon: ServerCog,
  },
  {
    title: "AI / ML",
    cue: "Explore possibilities",
    description: "I like experimenting with intelligent systems and finding practical ways to turn them into useful tools.",
    icon: BrainCircuit,
  },
  {
    title: "Communication",
    cue: "Connect ideas",
    description: "I enjoy conversations that introduce new perspectives and make ideas clearer. Sharing what I learn is part of how I grow.",
    icon: MessageCircle,
  },
] as const;

function InterestExplorer() {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeInterest = interests[activeIndex];
  const ActiveIcon = activeInterest.icon;

  return (
    <div className="interest-explorer" data-active={activeIndex}>
      <div className="interest-explorer-heading">
        <h3>What interests me</h3>
        <p>Pick a path to see what keeps me curious.</p>
      </div>

      <div className="interest-explorer-stage">
        <div className="interest-options" role="group" aria-label="Explore my interests">
          {interests.map((interest, index) => {
            const Icon = interest.icon;
            return (
              <button
                key={interest.title}
                type="button"
                className={`interest-option ${activeIndex === index ? "is-active" : ""}`}
                aria-pressed={activeIndex === index}
                aria-controls="interest-feature"
                onClick={() => setActiveIndex(index)}
                onMouseEnter={() => setActiveIndex(index)}
              >
                <span className="interest-option-icon"><Icon size={22} strokeWidth={1.8} /></span>
                <span className="interest-option-copy"><strong>{interest.title}</strong><small>{interest.cue}</small></span>
                <ArrowUpRight className="interest-option-arrow" size={18} aria-hidden="true" />
              </button>
            );
          })}
        </div>

        <div id="interest-feature" className="interest-feature" aria-live="polite">
          <div key={activeIndex} className="interest-feature-inner">
            <div className="interest-feature-art" aria-hidden="true">
              <span className="interest-feature-ring interest-feature-ring-outer" />
              <span className="interest-feature-ring interest-feature-ring-inner" />
              <span className="interest-feature-core"><ActiveIcon size={42} strokeWidth={1.5} /></span>
            </div>
            <span className="interest-feature-index">0{activeIndex + 1} / 0{interests.length}</span>
            <h4>{activeInterest.title}</h4>
            <p>{activeInterest.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function CarouselView({ view }: { view: (typeof views)[number] }) {
  if (view === "Projects") {
    return <RadialOrbitalTimeline timelineData={projects} />;
  }

  if (view === "Languages") {
    return (
      <div className="project-carousel-content">
        <p className="project-carousel-kicker">TECHNOLOGY</p>
        <h3>Languages I use to build</h3>
        <div className="project-carousel-grid">
          {[
            ["Python", "AI, machine learning, and data experiments."],
            ["Java", "Object-oriented programming and structured projects."],
            ["Rust", "Fast, reliable systems and game development."],
            ["C++ / C", "Computer fundamentals and performance."],
            ["HTML / CSS", "Responsive interfaces and web experiences."],
          ].map(([title, description]) => (
            <article key={title} className="project-carousel-card"><strong>{title}</strong><span>{description}</span></article>
          ))}
        </div>
      </div>
    );
  }

  return <InterestExplorer />;
}

function ProjectCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [slideDirection, setSlideDirection] = useState<1 | -1>(1);
  const view = views[activeIndex];

  useEffect(() => {
    const showInterests = () => setActiveIndex(0);
    window.addEventListener("portfolio:show-interests", showInterests);
    return () => window.removeEventListener("portfolio:show-interests", showInterests);
  }, []);

  const changeView = (direction: number) => {
    setSlideDirection(direction > 0 ? 1 : -1);
    setActiveIndex((current) => (current + direction + views.length) % views.length);
  };

  return (
    <div className="project-carousel">
      <button className="project-carousel-arrow project-carousel-arrow-left" type="button" onClick={() => changeView(-1)} aria-label="Previous section">
        <ChevronLeft size={22} />
      </button>
      <AuroraProjectBackground>
        <div key={view} className={`project-carousel-view ${slideDirection > 0 ? "is-next" : "is-prev"}`}>
          <CarouselView view={view} />
        </div>
      </AuroraProjectBackground>
      <button className="project-carousel-arrow project-carousel-arrow-right" type="button" onClick={() => changeView(1)} aria-label="Next section">
        <ChevronRight size={22} />
      </button>
      <div className="project-carousel-status" aria-live="polite">
        <span>{view}</span><span>{activeIndex + 1} / {views.length}</span>
      </div>
    </div>
  );
}

const container = document.getElementById("projects-react");
if (container) {
  createRoot(container).render(<ProjectCarousel />);
}
