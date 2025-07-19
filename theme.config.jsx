export default {
    logo: (
      <>
        <img width="36" height="36" src="/logo.svg" alt="AI for Science Workshop @ CMU" />
        <span style={{ marginLeft: '.4em', fontWeight: 800 }}>AI for Science Workshop @ Carnegie Mellon University</span>
      </>
    ),
    project: {
      link: 'https://cmu-ai-for-science-workshop.github.io/',
    },
    search: {
        placeholder: 'Search contents',
    },
    feedback: {
        content: null,
    },
    edit: {
        content: null,
    },
    footer: {
        text: (
          <span>
            MIT {new Date().getFullYear()} ©{' '}
              CMU AI for Science Workshop Organizers
            .
          </span>
        )
    },
    head: (
      <>
        <link rel="icon" href="/logo.svg" type="image/svg+xml" />
        <link rel="icon" href="/icon.ico" type="image/ico" />
      </>
    ),
    useNextSeoProps() {
        return {
        titleTemplate: '%s – AI for Science Workshop at CMU September 12',
        description: 'We are hosting AI for Science Workshop at Carnegie Mellon University, Pittsburgh, PA, USA on September 12, 2025.',
        openGraph: {
            type: 'website',
            images: [
              {
                url: 'https://cmu-ai-for-science-workshop.github.io/cover.jpg',
              }
            ],
            locale: 'en_US',
            url: 'https://cmu-ai-for-science-workshop.github.io/',
            siteName: 'AI for Science Workshop at CMU September 12',
            description: 'We are hosting AI for Science Workshop at Carnegie Mellon University, Pittsburgh, PA, USA on September 12, 2025.',
        },
        twitter: {
            cardType: 'summary_large_image',
            image: 'https://cmu-ai-for-science-workshop.github.io/cover.jpg',
        },
        }
        
    },
    // ... other theme options
  }