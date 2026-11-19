import Logo from './Logo'
import { company, nav } from '../data/content'

export default function Footer() {
  return (
    <footer className="bg-ink text-paper">
      <div className="wrap border-t border-paper/15 py-10">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
          <Logo light />
          <nav aria-label="Podnožje">
            <ul className="flex flex-wrap gap-x-6 gap-y-2">
              {nav.map((n) => (
                <li key={n.href}>
                  <a href={n.href} className="text-[13px] text-paper/60 hover:text-paper">
                    {n.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <div className="mt-10 flex flex-col gap-2 text-[12px] text-paper/40 sm:flex-row sm:justify-between">
          <p>
            © {new Date().getFullYear()} {company.name} {company.city.replace(/^\d+\s/, '')}
          </p>
          <p>Fotografije na ovoj stranici su privremene i ne prikazuju objekte Građevinara.</p>
        </div>
      </div>
    </footer>
  )
}
