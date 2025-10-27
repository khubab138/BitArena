"use client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import React, { useRef } from "react";
import emailjs from "@emailjs/browser";
import { toast } from "sonner";
import { RootState } from "@/Store/store";
import { useSelector } from "react-redux";
import { UserState } from "@/lib/type";
import { useUser } from "@clerk/clerk-react";
import { current } from "@reduxjs/toolkit";

const page = () => {
  const form = useRef<HTMLFormElement>(null);
  const UserData: UserState = useSelector((state: RootState) => state.User);
  const { isSignedIn } = useUser();
  const defaultEmail = isSignedIn ? UserData?.PlayerEmail.toString() || "" : "";
  const defaultName = isSignedIn ? UserData?.PlayerName || "" : "";

  function formHandle(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!form.current) return;

    const PUBLIC_KEY = `${process.env.NEXT_PUBLIC_PUBLIC_KEY}`;
    const SERVICE_ID = `${process.env.NEXT_PUBLIC_SERVICE_ID}`;
    const TEMPLATE_ID = `${process.env.NEXT_PUBLIC_TEMPLATE_ID}`;
    emailjs
      .sendForm(SERVICE_ID, TEMPLATE_ID, form.current, {
        publicKey: PUBLIC_KEY,
      })
      .then(
        () => {
          toast.promise<{ name: string }>(
            () =>
              new Promise((resolve) =>
                setTimeout(() => resolve({ name: "Email" }), 2000)
              ),
            {
              loading: "Loading...",
              success: (data) => `${data.name} has been sent!`,
              error: "Error",
            }
          );
          form.current?.reset();
        },
        (error) => {
          toast.error("something went wrong");
        }
      );
  }

  return (
    <div>
      <section className="min-h-screen p-10">
        <div className="">
          <h1 className=" cursor-pointer roboto text-4xl md:text-6xl font-bold">
            Info & Help
          </h1>
          <p className="text-xl md:text-2xl text-foreground/50 font-light">
            Unwind & Refocus Your Mind
          </p>
        </div>
        <div className="px-4 mt-10 w-full flex flex-col md:flex-row justify-between gap-6">
          <div className="mb-10 flex flex-col justify-start items-start h-full w-full md:w-[45%] ">
            <h1 className=" cursor-pointer roboto text-xl md:text-3xl font-bold bg-gradient-to-r  from-chart-2 to-muted-foreground   bg-clip-text text-transparent">
              FAQ's
            </h1>
            <Accordion
              type="single"
              collapsible
              className="w-full max-w-2xl mx-auto "
              defaultValue="item-1"
            >
              <AccordionItem value="item-1" className="border-none">
                <AccordionTrigger className="text-lg font-semibold text-foreground hover:text-chart-2 transition-colors">
                  🛠️ What should I do if the game doesn’t work?
                </AccordionTrigger>
                <AccordionContent className="flex flex-col gap-4 text-muted-foreground text-sm leading-relaxed">
                  <ol className="list-decimal list-inside space-y-2">
                    <li>Refresh the page or restart the app.</li>
                    <li>Check your internet connection.</li>
                    <li>
                      Make sure you’re using the latest version of your browser
                      or the game client.
                    </li>
                    <li>
                      If the issue continues, contact our support team — we’ll
                      help you out quickly.
                    </li>
                  </ol>
                  <p className="text-foreground/80">
                    Your progress and XP are stored securely in Firestore, so
                    you won’t lose anything.
                  </p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2" className="border-none">
                <AccordionTrigger className="text-lg font-semibold text-foreground hover:text-chart-2 transition-colors">
                  🔒 Is my data safe?
                </AccordionTrigger>
                <AccordionContent className="flex flex-col gap-3 text-muted-foreground text-sm leading-relaxed">
                  <p>Absolutely ✅</p>
                  <p>
                    Your data is protected using{" "}
                    <strong>Clerk authentication</strong> and securely stored in
                    <strong> Google Firestore</strong>. We use industry-standard
                    encryption and never share your personal information. Your
                    account, XP, and gameplay history remain safe — even if you
                    switch devices.
                  </p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3" className="border-none">
                <AccordionTrigger className="text-lg font-semibold text-foreground hover:text-chart-2 transition-colors">
                  🔑 I forgot my password — what should I do?
                </AccordionTrigger>
                <AccordionContent className="flex flex-col gap-3 text-muted-foreground text-sm leading-relaxed">
                  <p>No worries!</p>
                  <ul className="list-disc list-inside space-y-1">
                    <li>
                      Go to the <strong>Login</strong> page.
                    </li>
                    <li>
                      Click <em>“Forgot password?”</em>
                    </li>
                    <li>Follow the steps to reset it via email.</li>
                  </ul>
                  <p>
                    Once done, you can sign back in and continue earning XP
                    without losing progress.
                  </p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4" className="border-none">
                <AccordionTrigger className="text-lg font-semibold text-foreground hover:text-chart-2 transition-colors">
                  🎮 How do I play?
                </AccordionTrigger>
                <AccordionContent className="flex flex-col gap-4 text-muted-foreground text-sm leading-relaxed">
                  <p>Here’s how to get started:</p>
                  <ol className="list-decimal list-inside space-y-2">
                    <li>
                      <strong>Sign up or log in</strong> using Clerk.
                    </li>
                    <li>Choose your preferred game or mode.</li>
                    <li>
                      <p>Play and earn XP based on your performance:</p>
                      <ul className="list-disc list-inside pl-4 space-y-1">
                        <li>
                          🏆 <strong>Win:</strong> +100 XP
                        </li>
                        <li>
                          😞 <strong>Lose:</strong> –50 XP
                        </li>
                        <li>
                          🤝 <strong>Draw:</strong> –20 XP
                        </li>
                      </ul>
                    </li>
                    <li>
                      Level up, climb leaderboards, and unlock rewards as you
                      progress!
                    </li>
                  </ol>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
          <div className="md:w-[45%] w-full">
            <h2 className="text-3xl font-bold mb-8 text-center bg-gradient-to-r  from-chart-2 to-muted-foreground   bg-clip-text text-transparent ">
              Contact Us
            </h2>
            <form ref={form} onSubmit={formHandle} className="space-y-6">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Name..."
                  id="name"
                  defaultValue={defaultName}
                  name="name"
                  required
                  className="w-full mb-4 hover:border-foreground/40 hover:bg-foreground/5  border-1 border-e-2 border-foreground/70 border-e-foreground rounded px-4 py-3 text-foreground transition focus:outline-none focus:border-chart-2 focus:bg-chart-2/2 "
                />
                <input
                  type="email"
                  placeholder="example@gmail.com"
                  id="email"
                  defaultValue={defaultEmail}
                  name="from_email"
                  required
                  className="w-full mb-4 hover:border-foreground/40 hover:bg-foreground/5  border-1 border-e-2 border-foreground/70 border-e-foreground rounded px-4 py-3 text-foreground transition focus:outline-none focus:border-chart-2 focus:bg-chart-2/2 "
                />
                <textarea
                  placeholder="Your Message"
                  id="message"
                  name="message"
                  rows={3}
                  required
                  className="w-full mb-4 hover:border-foreground/40 hover:bg-foreground/5  border-1 border-e-2 border-foreground/70 border-e-foreground rounded px-4 py-3 text-foreground transition focus:outline-none focus:border-chart-2 focus:bg-chart-2/2 "
                />
                <button
                  type="submit"
                  className="w-full bg-chart-2 text-white py-3 px-6 rounded font-medium transition rtelative overflow-hidden active:-translate-y-0.5 hover:-translate-y-0.5  active:shadow-[0_0_20px_var(--chart-2)]  hover:shadow-[0_0_20px_var(--chart-2)] "
                >
                  Send
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default page;
