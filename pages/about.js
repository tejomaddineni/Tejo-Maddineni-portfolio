import Head from 'next/head';
import { motion } from 'framer-motion';
import styles from '../styles/about.module.css';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.1, ease: [0.4, 0, 0.2, 1] },
  }),
};

const stagger = { visible: { transition: { staggerChildren: 0.08 } } };

const experience = [
  {
    current: true,
    date: 'Mar 2024 — Present',
    role: 'Sr. Network Security Engineer',
    org: 'Fortune 500 Retail Enterprise · TX',
    impacts: [
      { value: '↓ 60%', label: 'Attack Surface' },
      { value: '+30%', label: 'Response Speed' },
      { value: '100%', label: 'Endpoint Compliance' },
    ],
    highlights: [
      'Deployed Palo Alto User-ID + WildFire for identity-driven zero-day protection',
      'Implemented Cloudflare Zero Trust & Bot Management for remote access security',
      'Integrated SD-WAN Viptela with existing infrastructure — zero disruption migration',
      'Managed ACI Multi-Site Orchestrator for cross-datacenter policy consistency',
      'Built F5 iRules for custom traffic shaping — 30% improvement in peak response times',
      'Architected AWS Direct Connect Gateway for multi-region redundancy',
      'Automated monitoring with Python analytics for proactive anomaly detection',
    ],
  },
  {
    current: false,
    date: 'Jan 2023 — Feb 2024',
    role: 'Sr. Network Security Engineer',
    org: 'Major Financial Institution · Dallas, TX',
    impacts: [
      { value: '5+', label: 'Firewall Platforms' },
      { value: '3', label: 'ACI Sites' },
      { value: '99.9%', label: 'Network Uptime' },
    ],
    highlights: [
      'Managed Palo Alto PA-5400 series with Panorama for centralized visibility',
      'Deployed FortiGate fleet with FortiSandbox integration for proactive threat response',
      'Implemented SSL decryption & geo-blocking policies on Cisco FTD/FMC',
      'Designed SD-WAN overlay networks with application-aware routing across multiple sites',
      'Deployed Cisco ACI with micro-segmentation and application-centric policies',
      'Configured DNSSEC with Infoblox for DNS integrity and authenticity',
      'Built Python automation for SSH/API-based config management across routers & switches',
    ],
  },
  {
    current: false,
    date: 'Nov 2020 — Nov 2022',
    role: 'Network Security Analyst',
    org: 'Enterprise IT Services · India',
    impacts: [
      { value: '99.99%', label: 'DNS Reliability' },
      { value: '↑ 40%', label: 'Visibility' },
      { value: '24/7', label: 'Monitoring' },
    ],
    highlights: [
      'Deployed and monitored Cisco ASA 5500-X series firewalls for perimeter defense',
      'Integrated Wireshark with tracking platforms for comprehensive network analysis',
      'Configured F5 BIG-IP rSeries for seamless application delivery & cloud integration',
      'Implemented Infoblox DNS Security protecting against DDoS — achieved 99.99% DNS uptime',
      'Deployed Cisco TrustSec monitoring teams for network-wide visibility',
      'Built custom SolarWinds dashboards for real-time performance diagnostics',
    ],
  },
];

const skills = [
  {
    icon: '🔥',
    title: 'Firewalls & Security',
    items: [
      { name: 'Palo Alto Networks', level: 95 },
      { name: 'Fortinet FortiGate', level: 90 },
      { name: 'Cisco ASA / FTD', level: 88 },
      { name: 'Checkpoint', level: 75 },
    ],
  },
  {
    icon: '🌐',
    title: 'Routing & Switching',
    items: [
      { name: 'BGP / OSPF / EIGRP', level: 92 },
      { name: 'Cisco Nexus 9K/7K/5K', level: 90 },
      { name: 'Arista 7000 Series', level: 85 },
      { name: 'Juniper MX Series', level: 78 },
    ],
  },
  {
    icon: '☁️',
    title: 'Cloud & SD-WAN',
    items: [
      { name: 'AWS Networking', level: 88 },
      { name: 'Cisco SD-WAN Viptela', level: 90 },
      { name: 'Cloudflare Zero Trust', level: 85 },
      { name: 'F5 LTM / GTM', level: 87 },
    ],
  },
  {
    icon: '⚡',
    title: 'Automation & Tools',
    items: [
      { name: 'Python / Netmiko', level: 85 },
      { name: 'Ansible', level: 82 },
      { name: 'Infoblox DDI', level: 88 },
      { name: 'Cisco ISE / ACI', level: 90 },
    ],
  },
];

export default function About() {
  return (
    <>
      <Head>
        <title>Experience — Tejo Maddineni</title>
        <meta name="description" content="4.5+ years of network security engineering across enterprise, financial, and retail environments." />
      </Head>

      <div className="page-container">
        <section className={`${styles.about} section`}>
          <div className="container">
            {/* Profile Header */}
            <motion.div
              className={styles.profileHeader}
              initial="hidden"
              animate="visible"
              variants={stagger}
            >
              <motion.div className={styles.avatarWrap} variants={fadeUp}>
                <div className={styles.avatarInner}>TM</div>
              </motion.div>
              <motion.div className={styles.profileInfo} variants={fadeUp} custom={1}>
                <h1>Tejo Sai Sumanth Maddineni</h1>
                <h2>Senior Network Security Engineer</h2>
                <p className={styles.profileBio}>
                  I design and defend enterprise networks. My work spans next-gen firewalls, 
                  SD-WAN architecture, cloud security, and infrastructure automation — always 
                  with a security-first, reliability-driven mindset.
                </p>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Timeline */}
        <section className={styles.timelineSection}>
          <div className="container">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
              variants={stagger}
            >
              <motion.div className="section-label" variants={fadeUp}>Career Timeline</motion.div>
              <motion.h2 className="section-title" variants={fadeUp} custom={1}>
                Professional experience
              </motion.h2>
            </motion.div>

            <div className={styles.timeline}>
              <div className={styles.timelineLine} />
              {experience.map((exp, i) => (
                <motion.div
                  key={i}
                  className={styles.timelineItem}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                >
                  <div className={`${styles.timelineDot} ${exp.current ? styles.current : ''}`} />
                  <div className={styles.timelineDate}>{exp.date}</div>
                  <h3 className={styles.timelineRole}>{exp.role}</h3>
                  <p className={styles.timelineOrg}>{exp.org}</p>

                  <div className={styles.timelineCard}>
                    <div className={styles.impactGrid}>
                      {exp.impacts.map((impact, j) => (
                        <motion.div
                          key={j}
                          className={styles.impactItem}
                          initial={{ opacity: 0, scale: 0.9 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.2 + j * 0.1 }}
                        >
                          <div className={styles.impactValue}>{impact.value}</div>
                          <div className={styles.impactLabel}>{impact.label}</div>
                        </motion.div>
                      ))}
                    </div>

                    <ul className={styles.highlights}>
                      {exp.highlights.map((h, j) => (
                        <motion.li
                          key={j}
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.3 + j * 0.05 }}
                        >
                          {h}
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Skills Visualization */}
        <section className={styles.skillsSection}>
          <div className="container">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
              variants={stagger}
            >
              <motion.div className="section-label" variants={fadeUp}>Technical Depth</motion.div>
              <motion.h2 className="section-title" variants={fadeUp} custom={1}>
                Skills & proficiency
              </motion.h2>
            </motion.div>

            <div className={styles.skillsGrid}>
              {skills.map((cat, i) => (
                <motion.div
                  key={i}
                  className={styles.skillCategory}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ delay: i * 0.1 }}
                >
                  <div className={styles.skillCategoryTitle}>
                    <span className={styles.skillCategoryIcon}>{cat.icon}</span>
                    {cat.title}
                  </div>
                  <div className={styles.skillBars}>
                    {cat.items.map((skill, j) => (
                      <div key={j} className={styles.skillRow}>
                        <div className={styles.skillMeta}>
                          <span className={styles.skillName}>{skill.name}</span>
                          <span className={styles.skillLevel}>{skill.level}%</span>
                        </div>
                        <div className={styles.skillTrack}>
                          <motion.div
                            className={styles.skillFill}
                            initial={{ width: 0 }}
                            whileInView={{ width: `${skill.level}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, delay: 0.3 + j * 0.1 }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Certifications / Key Platforms */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              style={{ marginTop: 80 }}
            >
              <h3 className="section-label">Platform Ecosystem</h3>
              <div className={styles.certsGrid}>
                {[
                  'Cisco ISR 4000/1000', 'Juniper MX960', 'Cisco Meraki',
                  'Aruba Wireless', 'AWS VPC', 'Wireshark', 'SolarWinds',
                  'Infoblox DDI', 'StealthWatch', 'Cisco ACI',
                  'Arista 7130/7170', 'F5 BIG-IP', 'NetFlow',
                  'Active Directory', 'Cisco Prime',
                ].map((cert) => (
                  <span key={cert} className={styles.certBadge}>{cert}</span>
                ))}
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
}