import { motion, useReducedMotion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import heroImage from "@/assets/hero/hero-signature-steak.webp";
import { BookingButtons } from "@/components/shared/BookingButtons";

export const Hero = () => {
  const reduced = useReducedMotion();
  const rise = (delay: number) =>
    reduced
      ? {}
      : {
          initial: { opacity: 0, y: 16 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.8, delay, ease: [0.22, 0.61, 0.36, 1] as const },
        };

  return (
    <section
      data-surface="dark"
      aria-label="Welcome"
      className="relative flex min-h-[100svh] items-center overflow-hidden bg-ink"
    >
      {/* Hero photograph. Explicit dimensions prevent layout shift, and the
          focal point moves down on narrow screens so the steak stays centred. */}
      <img
        src={heroImage}
        alt="A large chargrilled steak resting on a wooden serving board with chunky chips, roasted tomato and dipping sauces"
        width={2000}
        height={1414}
        loading="eager"
        decoding="async"
        {...{ fetchpriority: "high" }}
        className="absolute inset-0 h-full w-full object-cover object-[52%_62%] md:object-[50%_50%]"
      />

      {/* Overlay: strong enough for AA contrast, restrained enough to keep the
          photograph readable. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-b from-ink/85 via-ink/60 to-ink/95"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-r from-ink/80 via-transparent to-transparent"
      />

      <div className="container-content relative z-10 pb-24 pt-28 md:pb-32">
        <div className="max-w-2xl">
          <motion.h1
            {...rise(0.1)}
            className="text-[clamp(3rem,12vw,6.5rem)] leading-[0.88] text-bone text-shadow-cinematic"
          >
            Proper steaks.
            <br />
            <span className="text-brass">Generous plates.</span>
          </motion.h1>

          <motion.p
            {...rise(0.28)}
            className="mt-7 max-w-xl text-base leading-relaxed text-bone/85 md:text-lg"
          >
            Beef from a local butchery, delivered fresh every single day. Bold
            comfort food and a warm welcome, in an independent steakhouse in the
            heart of Wollaston.
          </motion.p>

          <motion.div
            {...rise(0.5)}
            className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center"
          >
            <BookingButtons size="lg" />
          </motion.div>
        </div>
      </div>

      {/* Scroll cue. Decorative, hidden from assistive tech, and it does not
          animate when reduced motion is requested. */}
      <motion.div
        aria-hidden="true"
        {...(reduced
          ? {}
          : {
              initial: { opacity: 0 },
              animate: { opacity: 1 },
              transition: { delay: 1.4, duration: 0.8 },
            })}
        className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2"
      >
        <motion.span
          className="block text-brass/70"
          {...(reduced
            ? {}
            : {
                animate: { y: [0, 7, 0] },
                transition: { duration: 1.8, repeat: Infinity, ease: "easeInOut" },
              })}
        >
          <ChevronDown className="h-5 w-5" />
        </motion.span>
      </motion.div>
    </section>
  );
};
