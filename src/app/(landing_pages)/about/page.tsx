import { Metadata } from "next";

export function generateMetadata(): Metadata {
  return {
    title: "About | The Educative",
    description:
      "The Educative is the best place to learn. We provide the best courses for you to learn and grow. We have the best teachers and the best courses for you to learn.",
      icons: [
        {
          href: "/favicon.ico",
          sizes: "16x16",
          type: "image/x-icon",
          url: "/favicon.ico",
        }
      ],
  };
}

export default function About() {
  return (
    <main className="container flex justify-center items-center flex-col">
        <h1 className="text-2xl md:text-5xl font-bold text-accent text-center mb-3 inline-block custom-title">About The Educative</h1>
      <div className="about-us">
        <h2>
          Welcome to The Educative - Your One-Stop Resource for Computer Science
          Excellence
        </h2>

        <p>
          At The Educative, we are passionate about empowering individuals to
          excel in the world of computer science and programming. Our mission is
          to provide high-quality educational content that caters to learners at
          all levels, from beginners taking their first steps into coding to
          experienced developers looking to sharpen their skills.
        </p>

        <h3>Who We Are:</h3>
        <p>
          We are a team of dedicated professionals committed to creating an
          inclusive and comprehensive learning environment. Our experts curate
          and develop content that spans the entire spectrum of computer
          science, ensuring that you have access to the most relevant and
          up-to-date resources.
        </p>

        <h3>What We Offer:</h3>
        <ol>
          <li>
            <h4>Comprehensive Learning Materials:</h4>
            <ul>
              <li>
                Cheat Sheets: Quick references for programming languages,
                development tools, and frameworks.
              </li>
              <li>
                Tutorials: Step-by-step guides for learning new skills and
                building projects.
              </li>
              <li>
                Articles: In-depth explorations of various computer science
                topics and industry trends.
              </li>
              <li>
                Resources: Curated lists of books, courses, tools, and websites
                to support your learning journey.
              </li>
            </ul>
          </li>
          <li>
            <h4>Coding Challenges:</h4>
            <p>
              Our platform offers a variety of coding challenges to help you
              enhance your problem-solving skills and coding proficiency. From
              daily coding exercises to competitive programming contests, we
              provide opportunities for continuous improvement.
            </p>
          </li>
          <li>
            <h4>Open Source Contributions:</h4>
            <p>
              We encourage and support participation in open source projects,
              helping you gain real-world experience and collaborate with
              developers worldwide.
            </p>
          </li>
          <li>
            <h4>Mentorship Program:</h4>
            <p>
              Our unique mentorship program connects you with experienced
              professionals who provide personalized guidance, career advice,
              and project feedback to accelerate your growth.
            </p>
          </li>
          <li>
            <h4>Career Development:</h4>
            <p>
              We offer resources and support for every stage of your career,
              including resume building, job search strategies, networking tips,
              and personal branding guidance.
            </p>
          </li>
        </ol>

        <h3>Our Commitment:</h3>
        <p>
          At The Educative, we are committed to staying at the forefront of
          technological advancements and industry trends. We continuously update
          our content and expand our offerings to ensure that you have access to
          the most relevant and valuable resources in the ever-evolving field of
          computer science.
        </p>

        <h3>Join Our Community:</h3>
        <p>
          Become part of our vibrant community of learners, mentors, and
          industry professionals. Share knowledge, collaborate on projects, and
          grow together in your coding journey.
        </p>

        <p>
          Whether you&apos;re just starting out or looking to take your skills to the
          next level, The Educative is here to support you every step of the
          way. Let&apos;s code, learn, and innovate together!
        </p>

        <p>
          Start your learning journey with The Educative today and unlock your
          full potential in the world of computer science.
        </p>
      </div>
    </main>
  );
}
