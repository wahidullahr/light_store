'use client';

import { useState } from 'react';

interface IContactPageProps {
  params: { locale: string };
}

export default function ContactPage({ params }: IContactPageProps) {
  const { locale } = params;
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError('');

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      setSubmitSuccess(true);
      setFormData({ name: '', email: '', subject: '', message: '' });

      // Reset success message after 5 seconds
      setTimeout(() => setSubmitSuccess(false), 5000);
    } catch (error) {
      console.error('Error submitting contact form:', error);
      setSubmitError(
        locale === 'nb'
          ? 'Feil ved sending av melding. Vennligst prøv igjen.'
          : 'Error sending message. Please try again.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  // Contact information data
  const contactInfo = [
    {
      icon: (
        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
      ),
      title: locale === 'nb' ? 'Adresse' : 'Address',
      content: (
        <>
          <p>Bærums Verk</p>
          <p>1349 Haslum</p>
          <p>Norway</p>
        </>
      ),
    },
    {
      icon: (
        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
          />
        </svg>
      ),
      title: locale === 'nb' ? 'Telefon' : 'Phone',
      content: <p>+47 987 65 432</p>,
    },
    {
      icon: (
        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
          />
        </svg>
      ),
      title: locale === 'nb' ? 'E-post' : 'Email',
      content: <p>kontakt@tindra.no</p>,
    },
    {
      icon: (
        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
      title: locale === 'nb' ? 'Åpningstider' : 'Opening Hours',
      content: (
        <>
          <p>
            {locale === 'nb' ? 'Mandag - Fredag: 09:00 - 17:00' : 'Monday - Friday: 09:00 - 17:00'}
          </p>
          <p>{locale === 'nb' ? 'Lørdag: 10:00 - 15:00' : 'Saturday: 10:00 - 15:00'}</p>
        </>
      ),
    },
  ];

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-8 lg:py-12">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950"></div>

        {/* Enhanced Background Effects */}
        <div className="bg-gradient-radial absolute top-1/4 -left-1/4 h-96 w-96 animate-pulse rounded-full from-amber-500/15 to-transparent blur-3xl"></div>
        <div className="bg-gradient-radial absolute -right-1/4 bottom-1/4 h-96 w-96 animate-pulse rounded-full from-amber-600/10 to-transparent blur-3xl"></div>
        <div className="bg-gradient-radial absolute top-1/2 left-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full from-amber-400/10 to-transparent blur-2xl"></div>

        <div className="relative container mx-auto px-4">
          <div className="mb-12 text-center">
            <div className="mb-6 inline-flex items-center gap-3 rounded-full border border-amber-500/30 bg-gradient-to-r from-amber-500/10 via-amber-500/15 to-amber-600/10 px-6 py-3 backdrop-blur-sm">
              <div className="relative">
                <div className="h-2 w-2 animate-pulse rounded-full bg-amber-400"></div>
                <div className="absolute inset-0 h-2 w-2 animate-ping rounded-full bg-amber-400 opacity-30"></div>
              </div>
              <span className="text-sm font-medium tracking-wide text-amber-200">
                {locale === 'nb' ? 'Ta kontakt' : 'Get in touch'}
              </span>
            </div>

            <h1 className="font-fraunces mb-4 text-3xl leading-[1.1] font-light tracking-tight text-slate-50 md:text-4xl lg:text-5xl xl:text-6xl">
              {locale === 'nb' ? 'La oss skape noe sammen' : 'Let&#39;s create something together'}
            </h1>

            <p className="mx-auto max-w-3xl text-lg leading-relaxed font-light tracking-wide text-slate-400 lg:text-xl">
              {locale === 'nb'
                ? 'Har du spørsmål om våre produkter eller ønsker du en tilpasset lampe? Vi ser frem til å høre fra deg.'
                : 'Have questions about our products or want a custom lamp? We look forward to hearing from you.'}
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 xl:gap-12">
            {/* Enhanced Contact Form */}
            <div className="group relative">
              <div className="absolute -inset-0.5 rounded-3xl bg-gradient-to-r from-amber-500/30 via-amber-400/40 to-amber-600/30 opacity-75 blur transition-all duration-500 group-hover:opacity-100"></div>
              <div className="relative h-full rounded-3xl border border-slate-800/50 bg-gradient-to-br from-slate-800/30 to-slate-900/50 p-8 backdrop-blur-xl">
                <h2 className="font-fraunces mb-8 text-3xl font-light text-slate-100">
                  {locale === 'nb' ? 'Send oss en melding' : 'Send us a message'}
                </h2>

                {submitSuccess && (
                  <div className="animate-fade-in mb-6 rounded-xl border border-green-500/30 bg-green-500/10 p-4">
                    <div className="flex items-center">
                      <svg
                        className="mr-2 h-5 w-5 text-green-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <p className="text-green-400">
                        {locale === 'nb'
                          ? 'Takk for din melding! Vi vil kontakte deg snart.'
                          : 'Thank you for your message! We will contact you soon.'}
                      </p>
                    </div>
                  </div>
                )}

                {submitError && (
                  <div className="animate-fade-in mb-6 rounded-xl border border-red-500/30 bg-red-500/10 p-4">
                    <div className="flex items-center">
                      <svg
                        className="mr-2 h-5 w-5 text-red-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                      <p className="text-red-400">{submitError}</p>
                    </div>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <div>
                      <label
                        htmlFor="name"
                        className="mb-2 block text-sm font-medium text-slate-300"
                      >
                        {locale === 'nb' ? 'Navn' : 'Name'}
                      </label>
                      <div className="relative">
                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                          <svg
                            className="h-5 w-5 text-amber-400/50"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={1.5}
                              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                            />
                          </svg>
                        </div>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          className="w-full rounded-xl border border-slate-700 bg-slate-800/50 py-3 pr-4 pl-10 text-slate-100 placeholder-slate-500 transition-all duration-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/30 focus:outline-none"
                          placeholder={locale === 'nb' ? 'Ditt navn' : 'Your name'}
                        />
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="email"
                        className="mb-2 block text-sm font-medium text-slate-300"
                      >
                        {locale === 'nb' ? 'E-post' : 'Email'}
                      </label>
                      <div className="relative">
                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                          <svg
                            className="h-5 w-5 text-amber-400/50"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={1.5}
                              d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                            />
                          </svg>
                        </div>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="w-full rounded-xl border border-slate-700 bg-slate-800/50 py-3 pr-4 pl-10 text-slate-100 placeholder-slate-500 transition-all duration-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/30 focus:outline-none"
                          placeholder={locale === 'nb' ? 'din@epost.no' : 'your@email.com'}
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="subject"
                      className="mb-2 block text-sm font-medium text-slate-300"
                    >
                      {locale === 'nb' ? 'Emne' : 'Subject'}
                    </label>
                    <div className="relative">
                      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                        <svg
                          className="h-5 w-5 text-amber-400/50"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.5}
                            d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
                          />
                        </svg>
                      </div>
                      <input
                        type="text"
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        className="w-full rounded-xl border border-slate-700 bg-slate-800/50 py-3 pr-4 pl-10 text-slate-100 placeholder-slate-500 transition-all duration-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/30 focus:outline-none"
                        placeholder={
                          locale === 'nb' ? 'Hva gjelder det?' : 'What is this regarding?'
                        }
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="mb-2 block text-sm font-medium text-slate-300"
                    >
                      {locale === 'nb' ? 'Melding' : 'Message'}
                    </label>
                    <div className="group/textarea relative">
                      <div className="absolute top-3 left-3">
                        <svg
                          className="h-5 w-5 text-amber-400/50 transition-colors duration-300 group-focus-within/textarea:text-amber-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.5}
                            d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                          />
                        </svg>
                      </div>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={10}
                        className="min-h-[250px] w-full resize-y rounded-xl border border-slate-700 bg-slate-800/50 py-4 pr-4 pl-10 text-slate-100 placeholder-slate-500 backdrop-blur-sm transition-all duration-300 focus:border-amber-500 focus:ring-4 focus:ring-amber-500/20 focus:outline-none"
                        placeholder={locale === 'nb' ? 'Din melding...' : 'Your message...'}
                      ></textarea>
                      <div className="pointer-events-none absolute inset-0 rounded-xl bg-gradient-to-r from-amber-500/5 via-amber-400/5 to-amber-500/5 opacity-0 transition-opacity duration-300 group-focus-within/textarea:opacity-100"></div>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="group relative w-full overflow-hidden rounded-xl bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 px-6 py-4 font-medium text-slate-950 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-amber-500/25 disabled:opacity-70"
                  >
                    <div className="absolute inset-0 translate-x-[-100%] bg-gradient-to-r from-amber-300/0 via-amber-400/20 to-amber-300/0 transition-transform duration-700 ease-in-out group-hover:translate-x-[100%]"></div>
                    <span className="relative flex items-center justify-center gap-2">
                      {isSubmitting ? (
                        <>
                          <svg className="h-5 w-5 animate-spin" fill="none" viewBox="0 0 24 24">
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                          </svg>
                          {locale === 'nb' ? 'Sender...' : 'Sending...'}
                        </>
                      ) : (
                        <>
                          <svg
                            className="h-5 w-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                            />
                          </svg>
                          {locale === 'nb' ? 'Send melding' : 'Send message'}
                        </>
                      )}
                    </span>
                  </button>
                </form>
              </div>
            </div>

            {/* Enhanced Contact Information */}
            <div className="space-y-8">
              {/* Contact Info Cards */}
              <div className="group relative">
                <div className="absolute -inset-0.5 rounded-3xl bg-gradient-to-r from-amber-500/20 via-amber-400/30 to-amber-600/20 opacity-50 blur transition-all duration-500 group-hover:opacity-75"></div>
                <div className="relative rounded-3xl border border-slate-800/50 bg-gradient-to-br from-slate-800/30 to-slate-900/50 p-8 backdrop-blur-xl">
                  <h2 className="font-fraunces mb-8 text-3xl font-light text-slate-100">
                    {locale === 'nb' ? 'Kontaktinformasjon' : 'Contact Information'}
                  </h2>

                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    {contactInfo.map((info, index) => (
                      <div
                        key={index}
                        className="group/contact-item relative overflow-hidden rounded-2xl border border-slate-700/50 bg-gradient-to-br from-slate-800/40 to-slate-900/60 p-6 transition-all duration-500 hover:-translate-y-1 hover:border-amber-500/40 hover:shadow-xl hover:shadow-amber-500/10"
                      >
                        <div className="absolute top-0 right-0 h-32 w-32 translate-x-16 -translate-y-16 rounded-full bg-gradient-to-br from-amber-500/5 to-transparent transition-all duration-500 group-hover/contact-item:translate-x-[5%] group-hover/contact-item:translate-y-[-30%]"></div>

                        <div className="relative flex items-start gap-4">
                          <div className="mt-1 flex h-12 w-12 items-center justify-center rounded-xl bg-amber-500/15 backdrop-blur-sm">
                            <div className="text-amber-400">{info.icon}</div>
                          </div>
                          <div>
                            <h3 className="mb-2 text-lg font-medium text-slate-100">
                              {info.title}
                            </h3>
                            <div className="text-slate-400">{info.content}</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Enhanced Google Map */}
              <div className="group relative">
                <div className="absolute -inset-0.5 rounded-3xl bg-gradient-to-r from-amber-500/20 via-amber-400/30 to-amber-600/20 opacity-50 blur transition-all duration-500 group-hover:opacity-75"></div>
                <div className="relative rounded-3xl border border-slate-800/50 bg-gradient-to-br from-slate-800/30 to-slate-900/50 p-8 backdrop-blur-xl">
                  <h2 className="font-fraunces mb-6 text-3xl font-light text-slate-100">
                    {locale === 'nb' ? 'Finn oss' : 'Find us'}
                  </h2>

                  <div className="relative h-[500px] w-full overflow-hidden rounded-2xl">
                    <div className="absolute inset-0 bg-gradient-to-br from-slate-700/40 to-slate-800/40 backdrop-blur-sm"></div>
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1998.145477294999!2d10.52469331640625!3d59.71666669999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x46417d7f8f7d7d7d%3A0x7d7d7d7d7d7d7d7d!2sB%C3%A6rums%20Verk%2C%20Norway!5e0!3m2!1sen!2sno!4v1650000000000!5m2!1sen!2sno"
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title="Google Maps - Bærums Verk, Norway"
                      className="relative z-10"
                    ></iframe>

                    {/* Map overlay effect */}
                    <div className="pointer-events-none absolute inset-0 z-20 bg-gradient-to-t from-slate-900/20 to-transparent"></div>
                  </div>

                  <div className="mt-6 flex flex-wrap gap-4">
                    <a
                      href="https://maps.google.com/?q=Bærums+Verk,+Norway"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-xl border border-amber-500/30 bg-gradient-to-r from-amber-500/20 to-amber-600/20 px-5 py-3 text-amber-200 transition-all duration-300 hover:from-amber-500/30 hover:to-amber-600/30 hover:text-amber-100"
                    >
                      <svg
                        className="h-5 w-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                      {locale === 'nb' ? 'Åpne i Google Maps' : 'Open in Google Maps'}
                    </a>

                    <a
                      href={`tel:+4798765432`}
                      className="inline-flex items-center gap-2 rounded-xl border border-slate-600/50 bg-gradient-to-r from-slate-700/50 to-slate-800/50 px-5 py-3 text-slate-200 transition-all duration-300 hover:from-slate-700/70 hover:to-slate-800/70"
                    >
                      <svg
                        className="h-5 w-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                        />
                      </svg>
                      +47 987 65 432
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Additional CTA Section */}
      <section className="relative overflow-hidden py-16 lg:py-24">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/50 to-slate-950"></div>
        <div className="bg-gradient-radial absolute top-1/2 left-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full from-amber-500/10 to-transparent blur-3xl"></div>

        <div className="relative container mx-auto px-4">
          <div className="rounded-3xl border border-slate-800/50 bg-gradient-to-br from-slate-800/30 to-slate-900/50 p-8 text-center backdrop-blur-xl md:p-12">
            <h2 className="font-fraunces mb-6 text-3xl font-light text-slate-100 md:text-4xl lg:text-5xl">
              {locale === 'nb'
                ? 'Klar til å skape noe spesielt?'
                : 'Ready to create something special?'}
            </h2>
            <p className="mx-auto mb-8 max-w-2xl text-xl font-light text-slate-400">
              {locale === 'nb'
                ? 'Ta kontakt med vårt team av håndverkere for å diskutere dine unike trelyskrav.'
                : 'Get in touch with our team of artisans to discuss your unique wooden lighting needs.'}
            </p>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <a
                href={`mailto:kontakt@tindra.no`}
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 px-8 py-4 font-medium text-slate-950 transition-all duration-300 hover:scale-[1.03] hover:shadow-2xl hover:shadow-amber-500/25"
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                kontakt@tindra.no
              </a>
              <a
                href={`tel:+4798765432`}
                className="inline-flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-800/50 px-8 py-4 text-slate-200 transition-all duration-300 hover:border-amber-500/50 hover:bg-slate-800/70"
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
                +47 987 65 432
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
