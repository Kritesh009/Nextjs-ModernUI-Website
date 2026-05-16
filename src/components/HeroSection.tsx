"use client";

import React, { useEffect, useRef } from "react";

import { motion, useScroll, useTransform } from "framer-motion";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const sections = [
  {
    title: "Custom Software Development",
    description:
      "We build scalable, high-performance software solutions tailored for startups, enterprises, and fast-growing digital businesses. From architecture to deployment, our team delivers reliable products engineered for growth.",
  },
  {
    title: "Modern Web Experiences",
    description:
      "Crafting visually stunning and ultra-responsive web applications using Next.js, React, TypeScript, and modern UI technologies. We focus on performance, accessibility, and immersive user experiences.",
  },
  {
    title: "Cloud & DevOps Solutions",
    description:
      "Accelerate your infrastructure with secure cloud deployment pipelines, CI/CD automation, scalable backend systems, and enterprise-grade DevOps workflows optimized for reliability and speed.",
  },
  {
    title: "AI & Digital Innovation",
    description:
      "Transform your business with AI-powered applications, intelligent automation, advanced analytics, and innovative digital products designed to improve efficiency and customer engagement.",
  },
];

type SectionType = {
  title: string;
  description: string;
};

type ScrollSectionProps = {
  section: SectionType;
  index: number;
};

export default function HeroSection() {
  const horizontalRef = useRef<HTMLDivElement>(null);

  const textRef = useRef<HTMLHeadingElement>(null);

  const overlayRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!horizontalRef.current || !textRef.current) return;

    const horizontalContainer = horizontalRef.current;

    const horizontalText = textRef.current;

    const horizontalChars = horizontalText.querySelectorAll(".horizontal-char");

    const horizontalTween = gsap.to(horizontalText, {
      xPercent: -100,
      ease: "none",
      scrollTrigger: {
        trigger: horizontalContainer,
        pin: true,
        scrub: 1,
        end: "+=4000",
        id: "horizontal-scroll",
      },
    });

    horizontalChars.forEach((char) => {
      gsap.from(char, {
        y: gsap.utils.random(-200, 200),
        rotate: gsap.utils.random(-40, 40),
        opacity: 0,
        ease: "power4.out",
        scrollTrigger: {
          trigger: char,
          containerAnimation: horizontalTween,
          start: "left 90%",
          end: "left 40%",
          scrub: 1,
          id: "horizontal-char-animation",
        },
      });
    });

    return () => {
      horizontalTween.scrollTrigger?.kill();
    };
  }, []);

  useEffect(() => {
    if (!overlayRef.current) return;

    const paths = overlayRef.current.querySelectorAll(".shape-overlays__path");

    const numPoints = 10;
    const numPaths = paths.length;
    const delayPointsMax = 0.3;
    const delayPerPath = 0.25;

    let isOpened = false;
    const pointsDelay: number[] = [];
    const allPoints: number[][] = [];

    const tl = gsap.timeline({
      paused: true,
      onUpdate: render,
      defaults: {
        ease: "power2.inOut",
        duration: 0.9,
      },
    });

    for (let i = 0; i < numPaths; i++) {
      const points: number[] = [];
      allPoints.push(points);

      for (let j = 0; j < numPoints; j++) {
        points.push(100);
      }
    }

    function toggle() {
      tl.progress(0).clear();

      for (let i = 0; i < numPoints; i++) {
        pointsDelay[i] = Math.random() * delayPointsMax;
      }

      for (let i = 0; i < numPaths; i++) {
        const points = allPoints[i];

        const pathDelay = delayPerPath * (isOpened ? i : numPaths - i - 1);

        for (let j = 0; j < numPoints; j++) {
          const delay = pointsDelay[j];

          tl.to(
            points,
            {
              [j]: 0,
            },
            delay + pathDelay,
          );
        }
      }

      tl.play();
    }

    function render() {
      for (let i = 0; i < numPaths; i++) {
        const path = paths[i];
        const points = allPoints[i];

        let d = "";

        d += isOpened ? `M 0 0 V ${points[0]} C` : `M 0 ${points[0]} C`;

        for (let j = 0; j < numPoints - 1; j++) {
          const p = ((j + 1) / (numPoints - 1)) * 100;

          const cp = p - ((1 / (numPoints - 1)) * 100) / 2;

          d += ` ${cp} ${points[j]} ${cp} ${points[j + 1]} ${p} ${points[j + 1]}`;
        }

        d += isOpened ? ` V 100 H 0` : ` V 0 H 0`;

        path.setAttribute("d", d);
      }
    }

    ScrollTrigger.create({
      trigger: ".overlay-section",
      start: "top 70%",
      once: true,
      onEnter: () => {
        isOpened = true;
        toggle();
      },
    });

    return () => {
      tl.kill();
    };
  }, []);

  const horizontalText =
    "SOFTWARE DEVELOPMENT • NEXTJS • AI SOLUTIONS • CLOUD INFRASTRUCTURE • MODERN UI • DEVOPS • DIGITAL TRANSFORMATION • ENTERPRISE APPLICATIONS •";

  return (
    <div className="bg-black text-white overflow-hidden">
      <section
        ref={horizontalRef}
        className="h-screen flex items-center overflow-hidden border-b border-zinc-800 relative"
      >
        <div className="w-full">
          <h1
            ref={textRef}
            className="flex w-max whitespace-nowrap pl-[100vw] text-[14vw] md:text-[10vw] font-black uppercase leading-none"
          >
            {horizontalText.split("").map((char, index) => (
              <span
                key={index}
                className="horizontal-char inline-block bg-gradient-to-r from-white via-violet-300 to-cyan-300 bg-clip-text text-transparent"
              >
                {char === " " ? "\u00A0" : char}
              </span>
            ))}
          </h1>

          <motion.div
            initial={{
              opacity: 0,
              y: 30,
            }}
            animate={{
              opacity: [0.4, 1, 0.4],
              y: [0, 10, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
            }}
            className="absolute bottom-16 left-1/2 -translate-x-1/2 flex flex-col items-center z-20"
          >
            <p className="text-sm md:text-base uppercase tracking-[6px] text-zinc-300 mb-4">
              Scroll To Explore
            </p>

            <div className="w-8 h-14 rounded-full border-2 border-zinc-400 flex justify-center p-2">
              <motion.div
                animate={{
                  y: [0, 12, 0],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                }}
                className="w-2 h-2 rounded-full bg-white"
              />
            </div>

            <motion.div
              animate={{
                y: [0, 8, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
              }}
              className="mt-4"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                className="text-white"
              >
                <path
                  d="M7 10L12 15L17 10"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {sections.map((section, index) => (
        <ScrollSection key={index} section={section} index={index} />
      ))}

      <section className="overlay-section relative h-screen bg-black overflow-hidden flex items-center justify-center">
        <motion.div
          initial={{
            opacity: 0,
            y: 100,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 1,
          }}
          viewport={{ once: true }}
          className="absolute z-20 text-center px-6"
        >
          <h2 className="text-5xl md:text-8xl font-black bg-gradient-to-r from-orange-300 via-orange-500 to-pink-300 bg-clip-text text-transparent">
            Building The Future
          </h2>

          <p className="mt-6 text-zinc-300 max-w-2xl mx-auto text-lg">
            We create enterprise-grade digital products, AI-powered platforms,
            scalable cloud systems, and immersive web experiences that help
            businesses innovate faster and grow smarter.
          </p>
        </motion.div>

        <svg
          ref={overlayRef}
          className="shape-overlays absolute inset-0 w-full h-full"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="gradient1" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#ff8709" />
              <stop offset="100%" stopColor="#f7bdf8" />
            </linearGradient>

            <linearGradient id="gradient2" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#ffd9b0" />
              <stop offset="100%" stopColor="#ff8709" />
            </linearGradient>
          </defs>

          <path className="shape-overlays__path" fill="url(#gradient2)" />

          <path className="shape-overlays__path" fill="url(#gradient1)" />
        </svg>
      </section>
    </div>
  );
}

function ScrollSection({ section, index }: ScrollSectionProps) {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

  useEffect(() => {
    if (!ref.current) return;

    gsap.fromTo(
      ref.current.querySelector(".animate-card"),
      {
        opacity: 0,
        y: 120,
        scale: 0.8,
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1.2,
        ease: "power4.out",
        scrollTrigger: {
          trigger: ref.current,
          start: "top 80%",
        },
      },
    );
  }, []);

  return (
    <section
      ref={ref}
      className="min-h-screen flex items-center border-b border-zinc-800 relative overflow-hidden"
    >
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          style={{ y }}
          className="absolute top-20 left-20 w-72 h-72 bg-violet-500/10 rounded-full blur-3xl"
        />

        <motion.div
          style={{
            y: useTransform(scrollYProgress, [0, 1], [-100, 100]),
          }}
          className="absolute bottom-10 right-10 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl"
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 py-24 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center animate-card">
          <motion.div
            initial={{
              opacity: 0,
              x: -100,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
            }}
            transition={{
              duration: 1,
            }}
            viewport={{ once: true }}
            className="relative"
          >
            <motion.p
              initial={{
                opacity: 0,
                letterSpacing: "0px",
              }}
              whileInView={{
                opacity: 1,
                letterSpacing: "6px",
              }}
              transition={{
                duration: 1,
              }}
              className="text-violet-400 uppercase text-sm mb-4"
            >
              {
                ["Development", "Experience", "Infrastructure", "Innovation"][
                  index
                ]
              }
            </motion.p>

            <motion.h2
              initial={{
                opacity: 0,
                y: 80,
                filter: "blur(10px)",
              }}
              whileInView={{
                opacity: 1,
                y: 0,
                filter: "blur(0px)",
              }}
              transition={{
                duration: 1,
              }}
              viewport={{ once: true }}
              className="text-5xl md:text-7xl font-black leading-tight"
            >
              <span className="bg-gradient-to-r from-white via-violet-300 to-cyan-300 bg-clip-text text-transparent">
                {section.title}
              </span>
            </motion.h2>

            <motion.div
              initial={{ width: 0 }}
              whileInView={{
                width: "120px",
              }}
              transition={{
                duration: 1,
              }}
              className="h-[4px] bg-gradient-to-r from-violet-500 to-cyan-400 rounded-full mt-6"
            />

            <motion.p
              initial={{
                opacity: 0,
                y: 40,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: 0.2,
                duration: 1,
              }}
              viewport={{ once: true }}
              className="mt-8 text-zinc-400 text-lg leading-relaxed max-w-xl"
            >
              {section.description}
            </motion.p>

            <motion.div
              animate={{
                opacity: [0.3, 0.8, 0.3],
                scale: [1, 1.2, 1],
              }}
              transition={{
                repeat: Infinity,
                duration: 4,
              }}
              className="absolute -top-10 -left-10 w-40 h-40 bg-violet-500/10 rounded-full blur-3xl"
            />

            <motion.button
              whileHover={{
                scale: 1.08,
                boxShadow: "0px 0px 40px rgba(139,92,246,0.7)",
              }}
              whileTap={{
                scale: 0.95,
              }}
              className="cursor-pointer relative overflow-hidden mt-10 px-8 py-4 rounded-full bg-white text-black font-semibold"
            >
              Explore More
            </motion.button>
          </motion.div>

          <motion.div
            initial={{
              opacity: 0,
              x: 100,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
            }}
            transition={{
              duration: 1,
            }}
            viewport={{ once: true }}
            className="relative flex justify-center items-center h-[500px]"
          >
            {index === 0 && (
              <motion.div
                animate={{
                  rotate: 360,
                }}
                transition={{
                  repeat: Infinity,
                  duration: 20,
                  ease: "linear",
                }}
                className="relative w-72 h-72 rounded-full border border-violet-500 flex items-center justify-center"
              >
                <div className="absolute w-56 h-56 rounded-full border border-cyan-400" />

                <motion.div
                  animate={{
                    scale: [1, 1.2, 1],
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 3,
                  }}
                  className="w-24 h-24 rounded-full bg-gradient-to-r from-violet-500 to-cyan-400 shadow-[0_0_50px_rgba(139,92,246,0.8)]"
                />
              </motion.div>
            )}

            {index === 1 && (
              <div className="relative grid grid-cols-2 gap-6">
                {[1, 2, 3, 4].map((item) => (
                  <motion.div
                    key={item}
                    animate={{
                      y: [0, -25, 0],
                      rotate: [0, 10, -10, 0],
                    }}
                    transition={{
                      repeat: Infinity,
                      duration: 2 + item,
                    }}
                    className="w-28 h-28 md:w-32 md:h-32 rounded-3xl bg-gradient-to-br from-violet-500/20 to-cyan-500/20 border border-white/10 backdrop-blur-xl"
                  />
                ))}
              </div>
            )}

            {index === 2 && (
              <div className="relative">
                <motion.div
                  animate={{
                    rotate: [0, 360],
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 10,
                    ease: "linear",
                  }}
                  className="w-72 h-72 border-2 border-dashed border-violet-500 rounded-[40px]"
                />

                <motion.div
                  animate={{
                    rotate: [360, 0],
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 8,
                    ease: "linear",
                  }}
                  className="absolute inset-10 border-2 border-cyan-400 rounded-full"
                />

                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div
                    animate={{
                      scale: [1, 1.3, 1],
                      rotate: [0, 180, 360],
                    }}
                    transition={{
                      repeat: Infinity,
                      duration: 5,
                    }}
                    className="w-24 h-24 rounded-3xl bg-violet-500 shadow-[0_0_40px_rgba(139,92,246,0.8)]"
                  />
                </div>
              </div>
            )}

            {index === 3 && (
              <div className="relative flex items-center justify-center">
                <motion.div
                  animate={{
                    y: [0, -30, 0],
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 4,
                  }}
                  className="absolute w-72 h-72 bg-violet-500/20 rounded-full blur-3xl"
                />

                <motion.div
                  animate={{
                    rotate: [0, 360],
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 15,
                    ease: "linear",
                  }}
                  className="w-80 h-80 rounded-full border border-white/10 flex items-center justify-center"
                >
                  <motion.div
                    animate={{
                      rotate: [360, 0],
                    }}
                    transition={{
                      repeat: Infinity,
                      duration: 10,
                      ease: "linear",
                    }}
                    className="w-56 h-56 rounded-full border border-cyan-400 flex items-center justify-center"
                  >
                    <motion.div
                      animate={{
                        scale: [1, 1.4, 1],
                      }}
                      transition={{
                        repeat: Infinity,
                        duration: 3,
                      }}
                      className="w-24 h-24 rounded-full bg-gradient-to-r from-violet-500 to-cyan-400"
                    />
                  </motion.div>
                </motion.div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
