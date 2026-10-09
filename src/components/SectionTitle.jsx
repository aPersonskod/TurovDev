export default function SectionTitle({ eyebrow, title, subtitle, align = 'left' }) {
  const centered = align === 'center';
  return (
    <div className={centered ? 'mb-8 text-center' : 'mb-8'}>
      {eyebrow && (
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-indigo-400">
          {eyebrow}
        </p>
      )}
      <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">{title}</h2>
      {subtitle && (
        <p
          className={[
            'mt-2 max-w-2xl text-sm leading-relaxed text-slate-400',
            centered ? 'mx-auto' : '',
          ].join(' ')}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}