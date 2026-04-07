import { useRef } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { motion, useScroll, useTransform } from 'framer-motion';
import styles from '../styles/home.module.css';

const ConstellationViz = dynamic(() => import('../components/ConstellationViz'), { ssr: false });
const PerspectiveGrid = dynamic(() => import('../components/PerspectiveGrid'), { ssr: false });
const ParticleField = dynamic(() => import('../components/ParticleField'), { ssr: false });

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.8, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] },
  }),
};
const stagger = { visible: { transition: { staggerChildren: 0.07 } } };

export default function Home() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <>
      <Head>
        <title>Tejo Maddineni — Senior Network Security Engineer</title>
        <meta name="description" content="4.5+ years designing secure, scalable network architectures. Firewall strategy, SD-WAN, cloud security, and data center automation." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className="page-container">
        {/* ━━━ HERO ━━━ */}
        <motion.section ref={heroRef} className={styles.hero} style={{ opacity: heroOpacity }}>
          {/* Constellation as full background */}
          <div className={styles.heroCanvas}>
            <ParticleField />
          </div>
          <PerspectiveGrid className={styles.heroPerspective} style={{ top: 0 }} />
          <div className={styles.heroOverlay} />

          <motion.div className={styles.heroContent} style={{ y: heroY }} initial="hidden" animate="visible" variants={stagger}>
            <motion.div className={styles.heroStatus} variants={fadeUp}>
              <span className={styles.statusDot} />
              Open to opportunities
            </motion.div>

            <motion.p className={styles.heroGreeting} variants={fadeUp} custom={0.5}>
              Hi, I&apos;m
            </motion.p>

            <motion.h1 className={styles.heroName} variants={fadeUp} custom={1}>
              Tejo Sai Sumanth
              <span className={styles.heroAccent}> Maddineni</span>
            </motion.h1>

            <motion.div className={styles.heroRoleBadge} variants={fadeUp} custom={1.5}>
              <span className={styles.roleLine} />
              <span>Senior Network Security Engineer</span>
              <span className={styles.roleLine} />
            </motion.div>

            <motion.p className={styles.heroDesc} variants={fadeUp} custom={2}>
              4.5+ years building defense-in-depth security architectures, optimizing SD-WAN deployments, and automating infrastructure at scale across multi-cloud environments.
            </motion.p>

            <motion.div className={styles.heroCta} variants={fadeUp} custom={4}>
              <Link href="/projects" className="btn-primary">View Case Studies →</Link>
              <Link href="/contact" className="btn-secondary">Get in Touch</Link>
            </motion.div>

            <motion.div className={styles.heroScroll} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.5 }}>
              <span className={styles.scrollLine} />
              <span>SCROLL</span>
            </motion.div>
          </motion.div>
        </motion.section>

        {/* ━━━ TECH TICKER ━━━ */}
        <div className={styles.ticker}>
          <div className={styles.tickerTrack}>
            {[
              'Palo Alto NGFW', 'Cisco ACI', 'AWS VPC', 'Viptela SD-WAN',
              'F5 LTM/GTM', 'FortiGate', 'Python', 'Ansible', 'Nexus 9K',
              'Cisco ISE', 'Arista 7K', 'BGP / OSPF', 'IPsec VPN', 'Infoblox',
              'CloudWatch', 'Netmiko', 'Zero Trust', 'MPLS', 'Cisco FTD', 'WildFire',
              'Palo Alto NGFW', 'Cisco ACI', 'AWS VPC', 'Viptela SD-WAN',
              'F5 LTM/GTM', 'FortiGate', 'Python', 'Ansible', 'Nexus 9K',
              'Cisco ISE', 'Arista 7K', 'BGP / OSPF', 'IPsec VPN', 'Infoblox',
              'CloudWatch', 'Netmiko', 'Zero Trust', 'MPLS', 'Cisco FTD', 'WildFire',
            ].map((name, i) => (
              <span key={i} className={styles.tickerItem}>{name}<span className={styles.tickerDot} /></span>
            ))}
          </div>
        </div>

        {/* ━━━ STATS ━━━ */}
        <motion.div className={styles.statsBar} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
          {[
            { value: '4.5+', label: 'Years Experience' },
            { value: '30%', label: 'Peak Traffic Boost' },
            { value: '99.99%', label: 'DNS Uptime' },
            { value: '200+', label: 'Devices Automated' },
          ].map((s, i) => (
            <motion.div key={i} className={styles.statItem} variants={fadeUp} custom={i}>
              <div className={styles.statValue}>{s.value}</div>
              <div className={styles.statLabel}>{s.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* ━━━ EXPERTISE ━━━ */}
        <section className={`${styles.expertise} section`}>
          <div className="container">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-100px' }} variants={stagger}>
              <motion.div className="section-label" variants={fadeUp}>Core Domains</motion.div>
              <motion.h2 className="section-title" variants={fadeUp} custom={1}>
                Security-first network<br /><span className="gradient-text">engineering.</span>
              </motion.h2>
              <motion.p className="section-subtitle" variants={fadeUp} custom={2}>
                End-to-end expertise from perimeter firewalls to cloud-native security and automated infrastructure.
              </motion.p>
            </motion.div>
            <div className={styles.expertiseGrid}>
              {[
                { icon: '🔥', title: 'Next-Gen Firewall Architecture', desc: 'Deep packet inspection, zero-trust policies, and advanced threat prevention across enterprise firewall platforms.', tech: ['Palo Alto PA-5K', 'FortiGate', 'Cisco FTD', 'WildFire'] },
                { icon: '🌐', title: 'SD-WAN & Hybrid Connectivity', desc: 'Application-aware routing, optimized branch-to-cloud paths, and zero-touch provisioning for distributed networks.', tech: ['Viptela', 'IPsec VPN', 'MPLS', 'Direct Connect'] },
                { icon: '🏢', title: 'Data Center Fabric', desc: 'ACI orchestration, micro-segmentation, and converged infrastructure with Nexus and Arista platforms.', tech: ['Cisco ACI', 'Nexus 9K', 'Arista 7K', 'FCoE'] },
                { icon: '☁️', title: 'Cloud Security', desc: 'AWS VPC architecture, security groups, real-time monitoring, and hybrid cloud connectivity patterns.', tech: ['AWS VPC', 'Route 53', 'CloudWatch', 'CloudTrail'] },
                { icon: '⚡', title: 'Network Automation', desc: 'Python and Ansible-driven config management, eliminating drift and enforcing consistency across 200+ devices.', tech: ['Python', 'Ansible', 'Netmiko', 'REST APIs'] },
                { icon: '⚖️', title: 'Traffic Engineering', desc: 'F5 load balancing with iRules traffic shaping, BGP/OSPF optimization, and HA architecture design.', tech: ['F5 LTM/GTM', 'BGP', 'OSPF', 'EIGRP'] },
              ].map((card, i) => (
                <motion.div key={i} className={styles.expertiseCard}
                  initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.5, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
                  whileHover={{ y: -6 }}>
                  <div className={styles.expertiseIcon}>{card.icon}</div>
                  <h3 className={styles.expertiseTitle}>{card.title}</h3>
                  <p className={styles.expertiseDesc}>{card.desc}</p>
                  <div className={styles.expertiseTech}>
                    {card.tech.map((t) => (<span key={t} className="tag">{t}</span>))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ━━━ CONSTELLATION INTERACTIVE ━━━ */}
        <section className={styles.constellationSection}>
          <div className="container">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} variants={stagger}>
              <motion.div className="section-label" variants={fadeUp}>Technology Map</motion.div>
              <motion.h2 className="section-title" variants={fadeUp} custom={1}>
                Explore my <span className="gradient-text">tech constellation</span>
              </motion.h2>
              <motion.p className="section-subtitle" variants={fadeUp} custom={2}>
                An interactive network graph of every platform, protocol, and tool in my stack. Hover to explore connections and see skills light up.
              </motion.p>
            </motion.div>
            <motion.div className={styles.constellationWrap}
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}>
              <span className={styles.constellationHint}>↗ hover to interact</span>
              <ConstellationViz />
            </motion.div>
          </div>
        </section>

        {/* ━━━ ARCHITECTURE ━━━ */}
        <section className={styles.architecture}>
          <div className="container">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} variants={stagger}>
              <motion.div className="section-label" variants={fadeUp}>System Architecture</motion.div>
              <motion.h2 className="section-title" variants={fadeUp} custom={1}>
                Defense-in-depth <span className="gradient-text">stack</span>
              </motion.h2>
              <motion.p className="section-subtitle" variants={fadeUp} custom={2}>
                A layered security model spanning every tier of the network.
              </motion.p>
            </motion.div>
            <div className={styles.archDiagram}>
              {[
                { label: 'Perimeter', items: ['Palo Alto NGFW', 'FortiGate', 'Cloudflare ZT', 'Bot Mgmt', 'Geo-Block'] },
                { label: 'Identity', items: ['Cisco ISE', 'User-ID', 'Active Dir', 'ClearPass', 'ISEC'] },
                { label: 'Transport', items: ['SD-WAN Viptela', 'IPsec VPN', 'MPLS', 'AWS DX', 'BGP/OSPF'] },
                { label: 'Data Center', items: ['Cisco ACI', 'Nexus 9K', 'Arista 7K', 'μ-Segment', 'FCoE'] },
                { label: 'Services', items: ['F5 LTM/GTM', 'Infoblox DDI', 'DNSSEC', 'Route 53', 'CloudFront'] },
                { label: 'Automation', items: ['Python', 'Ansible', 'Netmiko', 'REST API', 'SolarWinds'] },
                { label: 'Observe', items: ['CloudWatch', 'CloudTrail', 'Wireshark', 'StealthWatch', 'NetFlow'] },
              ].map((layer, i) => (
                <motion.div key={layer.label} className={styles.archLayer}
                  initial={{ opacity: 0, x: -16 }} whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-20px' }}
                  transition={{ duration: 0.45, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}>
                  <div className={styles.archLayerLabel}>{layer.label}</div>
                  <div className={styles.archLayerContent}>
                    {layer.items.map((item) => (
                      <motion.span key={item} className={styles.archBlock}
                        whileHover={{ scale: 1.06, y: -2 }}
                        transition={{ type: 'spring', stiffness: 400, damping: 20 }}>
                        {item}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ━━━ FEATURED CASE STUDIES ━━━ */}
        <section className={`${styles.featured} section`}>
          <div className="container">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} variants={stagger}>
              <motion.div className="section-label" variants={fadeUp}>Impact</motion.div>
              <motion.h2 className="section-title" variants={fadeUp} custom={1}>
                Selected <span className="gradient-text">case studies</span>
              </motion.h2>
              <motion.p className="section-subtitle" variants={fadeUp} custom={2}>
                Real problems, measurable results. Each project demonstrates decision-making under constraints.
              </motion.p>
            </motion.div>
            <div className={styles.featuredGrid}>
              {[
                {
                  phase: 'Zero Trust Migration',
                  title: 'Eliminating implicit trust across a distributed enterprise',
                  desc: 'Designed and deployed a zero-trust architecture integrating Cloudflare access controls, Palo Alto User-ID policies, and Cisco ISE endpoint profiling.',
                  metrics: [{ val: '100%', label: 'Endpoints Profiled' }, { val: '↓ 60%', label: 'Attack Surface' }],
                  tags: [{ text: 'Zero Trust', cls: '' }, { text: 'Cloudflare', cls: 'purple' }, { text: 'Palo Alto', cls: 'rose' }],
                  flow: ['User authenticates via SSO + MFA', 'Device posture check (ISE / ISEC)', 'Identity mapped to User-ID policy', 'Micro-segmented access granted', 'Continuous monitoring & logging'],
                },
                {
                  phase: 'Traffic Optimization',
                  title: '30% faster server response during peak loads',
                  desc: 'Engineered F5 iRules and LTM policies with SD-WAN application-aware routing to prioritize critical flows across 50+ branch sites.',
                  metrics: [{ val: '+30%', label: 'Response Speed' }, { val: '50+', label: 'Sites Connected' }],
                  tags: [{ text: 'F5 LTM', cls: 'cyan' }, { text: 'SD-WAN', cls: 'purple' }, { text: 'iRules', cls: 'green' }],
                  flow: ['Traffic ingress → F5 virtual server', 'iRules classify app type & priority', 'SD-WAN selects optimal path', 'Load balanced across server pool', 'Real-time health monitoring'],
                },
              ].map((cs, idx) => (
                <motion.div key={idx} className={styles.caseStudy}
                  initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}>
                  <div className={styles.caseStudyInner}>
                    <div className={styles.caseStudyContent}>
                      <div className={styles.casePhase}>{cs.phase}</div>
                      <h3 className={styles.caseTitle}>{cs.title}</h3>
                      <p className={styles.caseDesc}>{cs.desc}</p>
                      <div className={styles.caseMetrics}>
                        {cs.metrics.map((m, j) => (
                          <div key={j} className={styles.caseStat}>
                            <span className={styles.caseStatVal}>{m.val}</span>
                            <span className={styles.caseStatLabel}>{m.label}</span>
                          </div>
                        ))}
                      </div>
                      <div className={styles.caseTags}>
                        {cs.tags.map((t, j) => (<span key={j} className={`tag ${t.cls}`}>{t.text}</span>))}
                      </div>
                    </div>
                    <div className={styles.caseStudyVisual}>
                      <div className={styles.flowDiagram}>
                        {cs.flow.map((step, j) => (
                          <div key={j}>
                            <motion.div className={styles.flowStep}
                              initial={{ opacity: 0, x: -16 }} whileInView={{ opacity: 1, x: 0 }}
                              viewport={{ once: true }} transition={{ delay: 0.2 + j * 0.08 }}>
                              <div className={styles.flowNode}>{String(j + 1).padStart(2, '0')}</div>
                              <div className={styles.flowLabel}>{step}</div>
                            </motion.div>
                            {j < cs.flow.length - 1 && <div className={styles.flowConnector} />}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            <motion.div style={{ textAlign: 'center', marginTop: 52 }} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.3 }}>
              <Link href="/projects" className="btn-secondary">View All Case Studies →</Link>
            </motion.div>
          </div>
        </section>

        {/* ━━━ CTA ━━━ */}
        <section className={styles.cta}>
          <PerspectiveGrid style={{ transform: 'scaleY(1)', top: 'auto', bottom: 0 }} />
          <div className="container">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} variants={stagger}>
              <motion.h2 className={styles.ctaTitle} variants={fadeUp}>
                Building something that needs<br /><span className="gradient-text">to stay secure at scale?</span>
              </motion.h2>
              <motion.p className={styles.ctaDesc} variants={fadeUp} custom={1}>
                I bring 4.5+ years of hands-on experience across enterprise security, cloud networking, and automation.
              </motion.p>
              <motion.div className={styles.ctaActions} variants={fadeUp} custom={2}>
                <Link href="/contact" className="btn-primary">Let&apos;s Talk →</Link>
                <Link href="/about" className="btn-secondary">View My Background</Link>
              </motion.div>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
}
