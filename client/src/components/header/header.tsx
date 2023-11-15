import './header.css'

const pageLinks = [
  { href: '/', label: 'Home' },
  { href: '/text-to-speech', label: 'Text to Speech' },
  { href: '/object-detection', label: 'Object Detection' }
]

export function Header() {
  const getTextDecoration = (href) => {
    if (window.location.pathname === href) {
      return { textDecoration: 'underline' }
    }
    return {}
  }

  return (
    <nav className="header">
      <h1><a href="/">AI Playground</a></h1>
      { pageLinks &&
        pageLinks.map(({ href, label }) => {
          return (
            <a
              key={href}
              href={href}
              style={getTextDecoration(href)}
            >
              {label}
            </a>
          )
        })
      }

    </nav>
  )
}
