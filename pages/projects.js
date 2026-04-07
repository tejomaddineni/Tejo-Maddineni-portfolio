import { useState } from 'react';
import Head from 'next/head';
import { motion, AnimatePresence } from 'framer-motion';
import styles from '../styles/projects.module.css';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.1, ease: [0.4, 0, 0.2, 1] },
  }),
};

const stagger = { visible: { transition: { staggerChildren: 0.08 } } };

const categories = ['All', 'Security', 'SD-WAN', 'Cloud', 'Automation', 'Data Center'];

const caseStudies = [
  {
    id: 1,
    category: 'Security',
    number: 'CS — 01',
    title: 'Zero Trust Architecture for Distributed Enterprise',
    problem: 'Legacy perimeter-based security couldn\'t protect a growing remote workforce. Implicit trust policies left lateral movement undetected across 50+ branch offices.',
    action: 'Implemented Cloudflare Zero Trust + Palo Alto User-ID + Cisco ISE endpoint profiling. Deployed micro-segmentation with ACI to enforce identity-based access at every layer.',
    result: 'Eliminated implicit trust network-wide. 100% endpoint compliance, 60% reduced attack surface, zero successful lateral movement incidents post-deployment.',
    metrics: [
      { value: '↓ 60%', label: 'Attack Surface' },
      { value: '100%', label: 'Compliance' },
      { value: '0', label: 'Breaches' },
    ],
    visual: 'pipeline',
    pipelineSteps: [
      'User Identity Verification',
      'Device Posture Assessment',
      'Policy Engine Evaluation',
      'Micro-Segmented Access',
      'Continuous Monitoring',
      'Threat Response & Logging',
    ],
  },
  {
    id: 2,
    category: 'SD-WAN',
    number: 'CS — 02',
    title: 'SD-WAN Migration with Zero Downtime',
    problem: 'MPLS-dependent WAN couldn\'t scale with cloud adoption. Branch offices experienced high latency for SaaS applications, and provisioning new sites took weeks.',
    action: 'Designed Cisco Viptela SD-WAN overlay with application-aware routing. Integrated with existing MPLS as fallback. Deployed IPsec VPN tunnels and configured traffic engineering policies.',
    result: 'Seamless migration with zero disruption. 40% reduction in WAN costs, 50+ sites connected with optimized cloud breakout, sub-second failover between paths.',
    metrics: [
      { value: '↓ 40%', label: 'WAN Costs' },
      { value: '50+', label: 'Sites' },
      { value: '<1s', label: 'Failover' },
    ],
    visual: 'topology',
    topoLayers: [
      { label: 'CLOUD', nodes: ['AWS', 'SaaS Apps', 'CDN'] },
      { label: 'TRANSPORT', nodes: ['SD-WAN Fabric', 'MPLS Backup', 'IPsec'] },
      { label: 'EDGE', nodes: ['Branch A', 'Branch B', 'Data Center', 'Branch C'] },
    ],
  },
  {
    id: 3,
    category: 'Cloud',
    number: 'CS — 03',
    title: 'Multi-Region AWS Security & Connectivity',
    problem: 'Hybrid cloud setup lacked consistent security policies. On-prem to AWS traffic traversed public internet, creating compliance gaps and performance bottlenecks.',
    action: 'Deployed AWS Direct Connect Gateway for multi-region private connectivity. Configured VPCs with security groups, NACLs, and Route 53 health-checked failover. Integrated CloudWatch/CloudTrail for full observability.',
    result: 'Private, encrypted connectivity across all regions. 99.99% availability, full compliance audit trail, and 3x improvement in cross-region latency.',
    metrics: [
      { value: '99.99%', label: 'Availability' },
      { value: '3×', label: 'Latency Improvement' },
      { value: '100%', label: 'Audit Coverage' },
    ],
    visual: 'pipeline',
    pipelineSteps: [
      'On-Prem Data Center',
      'Direct Connect Gateway',
      'VPC Peering & Route Tables',
      'Security Groups & NACLs',
      'CloudWatch Monitoring',
      'Route 53 Failover',
    ],
  },
  {
    id: 4,
    category: 'Automation',
    number: 'CS — 04',
    title: 'Network Automation at Scale with Python & Ansible',
    problem: 'Manual configuration across 200+ network devices led to drift, inconsistency, and hours of repetitive work. Human error caused recurring misconfigurations.',
    action: 'Built Python scripts with Netmiko for SSH-based config management. Developed Ansible playbooks for standardized deployment. Created REST API integrations for Infoblox DDI and SDN controllers.',
    result: 'Reduced provisioning time by 70%. Zero configuration drift across the fleet. Enabled same-day branch deployments that previously took weeks.',
    metrics: [
      { value: '↓ 70%', label: 'Provision Time' },
      { value: '0', label: 'Config Drift' },
      { value: '200+', label: 'Devices' },
    ],
    visual: 'topology',
    topoLayers: [
      { label: 'ORCHESTRATION', nodes: ['Ansible Tower', 'Python Scripts', 'Git'] },
      { label: 'API LAYER', nodes: ['REST APIs', 'Netmiko SSH', 'SNMP'] },
      { label: 'INFRASTRUCTURE', nodes: ['Routers', 'Switches', 'Firewalls', 'DDI'] },
    ],
  },
  {
    id: 5,
    category: 'Data Center',
    number: 'CS — 05',
    title: 'ACI Fabric Deployment with Multi-Site Orchestration',
    problem: 'Data center network was a sprawl of manually configured VLANs. No micro-segmentation, limited automation, and policy inconsistency across two sites.',
    action: 'Deployed Cisco ACI fabric with Multi-Site Orchestrator. Implemented application-centric policies, FCoE convergence, and Virtual Port Channels for redundancy. Integrated with ISE for endpoint-aware security.',
    result: 'Unified policy across both sites. 80% reduction in provisioning time, complete micro-segmentation, and converged storage/compute networking.',
    metrics: [
      { value: '↓ 80%', label: 'Provisioning Time' },
      { value: '2', label: 'Sites Unified' },
      { value: '100%', label: 'Segmented' },
    ],
    visual: 'pipeline',
    pipelineSteps: [
      'APIC Controller',
      'Tenant & VRF Design',
      'EPG & Contract Policies',
      'Leaf-Spine Fabric',
      'Multi-Site Orchestrator',
      'ISE Integration & Monitoring',
    ],
  },
  {
    id: 6,
    category: 'Security',
    number: 'CS — 06',
    title: 'Advanced Threat Prevention Pipeline',
    problem: 'Signature-based detection missed zero-day exploits. Encrypted traffic was a blind spot, and threat response was reactive rather than proactive.',
    action: 'Deployed Palo Alto WildFire + FortiSandbox for behavioral analysis. Implemented SSL decryption on Cisco FTD. Configured geo-blocking and integrated SIEM with Aruba ClearPass data for correlated threat intelligence.',
    result: 'Proactive threat detection with sandboxed analysis. Zero successful zero-day exploits. Complete visibility into encrypted traffic with compliance-safe decryption policies.',
    metrics: [
      { value: '0', label: 'Zero-Day Breaches' },
      { value: '100%', label: 'Encrypted Visibility' },
      { value: '<5min', label: 'Response Time' },
    ],
    visual: 'topology',
    topoLayers: [
      { label: 'DETECTION', nodes: ['WildFire', 'FortiSandbox', 'SSL Decrypt'] },
      { label: 'ANALYSIS', nodes: ['SIEM Correlation', 'Behavioral AI', 'Geo-Intel'] },
      { label: 'RESPONSE', nodes: ['Auto-Block', 'Quarantine', 'Alert', 'Forensics'] },
    ],
  },
];

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState('All');

  const filtered = activeFilter === 'All'
    ? caseStudies
    : caseStudies.filter((cs) => cs.category === activeFilter);

  return (
    <>
      <Head>
        <title>Case Studies — Tejo Maddineni</title>
        <meta name="description" content="Impact-driven case studies in network security, SD-WAN, cloud architecture, and automation." />
      </Head>

      <div className="page-container">
        <section className={`${styles.projects} section`}>
          <div className="container">
            <motion.div
              className={styles.projectsHeader}
              initial="hidden"
              animate="visible"
              variants={stagger}
            >
              <motion.div className="section-label" variants={fadeUp}>Case Studies</motion.div>
              <motion.h1 className="section-title" variants={fadeUp} custom={1}>
                Problem → Action → Result
              </motion.h1>
              <motion.p className="section-subtitle" variants={fadeUp} custom={2}>
                Each project follows a structured approach: identify the constraint, 
                design the solution, measure the impact.
              </motion.p>
            </motion.div>

            {/* Filters */}
            <motion.div
              className={styles.filterBar}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              {categories.map((cat) => (
                <button
                  key={cat}
                  className={`${styles.filterBtn} ${
                    activeFilter === cat ? styles.filterBtnActive : ''
                  }`}
                  onClick={() => setActiveFilter(cat)}
                >
                  {cat}
                </button>
              ))}
            </motion.div>

            {/* Case Studies */}
            <div className={styles.caseGrid}>
              <AnimatePresence mode="wait">
                {filtered.map((cs, i) => (
                  <motion.div
                    key={cs.id}
                    className={styles.caseCard}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.4, delay: i * 0.08 }}
                    layout
                  >
                    <div className={styles.caseCardInner}>
                      <div className={styles.caseCardContent}>
                        <div className={styles.caseNumber}>{cs.number}</div>
                        <div className={styles.caseCategory}>{cs.category}</div>
                        <h2 className={styles.caseCardTitle}>{cs.title}</h2>

                        <div className={styles.caseNarrative}>
                          <div className={styles.narrativeStep}>
                            <div className={`${styles.narrativeIcon} ${styles.problem}`}>P</div>
                            <div className={styles.narrativeText}>
                              <span className={styles.narrativeLabel}>Problem</span>
                              {cs.problem}
                            </div>
                          </div>
                          <div className={styles.narrativeStep}>
                            <div className={`${styles.narrativeIcon} ${styles.action}`}>A</div>
                            <div className={styles.narrativeText}>
                              <span className={styles.narrativeLabel}>Action</span>
                              {cs.action}
                            </div>
                          </div>
                          <div className={styles.narrativeStep}>
                            <div className={`${styles.narrativeIcon} ${styles.result}`}>R</div>
                            <div className={styles.narrativeText}>
                              <span className={styles.narrativeLabel}>Result</span>
                              {cs.result}
                            </div>
                          </div>
                        </div>

                        <div className={styles.caseResults}>
                          {cs.metrics.map((m, j) => (
                            <motion.div
                              key={j}
                              className={styles.resultMetric}
                              initial={{ opacity: 0, scale: 0.8 }}
                              whileInView={{ opacity: 1, scale: 1 }}
                              viewport={{ once: true }}
                              transition={{ delay: 0.3 + j * 0.1 }}
                            >
                              <span className={styles.resultValue}>{m.value}</span>
                              <span className={styles.resultLabel}>{m.label}</span>
                            </motion.div>
                          ))}
                        </div>
                      </div>

                      <div className={styles.caseCardVisual}>
                        {cs.visual === 'pipeline' && (
                          <div className={styles.pipeline}>
                            {cs.pipelineSteps.map((step, j) => (
                              <div key={j}>
                                <motion.div
                                  className={styles.pipelineStage}
                                  initial={{ opacity: 0, x: -15 }}
                                  whileInView={{ opacity: 1, x: 0 }}
                                  viewport={{ once: true }}
                                  transition={{ delay: 0.2 + j * 0.08 }}
                                >
                                  <div
                                    className={`${styles.pipelineDot} ${
                                      j === 0 ? styles.active : ''
                                    }`}
                                  />
                                  <div className={styles.pipelineLabel}>{step}</div>
                                </motion.div>
                                {j < cs.pipelineSteps.length - 1 && (
                                  <div className={styles.pipelineConnector} />
                                )}
                              </div>
                            ))}
                          </div>
                        )}

                        {cs.visual === 'topology' && (
                          <div className={styles.topology}>
                            {cs.topoLayers.map((layer, j) => (
                              <div key={j} style={{ width: '100%' }}>
                                <div className={styles.topoLabel}>{layer.label}</div>
                                <motion.div
                                  className={styles.topoLayer}
                                  initial={{ opacity: 0, y: 10 }}
                                  whileInView={{ opacity: 1, y: 0 }}
                                  viewport={{ once: true }}
                                  transition={{ delay: 0.2 + j * 0.12 }}
                                >
                                  {layer.nodes.map((node, k) => (
                                    <span
                                      key={k}
                                      className={`${styles.topoNode} ${
                                        k === 0 ? styles.highlight : ''
                                      }`}
                                    >
                                      {node}
                                    </span>
                                  ))}
                                </motion.div>
                                {j < cs.topoLayers.length - 1 && (
                                  <div className={styles.topoConnectors}>
                                    <div className={styles.topoLine} />
                                    <div className={styles.topoLine} />
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}