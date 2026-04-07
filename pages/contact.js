import Head from 'next/head';
import { motion } from 'framer-motion';
import styles from '../styles/contact.module.css';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.1, ease: [0.4, 0, 0.2, 1] },
  }),
};

const stagger = { visible: { transition: { staggerChildren: 0.08 } } };

const techEcosystem = [
  'Palo Alto NGFW', 'FortiGate', 'Cisco FTD', 'Cisco ACI', 'SD-WAN Viptela',
  'AWS VPC', 'F5 LTM', 'Cloudflare', 'Cisco ISE', 'Infoblox DDI',
  'Python', 'Ansible', 'Nexus 9K', 'Arista 7K', 'BGP/OSPF',
  'Juniper MX', 'StealthWatch', 'CloudWatch', 'Active Directory', 'Meraki',
];

export default function Contact() {
  return (
    <>
      <Head>
        <title>Contact — Tejo Maddineni</title>
        <meta name="description" content="Get in touch for network security engineering opportunities." />
      </Head>

      <div className="page-container">
        <section className={`${styles.contact} section`}>
          <div className="container">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={stagger}
            >
              <motion.div className="section-label" variants={fadeUp}>Contact</motion.div>
              <motion.h1 className="section-title" variants={fadeUp} custom={1}>
                Let&apos;s build something secure
              </motion.h1>
            </motion.div>

            <div className={styles.contactGrid}>
              {/* Left: Info */}
              <motion.div
                className={styles.contactInfo}
                initial="hidden"
                animate="visible"
                variants={stagger}
              >
                <motion.p className={styles.contactDesc} variants={fadeUp}>
                  Whether you&apos;re scaling your security posture, migrating to SD-WAN, 
                  or need someone who can architect and automate enterprise networks — 
                  I&apos;d love to hear about the challenge.
                </motion.p>

                <motion.div className={styles.contactChannels} variants={fadeUp} custom={1}>
                  <a
                    href="mailto:Tejomaddineni1@gmail.com"
                    className={styles.contactChannel}
                  >
                    <div className={styles.channelIcon}>✉️</div>
                    <div className={styles.channelInfo}>
                      <span className={styles.channelLabel}>Email</span>
                      <span className={styles.channelValue}>Tejomaddineni1@gmail.com</span>
                    </div>
                  </a>
                  <a
                    href="tel:+18166091789"
                    className={styles.contactChannel}
                  >
                    <div className={styles.channelIcon}>📱</div>
                    <div className={styles.channelInfo}>
                      <span className={styles.channelLabel}>Phone</span>
                      <span className={styles.channelValue}>+1 (816) 609-1789</span>
                    </div>
                  </a>
                </motion.div>

                <motion.div className={styles.availability} variants={fadeUp} custom={2}>
                  <div className={styles.availHeader}>
                    <div className={styles.availDot} />
                    <span className={styles.availTitle}>Available for opportunities</span>
                  </div>
                  <p className={styles.availDesc}>
                    Currently open to senior network security engineering roles. 
                    Based in Texas, open to remote and hybrid positions.
                  </p>
                </motion.div>
              </motion.div>


            </div>

            {/* Tech Ecosystem */}
            <motion.div
              className={styles.contactVisual}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <h3 className={styles.visualTitle}>Technology Ecosystem</h3>
              <p className={styles.visualDesc}>
                Platforms and tools I work with day to day
              </p>
              <div className={styles.techEcosystem}>
                {techEcosystem.map((tech, i) => (
                  <motion.span
                    key={tech}
                    className={styles.techNode}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 + i * 0.03 }}
                    whileHover={{ scale: 1.05 }}
                  >
                    {tech}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
}