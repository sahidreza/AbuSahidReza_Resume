"use client";

import { AnimatePresence, motion } from "motion/react";
import { ArrowDownToLine, ArrowUpRight, CheckCircle2, Globe2, Mail, TriangleAlert } from "lucide-react";
import { useState, type FormEvent } from "react";
import { useLocale } from "@/components/providers/LocaleProvider";
import { LinkedInIcon } from "@/components/ui/icons";
import { EASE, Eyebrow, Reveal, SplitReveal } from "@/components/ui/motion";
import { asset, siteConfig } from "@/config/site";

type Status = "idle" | "sending" | "sent" | "mailto" | "error";
type Field = "name" | "email" | "company" | "message";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function Contact() {
  const { dict } = useLocale();
  const c = dict.contact;
  const f = c.form;
  const [values, setValues] = useState<Record<Field, string>>({ name: "", email: "", company: "", message: "" });
  const [errors, setErrors] = useState<Partial<Record<Field, string>>>({});
  const [status, setStatus] = useState<Status>("idle");

  const set = (field: Field) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setValues((v) => ({ ...v, [field]: e.target.value }));
    if (errors[field]) setErrors((er) => ({ ...er, [field]: undefined }));
  };

  const validate = () => {
    const next: Partial<Record<Field, string>> = {};
    if (!values.name.trim()) next.name = f.required;
    if (!values.email.trim()) next.email = f.required;
    else if (!EMAIL_RE.test(values.email.trim())) next.email = f.invalidEmail;
    if (!values.message.trim()) next.message = f.required;
    setErrors(next);
    const first = (["name", "email", "message"] as Field[]).find((k) => next[k]);
    if (first) document.getElementById(`contact-${first}`)?.focus();
    return !first;
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!validate()) return;
    const endpoint = siteConfig.contactFormEndpoint;

    if (!endpoint) {
      // No form backend configured: hand the message to the visitor's email app.
      const body = [values.message.trim(), "", "—", values.name.trim(), values.company.trim(), values.email.trim()]
        .filter((line, i) => line !== "" || i === 1)
        .join("\n");
      window.location.href = `mailto:${siteConfig.email}?subject=${encodeURIComponent(
        `${f.subject} — ${values.name.trim()}`,
      )}&body=${encodeURIComponent(body)}`;
      setStatus("mailto");
      return;
    }

    setStatus("sending");
    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ ...values, _subject: `${f.subject} — ${values.name.trim()}` }),
      });
      if (!res.ok) throw new Error(String(res.status));
      setStatus("sent");
      setValues({ name: "", email: "", company: "", message: "" });
    } catch {
      setStatus("error");
    }
  };

  const inputBase =
    "w-full rounded-2xl border bg-white/[0.04] px-4 py-3.5 text-[1rem] text-white placeholder:text-white/30 outline-none transition-colors duration-300 focus:border-white/50 focus:bg-white/[0.07]";

  const fieldClass = (field: Field) => `${inputBase} ${errors[field] ? "border-red-400/70" : "border-white/12"}`;

  return (
    <section id="contact" data-tone="dark" aria-labelledby="contact-title" className="section-pad relative overflow-hidden bg-night text-white">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-1/3 left-1/2 h-[70vmax] w-[70vmax] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(64,110,255,0.14),transparent)]"
      />
      <div className="container-site relative">
        <Reveal>
          <Eyebrow className="mb-5 text-white/50">{c.label}</Eyebrow>
        </Reveal>
        <SplitReveal key={c.title} as="h2" id="contact-title" text={c.title} className="text-headline max-w-[20ch] text-balance" />
        <Reveal delay={0.15}>
          <p className="text-lead mt-6 max-w-[44ch] text-white/65">{c.sub}</p>
        </Reveal>

        <div className="mt-16 grid gap-12 md:mt-24 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          {/* Direct lines */}
          <div className="space-y-10">
            <Reveal>
              <p className="text-eyebrow text-white/45">{c.emailLabel}</p>
              <a
                href={`mailto:${siteConfig.email}`}
                className="group mt-2 inline-flex items-center gap-2 break-all text-[clamp(1.3rem,2.4vw,1.85rem)] font-semibold tracking-[-0.02em] transition-colors hover:text-accent-bright"
              >
                <Mail className="h-5 w-5 shrink-0 text-white/40 transition-colors group-hover:text-accent-bright" strokeWidth={1.75} aria-hidden="true" />
                {siteConfig.email}
              </a>
            </Reveal>
            <Reveal delay={0.05}>
              <p className="text-eyebrow text-white/45">{c.linkedinLabel}</p>
              <a
                href={siteConfig.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="group mt-2 inline-flex items-center gap-2 text-[clamp(1.3rem,2.4vw,1.85rem)] font-semibold tracking-[-0.02em] transition-colors hover:text-accent-bright"
              >
                <LinkedInIcon className="h-5 w-5 shrink-0 text-white/40 transition-colors group-hover:text-accent-bright" />
                {siteConfig.linkedinLabel}
                <ArrowUpRight className="h-5 w-5 opacity-50 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
              </a>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="text-eyebrow text-white/45">{c.resumeLabel}</p>
              <div className="mt-3 flex flex-wrap gap-3">
                <a
                  href={asset(siteConfig.resume)}
                  download
                  className="group inline-flex items-center gap-2.5 rounded-full border border-white/20 px-5 py-3 text-[0.92rem] font-medium transition-all duration-300 hover:border-white/50 hover:bg-white/[0.06]"
                >
                  <ArrowDownToLine className="h-4 w-4 transition-transform duration-300 group-hover:translate-y-0.5" strokeWidth={2} aria-hidden="true" />
                  {c.resumeButton}
                  <span className="text-[0.7rem] text-white/40">{c.pdf}</span>
                </a>
              </div>
            </Reveal>
            <Reveal delay={0.15}>
              <div className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                <Globe2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-400" strokeWidth={1.75} aria-hidden="true" />
                <div>
                  <p className="text-eyebrow text-white/45">{c.availabilityLabel}</p>
                  <p className="mt-1 text-[1rem] text-white/85">{c.availability}</p>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Form */}
          <Reveal delay={0.1}>
            <form noValidate onSubmit={onSubmit} className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-6 backdrop-blur md:p-10" aria-labelledby="contact-form-title">
              <h3 id="contact-form-title" className="text-[1.35rem] font-semibold tracking-[-0.02em]">
                {f.title}
              </h3>
              <div className="mt-8 grid gap-5 sm:grid-cols-2">
                <FormField id="contact-name" label={f.name} error={errors.name}>
                  <input id="contact-name" name="name" autoComplete="name" value={values.name} onChange={set("name")} aria-invalid={!!errors.name} aria-describedby={errors.name ? "contact-name-error" : undefined} className={fieldClass("name")} />
                </FormField>
                <FormField id="contact-email" label={f.email} error={errors.email}>
                  <input id="contact-email" name="email" type="email" autoComplete="email" inputMode="email" value={values.email} onChange={set("email")} aria-invalid={!!errors.email} aria-describedby={errors.email ? "contact-email-error" : undefined} className={fieldClass("email")} />
                </FormField>
                <FormField id="contact-company" label={f.company} hint={f.optional} className="sm:col-span-2">
                  <input id="contact-company" name="company" autoComplete="organization" value={values.company} onChange={set("company")} className={fieldClass("company")} />
                </FormField>
                <FormField id="contact-message" label={f.message} error={errors.message} className="sm:col-span-2">
                  <textarea id="contact-message" name="message" rows={5} placeholder={f.placeholder} value={values.message} onChange={set("message")} aria-invalid={!!errors.message} aria-describedby={errors.message ? "contact-message-error" : undefined} className={`${fieldClass("message")} resize-y`} />
                </FormField>
              </div>

              <div className="mt-7 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-[0.8rem] text-white/45">{f.privacy}</p>
                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-white px-7 text-[0.95rem] font-medium text-ink transition-all duration-300 hover:bg-white/90 active:scale-[0.98] disabled:opacity-60"
                >
                  {status === "sending" ? f.sending : f.send}
                  <ArrowUpRight className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
                </button>
              </div>

              <div aria-live="polite" className="min-h-0">
                <AnimatePresence>
                  {(status === "sent" || status === "mailto" || status === "error") && (
                    <motion.p
                      key={status}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.4, ease: EASE }}
                      className={`mt-6 flex items-start gap-2.5 rounded-2xl px-4 py-3 text-[0.92rem] ${
                        status === "error" ? "bg-red-500/10 text-red-200" : "bg-emerald-500/10 text-emerald-200"
                      }`}
                    >
                      {status === "error" ? (
                        <TriangleAlert className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                      ) : (
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                      )}
                      {status === "sent" ? f.success : status === "mailto" ? f.mailtoSuccess : f.error}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function FormField({
  id,
  label,
  hint,
  error,
  className = "",
  children,
}: {
  id: string;
  label: string;
  hint?: string;
  error?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={className}>
      <label htmlFor={id} className="mb-2 block text-[0.82rem] font-medium text-white/70">
        {label}
        {hint && <span className="ml-1.5 font-normal text-white/35">({hint})</span>}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} className="mt-1.5 text-[0.8rem] text-red-300">
          {error}
        </p>
      )}
    </div>
  );
}
