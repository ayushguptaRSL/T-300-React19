import { themeClass, vars } from '../tokens/theme.css';
import { Button } from '../components/Button/Button';
import { Card, CardHeader, CardTitle, CardSubtitle, CardBody, CardFooter } from '../components/Card/Card';
import { Badge } from '../components/Badge/Badge';
import * as styles from './ComponentLibraryShowcase.css';

export function ComponentLibraryShowcase() {
  return (
    <div className={`${themeClass} ${styles.showcaseContainer}`}>
      <div className={styles.showcaseInner}>
        <header className={styles.heroSection}>
          <h1 className={styles.heroTitle}>Vanilla Extract UI Library</h1>
        </header>

        <section className={styles.sectionBlock}>
          <div>
            <h2 className={styles.sectionTitle}>1. Button Component</h2>
            <p className={styles.sectionDescription}>
              Base styling composed with variants (primary, secondary, danger), sizes (small, medium,
              large), interaction states (hover, focus-visible, disabled), and responsive styling.
            </p>
          </div>

          <div className={styles.componentGrid}>
            <Card variant="outlined">
              <CardHeader>
                <CardTitle>Variants</CardTitle>
                <Badge variant="success" size="small">Prop driven</Badge>
              </CardHeader>
              <CardBody>
                <div className={styles.column} style={{ gap: '12px' }}>
                  <div className={styles.row}>
                    <Button variant="primary">Primary Variant</Button>
                    <span style={{ fontSize: '0.8rem', color: '#64748b' }}>Brand accent</span>
                  </div>
                  <div className={styles.row}>
                    <Button variant="secondary">Secondary Variant</Button>
                    <span style={{ fontSize: '0.8rem', color: '#64748b' }}>Neutral surface</span>
                  </div>
                  <div className={styles.row}>
                    <Button variant="danger">Danger Variant</Button>
                    <span style={{ fontSize: '0.8rem', color: '#64748b' }}>Destructive action</span>
                  </div>
                </div>
              </CardBody>
            </Card>

            <Card variant="outlined">
              <CardHeader>
                <CardTitle>Sizes (with responsive large)</CardTitle>
                <Badge variant="success" size="small">Typography & Spacing</Badge>
              </CardHeader>
              <CardBody>
                <div className={styles.row} style={{ alignItems: 'flex-end', gap: '12px' }}>
                  <Button variant="primary" size="small">Small (32px)</Button>
                  <Button variant="primary" size="medium">Medium (40px)</Button>
                  <Button variant="primary" size="large">Large (48px)</Button>
                </div>
              </CardBody>
            </Card>

            <Card variant="outlined">
              <CardHeader>
                <CardTitle>Interaction States</CardTitle>
                <Badge variant="warning" size="small">Hover / Focus / Disabled</Badge>
              </CardHeader>
              <CardBody>
                <div className={styles.column} style={{ gap: '12px' }}>
                  <div className={styles.row}>
                    <Button variant="primary">Hover Me</Button>
                    <Button variant="secondary">Focus with [Tab]</Button>
                  </div>
                  <div className={styles.row}>
                    <Button variant="primary" disabled>Disabled State</Button>
                  </div>
                </div>
              </CardBody>
            </Card>
          </div>
        </section>

        <section className={styles.sectionBlock}>
          <div>
            <h2 className={styles.sectionTitle}>2. Card Component</h2>
            <p className={styles.sectionDescription}>
              Composed of base styles, consistent spacing, border radius, background, and shadows.
              Elevated has large padding, Outlined has medium padding, and Flat has small padding.
            </p>
          </div>

          <div className={styles.componentGrid}>
            <Card variant="elevated" interactive>
              <CardHeader>
                <div>
                  <CardTitle>Elevated Card</CardTitle>
                  <CardSubtitle>Large padding (responsive) + Elevation Shadow</CardSubtitle>
                </div>
                <Badge variant="success">Active</Badge>
              </CardHeader>
              <CardBody>
                Features <code>large</code> padding (responsive to medium on mobile viewports),
                elevation box shadow from design tokens, and interactive hover lift.
              </CardBody>
              <CardFooter>
                <span style={{ fontSize: '0.8rem', color: '#64748b' }}>Interactive card</span>
                <Button variant="primary" size="small">Learn More</Button>
              </CardFooter>
            </Card>

            <Card variant="outlined">
              <CardHeader>
                <div>
                  <CardTitle>Outlined Card</CardTitle>
                  <CardSubtitle>Medium padding + Crisp border</CardSubtitle>
                </div>
                <Badge variant="warning">Pending</Badge>
              </CardHeader>
              <CardBody>
                Features <code>medium</code> padding (responsive to small on mobile viewports),
                with subtle border tokens and clean neutral background.
              </CardBody>
              <CardFooter>
                <span style={{ fontSize: '0.8rem', color: '#64748b' }}>Bordered container</span>
                <Button variant="secondary" size="small">View Details</Button>
              </CardFooter>
            </Card>

            <Card variant="flat">
              <CardHeader>
                <div>
                  <CardTitle>Flat Card</CardTitle>
                  <CardSubtitle>Small padding + Secondary surface fill</CardSubtitle>
                </div>
                <Badge variant="error">Notice</Badge>
              </CardHeader>
              <CardBody>
                Features <code>small</code> compact padding with soft tinted surface background and no drop shadow.
              </CardBody>
              <CardFooter>
                <span style={{ fontSize: '0.8rem', color: '#64748b' }}>Compact surface</span>
                <Button variant="danger" size="small">Dismiss</Button>
              </CardFooter>
            </Card>
          </div>
        </section>

        <section className={styles.sectionBlock}>
          <div>
            <h2 className={styles.sectionTitle}>3. Badge Component</h2>
            <p className={styles.sectionDescription}>
              Subtle status badges with variants (success, warning, error) and sizes (small, medium, large)
              driven purely by recipe variants.
            </p>
          </div>

          <div className={styles.componentGrid}>
            <Card variant="outlined">
              <CardHeader>
                <CardTitle>Variants</CardTitle>
                <Badge variant="success" size="small">Status colors</Badge>
              </CardHeader>
              <CardBody>
                <div className={styles.column} style={{ gap: '14px' }}>
                  <div className={styles.row}>
                    <Badge variant="success">Success Status</Badge>
                    <span style={{ fontSize: '0.8rem', color: '#64748b' }}>Positive confirmation</span>
                  </div>
                  <div className={styles.row}>
                    <Badge variant="warning">Warning Status</Badge>
                    <span style={{ fontSize: '0.8rem', color: '#64748b' }}>Attention required</span>
                  </div>
                  <div className={styles.row}>
                    <Badge variant="error">Error Status</Badge>
                    <span style={{ fontSize: '0.8rem', color: '#64748b' }}>Critical issue</span>
                  </div>
                </div>
              </CardBody>
            </Card>

            <Card variant="outlined">
              <CardHeader>
                <CardTitle>Sizes (Variant Only)</CardTitle>
                <Badge variant="warning" size="small">Scale tokens</Badge>
              </CardHeader>
              <CardBody>
                <div className={styles.column} style={{ gap: '14px' }}>
                  <div className={styles.row} style={{ alignItems: 'center' }}>
                    <Badge variant="success" size="small">Small Badge</Badge>
                    <span style={{ fontSize: '0.8rem', color: '#64748b' }}>Compact / Inline</span>
                  </div>
                  <div className={styles.row} style={{ alignItems: 'center' }}>
                    <Badge variant="warning" size="medium">Medium Badge</Badge>
                    <span style={{ fontSize: '0.8rem', color: '#64748b' }}>Default standard</span>
                  </div>
                  <div className={styles.row} style={{ alignItems: 'center' }}>
                    <Badge variant="error" size="large">Large Badge</Badge>
                    <span style={{ fontSize: '0.8rem', color: '#64748b' }}>Prominent callout</span>
                  </div>
                </div>
              </CardBody>
            </Card>
          </div>
        </section>

        <section className={styles.sectionBlock}>
          <div>
            <h2 className={styles.sectionTitle}>4. Shared Design Tokens & Theme Contract</h2>
            <p className={styles.sectionDescription}>
              All components consume the unified <code>vars</code> contract from <code>theme.css.ts</code>.
              No arbitrary values or independent classes are duplicated across components.
            </p>
          </div>

          <div className={styles.componentGrid}>
            <Card variant="outlined">
              <CardHeader>
                <CardTitle>Brand & Feedback Tokens</CardTitle>
              </CardHeader>
              <CardBody>
                <div className={styles.column}>
                  <div className={styles.tokenSwatch}>
                    <div className={styles.colorBox} style={{ backgroundColor: vars.colors.primary }} />
                    <span className={styles.tokenLabel}>vars.colors.primary</span>
                  </div>
                  <div className={styles.tokenSwatch}>
                    <div className={styles.colorBox} style={{ backgroundColor: vars.colors.secondary }} />
                    <span className={styles.tokenLabel}>vars.colors.secondary</span>
                  </div>
                  <div className={styles.tokenSwatch}>
                    <div className={styles.colorBox} style={{ backgroundColor: vars.colors.danger }} />
                    <span className={styles.tokenLabel}>vars.colors.danger</span>
                  </div>
                  <div className={styles.tokenSwatch}>
                    <div className={styles.colorBox} style={{ backgroundColor: vars.colors.success }} />
                    <span className={styles.tokenLabel}>vars.colors.success</span>
                  </div>
                  <div className={styles.tokenSwatch}>
                    <div className={styles.colorBox} style={{ backgroundColor: vars.colors.warning }} />
                    <span className={styles.tokenLabel}>vars.colors.warning</span>
                  </div>
                </div>
              </CardBody>
            </Card>

            <Card variant="outlined">
              <CardHeader>
                <CardTitle>Spacing & Radius Scale</CardTitle>
              </CardHeader>
              <CardBody>
                <div className={styles.column} style={{ gap: '10px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{ width: '8px', height: '16px', background: vars.colors.primary }} />
                    <span className={styles.tokenLabel}>xs (4px) / sm (8px)</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{ width: '24px', height: '16px', background: vars.colors.primary }} />
                    <span className={styles.tokenLabel}>md (16px) / lg (24px)</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{ width: '48px', height: '16px', background: vars.colors.primary }} />
                    <span className={styles.tokenLabel}>xl (32px)</span>
                  </div>
                  <div style={{ borderTop: `1px solid ${vars.colors.borderSubtle}`, paddingTop: '8px' }}>
                    <span style={{ fontSize: '0.8rem', color: '#64748b' }}>
                      Radii: sm (4px) · md (6px) · full (9999px)
                    </span>
                  </div>
                </div>
              </CardBody>
            </Card>
          </div>
        </section>
      </div>
    </div>
  );
}
