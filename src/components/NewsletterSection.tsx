'use client'

import { useId, useRef, useState } from 'react'
import Section from '@/components/Section'
import ScrollReveal from '@/components/ScrollReveal'
import { newsletterCopy } from '@/data/newsletter'

const ENDPOINT = process.env.NEXT_PUBLIC_NEWSLETTER_ENDPOINT

type FormState = 'idle' | 'submitting' | 'success' | 'error'

const emailLooksValid = (v: string) => /\S+@\S+\.\S+/.test(v)

/**
 * Newsletter signup — one email pill posting to the Buttondown embed-subscribe
 * endpoint (NEXT_PUBLIC_NEWSLETTER_ENDPOINT). Renders NOTHING when the env var
 * is unset: no decorative dead forms. Includes a visually-hidden honeypot,
 * client-side plausibility validation, and an aria-live region for state.
 */
export default function NewsletterSection() {
  const [state, setState] = useState<FormState>('idle')
  const [email, setEmail] = useState('')
  const honeypot = useRef<HTMLInputElement>(null)
  const inputId = useId()

  if (!ENDPOINT) return null

  const valid = emailLooksValid(email)

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!valid || state === 'submitting') return
    // Honeypot filled → a bot; pretend success without posting.
    if (honeypot.current?.value) {
      setState('success')
      return
    }
    setState('submitting')
    try {
      const body = new FormData()
      body.append('email', email)
      const res = await fetch(ENDPOINT, { method: 'POST', body })
      if (!res.ok) throw new Error(`subscribe failed: ${res.status}`)
      setState('success')
    } catch {
      setState('error')
    }
  }

  return (
    <Section>
      <ScrollReveal>
        <div className="mx-auto w-full max-w-[640px] text-center">
          <h2 className="type-h3">{newsletterCopy.heading}</h2>
          <p className="type-body mt-3" style={{ color: 'var(--ink-muted)' }}>
            {newsletterCopy.support}
          </p>

          {/* aria-live region announces success/error without stealing focus */}
          <div aria-live="polite">
            {state === 'success' ? (
              <p className="mt-8 font-serif text-2xl transition-opacity duration-200" style={{ color: 'var(--ink)' }}>
                {newsletterCopy.success}
              </p>
            ) : (
              <>
                <form onSubmit={onSubmit} className="mt-8 transition-opacity duration-200" noValidate>
                  {/* Honeypot — hidden from people and AT */}
                  <input
                    ref={honeypot}
                    type="text"
                    name="website"
                    tabIndex={-1}
                    autoComplete="off"
                    aria-hidden="true"
                    className="absolute h-0 w-0 overflow-hidden opacity-0"
                  />
                  <label htmlFor={inputId} className="sr-only">
                    Email address
                  </label>
                  <div
                    className="mx-auto flex max-w-[480px] items-center gap-2 rounded-full border p-2 pl-6"
                    style={{ background: 'var(--canvas-raised)', borderColor: 'var(--line)' }}
                  >
                    <input
                      id={inputId}
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Email"
                      className="w-full min-w-0 bg-transparent font-sans text-[17px] outline-none placeholder:opacity-100"
                      style={{ color: 'var(--ink)' }}
                    />
                    <button
                      type="submit"
                      disabled={!valid || state === 'submitting'}
                      aria-busy={state === 'submitting'}
                      aria-label="Subscribe"
                      className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-lg transition-[transform,opacity,color] duration-200 hover:-translate-y-0.5 hover:text-[var(--accent)] disabled:pointer-events-none disabled:opacity-40"
                      style={{ background: 'var(--ink)', color: 'var(--canvas)' }}
                    >
                      {state === 'submitting' ? '…' : '→'}
                    </button>
                  </div>
                </form>
                {state === 'error' && (
                  <p className="type-body mt-4 transition-opacity duration-200" style={{ color: 'var(--ink-muted)' }}>
                    {newsletterCopy.error}
                  </p>
                )}
              </>
            )}
          </div>

          <p className="mt-6 font-sans text-[13px]" style={{ color: 'var(--ink-muted)' }}>
            {newsletterCopy.caption}
          </p>
        </div>
      </ScrollReveal>
    </Section>
  )
}
