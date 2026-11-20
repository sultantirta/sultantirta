import type { Certificate, Project } from '../data/profile'
import { pad2 } from '../lib/format'
import { asset } from '../lib/asset'

/** Project cover: real image if provided, otherwise a generated "album sleeve". */
export function ProjectCover({
  project,
  index,
  className = '',
  showTitle = true,
}: {
  project: Project
  index: number
  className?: string
  showTitle?: boolean
}) {
  if (project.cover) {
    return <img src={asset(project.cover)} alt="" loading="lazy" className={`h-full w-full object-cover ${className}`} />
  }
  const a = project.accent
  return (
    <div
      className={`relative h-full w-full overflow-hidden ${className}`}
      style={{
        background: `radial-gradient(110% 80% at 15% 10%, ${a} 0%, transparent 60%), radial-gradient(90% 70% at 100% 100%, ${a}55 0%, transparent 70%), #15120e`,
      }}
    >
      {/* a record peeking out of the sleeve */}
      <div
        className="vinyl absolute -right-[18%] top-1/2 aspect-square w-[70%] -translate-y-1/2 opacity-80"
        style={{ animationPlayState: 'running', animationDuration: '9s' }}
      />
      <div className="absolute inset-0 bg-[linear-gradient(to_top,rgb(14_12_10/0.85),transparent_55%)]" />
      <span className="accent absolute left-[6%] top-[5%] text-[clamp(2.5rem,6vw,5rem)] leading-none text-ink/30">{pad2(index + 1)}</span>
      {showTitle && (
        <span className="display absolute bottom-[7%] left-[6%] right-[6%] text-[clamp(1.4rem,3.4vw,2.6rem)] text-ink">
          {project.title}
        </span>
      )}
    </div>
  )
}

/** Certificate preview: real image if provided, otherwise a typographic certificate card. */
export function CertificateCard({ cert, className = '' }: { cert: Certificate; className?: string }) {
  if (cert.image) {
    return <img src={asset(cert.image)} alt={cert.title} loading="lazy" className={`h-full w-full object-cover ${className}`} />
  }
  return (
    <div className={`relative flex h-full w-full flex-col justify-between overflow-hidden bg-[#efe6d6] p-[7%] text-[#1d1914] ${className}`}>
      <div className="absolute inset-[4%] border border-[#1d1914]/25" />
      <div className="relative flex items-start justify-between font-mono text-[9px] uppercase tracking-[0.18em]">
        <span>Certificate</span>
        <span>{cert.issuer}</span>
      </div>
      <div className="relative">
        <p className="font-mono text-[9px] uppercase tracking-[0.18em] opacity-60">of completion</p>
        <p className="display mt-2 text-[clamp(1rem,2vw,1.6rem)] leading-[1.05]">{cert.title}</p>
      </div>
      <div className="relative flex items-end justify-between">
        <span className="font-mono text-[9px] tracking-[0.12em] opacity-70">{cert.date}</span>
        <span className="grid h-10 w-10 place-items-center rounded-full border border-[#b8742a] text-[#b8742a]">
          <span className="h-6 w-6 rounded-full border border-dashed border-current" />
        </span>
      </div>
    </div>
  )
}
