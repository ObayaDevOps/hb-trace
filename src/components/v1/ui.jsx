import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import {
  ArrowUpRight,
  Check,
  CircleAlert,
  CircleHelp,
  CircleX,
  ClipboardList,
  Droplet,
  Hexagon,
  Layers3,
  ShieldAlert,
} from 'lucide-react';

const toneIcons = {
  success: Check,
  warning: CircleAlert,
  danger: CircleX,
  info: CircleHelp,
  neutral: ClipboardList,
  gold: Hexagon,
};

export function StatusBadge({ tone = 'neutral', children, className = '' }) {
  const Icon = toneIcons[tone] || ClipboardList;
  return (
    <Badge variant="outline" className={`status-badge status-${tone} ${className}`.trim()}>
      <Icon aria-hidden="true" size={13} strokeWidth={2.4} />
      <span>{children}</span>
    </Badge>
  );
}

export function ModePill({ publicMode = false, mode = 'local' }) {
  return (
    <Badge variant="outline" className="mode-pill">
      <span className="mode-dot" aria-hidden="true" />
      {mode === 'hosted' ? (publicMode ? 'Hosted publication' : 'Hosted mode') : (publicMode ? 'Sample publication view' : 'Demo / local mode')}
    </Badge>
  );
}

export function PageIntro({ eyebrow, title, description, actions, children }) {
  return (
    <div className="page-intro">
      <div>
        {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
        <h1>{title}</h1>
        {description ? <p className="page-description">{description}</p> : null}
        {children}
      </div>
      {actions ? <div className="page-actions">{actions}</div> : null}
    </div>
  );
}

export function SectionHeader({ eyebrow, title, description, action }) {
  return (
    <div className="section-header">
      <div>
        {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
        <h2>{title}</h2>
        {description ? <p className="muted-copy">{description}</p> : null}
      </div>
      {action ? <div>{action}</div> : null}
    </div>
  );
}

export function Panel({ title, description, action, children, className = '' }) {
  return (
    <Card role="region" aria-label={title || undefined} className={`panel gap-0 ${className}`.trim()}>
      {(title || description || action) ? (
        <div className="panel-header">
          <div>
            {title ? <h2>{title}</h2> : null}
            {description ? <p className="muted-copy">{description}</p> : null}
          </div>
          {action ? <div>{action}</div> : null}
        </div>
      ) : null}
      {children}
    </Card>
  );
}

export function MetricCard({ metric }) {
  const iconByName = {
    comb: Hexagon,
    droplet: Droplet,
    layers: Layers3,
    'shield-alert': ShieldAlert,
  };
  const Icon = iconByName[metric.icon] || Layers3;
  return (
    <Link className="metric-link" href={metric.href}>
      <Card className={`metric-card metric-${metric.tone}`}>
      <div className="metric-topline">
        <span className="metric-icon" aria-hidden="true"><Icon size={18} /></span>
        <ArrowUpRight aria-hidden="true" size={17} />
      </div>
      <p className="metric-label">{metric.label}</p>
      <p className="metric-value">{metric.value}</p>
      <p className="metric-meta">{metric.meta}</p>
      </Card>
    </Link>
  );
}

export function TextButton({ children, onClick, type = 'button', className = '' }) {
  return (
    <Button variant="link" className={`text-button ${className}`.trim()} onClick={onClick} type={type}>
      {children}
      <ArrowUpRight aria-hidden="true" size={15} />
    </Button>
  );
}

export function FilterChip({ active = false, children, onClick }) {
  return (
    <Button variant={active ? 'default' : 'outline'} size="sm" className={`filter-chip ${active ? 'filter-chip-active' : ''}`.trim()} onClick={onClick} type="button" aria-pressed={active}>
      {children}
    </Button>
  );
}

export function Field({ label, htmlFor, hint, required = false, children, className = '' }) {
  return (
    <div className={`field ${className}`.trim()}>
      <Label htmlFor={htmlFor}>
        {label}
        {required ? <span className="required-mark" aria-hidden="true"> *</span> : null}
      </Label>
      {children}
      {hint ? <p className="field-hint" id={`${htmlFor}-hint`}>{hint}</p> : null}
    </div>
  );
}

export function EmptyState({ icon: Icon = ClipboardList, title, description }) {
  return (
    <div className="empty-state">
      <span className="empty-icon"><Icon aria-hidden="true" size={20} /></span>
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
}

export function BackLink({ href = '/staff', children = 'Back to dashboard' }) {
  return <Link className="back-link" href={href}>← {children}</Link>;
}
