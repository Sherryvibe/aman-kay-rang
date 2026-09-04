"use client";
import React, { useState } from "react";
import Container from "@/components/ui/Container";
import Eyebrow from "@/components/ui/Eyebrow";
import RevealOnScroll from "@/components/ui/RevealOnScroll";
import Button from "@/components/ui/Button";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setStatus("loading");
    setTimeout(() => {
      setStatus("success");
      setEmail("");
    }, 1000);
  };

  return (
    <section className="bg-beige/35 section-md relative overflow-hidden border-t border-line/45">
      <Container className="max-w-[700px] text-center space-y-6">
        <RevealOnScroll className="space-y-3">
          <Eyebrow className="text-center">Newsletter</Eyebrow>
          <h2 className="font-serif text-[30px] md:text-[44px] leading-[1.1] text-ink font-light tracking-tight mt-3">
            Join the Story
          </h2>
          <p className="text-[13.5px] leading-relaxed text-muted font-light max-w-md mx-auto">
            Subscribe to receive private invitations to seasonal collection pre-orders, artisan stories, and heritage chronicles.
          </p>
        </RevealOnScroll>

        <RevealOnScroll delay={0.15}>
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              required
              placeholder="Your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-ivory border border-line rounded-xl px-5 py-3 text-[13px] text-ink focus:outline-none focus:border-roseDeep flex-1"
            />
            <Button
              type="submit"
              disabled={status === "loading"}
              className="h-12 px-8 flex-shrink-0"
            >
              {status === "loading" ? "Subscribing..." : "Join the Story"}
            </Button>
          </form>
          {status === "success" && (
            <p className="text-[12px] text-roseDeep font-medium mt-4">
              Thank you. You have been added to our inner circle.
            </p>
          )}
        </RevealOnScroll>
      </Container>
    </section>
  );
}
