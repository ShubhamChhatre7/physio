import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Award, Heart, Users, ChevronRight } from 'lucide-react';
import { Element } from 'react-scroll';
import supabase from './SupabaseClient';
import './About.css';

const getImageUrl = (imagePath) => {
  return `https://zlmsmdibvnnhxthvdhhf.supabase.co/storage/v1/object/public/doctor-photos/${imagePath}`;
};

const About = () => {
  const [teamMembers, setTeamMembers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTeamMembers = async () => {
      try {
        const { data, error } = await supabase.from('doctors').select('*');
        if (error) throw error;
        setTeamMembers(data);
      } catch (error) {
        console.error('Error fetching team members:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchTeamMembers();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <div className="about-page">
      <Element name="hero">
        <motion.section
          className="about-hero"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <div className="about-hero-content">
            <motion.h1
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Transforming Lives Through Expert Care
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Leading the way in physiotherapy excellence since 2024, providing innovative
              and personalized care for optimal recovery and wellness.
            </motion.p>
          </div>
        </motion.section>
      </Element>

      <Element name="mission-vision">
        <section className="mission-vision">
          <motion.div
            className="mission-container"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {[
              {
                title: "Mission",
                icon: <Heart className="mission-icon" />,
                content: "To provide exceptional physiotherapy care that empowers our patients to achieve optimal physical health and well-being through personalized treatment plans and evidence-based practices."
              },
              {
                title: "Vision",
                icon: <Award className="mission-icon" />,
                content: "To be the leading physiotherapy clinic that sets the standard for excellence in patient care, innovation, and rehabilitation services in our community."
              },
              {
                title: "Values",
                icon: <Users className="mission-icon" />,
                content: (
                  <ul>
                    <li>Patient-Centered Care</li>
                    <li>Clinical Excellence</li>
                    <li>Continuous Learning</li>
                    <li>Integrity & Trust</li>
                    <li>Compassionate Service</li>
                  </ul>
                )
              }
            ].map((item, index) => (
              <motion.div
                key={item.title}
                className="mission-card"
                variants={itemVariants}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                {item.icon}
                <h2>{item.title}</h2>
                {typeof item.content === 'string' ? (
                  <p>{item.content}</p>
                ) : (
                  item.content
                )}
              </motion.div>
            ))}
          </motion.div>
        </section>
      </Element>

      <Element name="history">
        <motion.section
          className="history"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <div className="history-content">
            <motion.h2 variants={itemVariants}>Our Journey</motion.h2>
            <motion.p variants={itemVariants}>
              Founded in 2024, our clinic emerged from a vision to revolutionize
              physiotherapy care. We began with a simple mission: to provide
              exceptional, personalized care that truly transforms lives.
            </motion.p>
            <motion.p variants={itemVariants}>
              Today, we continue to grow and evolve, embracing innovative
              techniques and technologies while maintaining our commitment to
              compassionate, patient-centered care.
            </motion.p>
          </div>
        </motion.section>
      </Element>

      <Element name="team">
        <motion.section
          className="team"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.h2 variants={itemVariants}>Our Expert Team</motion.h2>
          <motion.div className="team-grid" variants={containerVariants}>
            {isLoading ? (
              <p>Loading team members...</p>
            ) : (
              teamMembers.map((member, index) => (
                <motion.div
                  key={member.id || index}
                  className="team-member"
                  variants={itemVariants}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="member-image">
                    <img
                      src={getImageUrl(member.image)}
                      alt={member.name}
                      onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/400x500?text=Doctor+Photo';
                      }}
                    />
                  </div>
                  <div className="member-info">
                    <h3>{member.name}</h3>
                    <p className="role">{member.role}</p>
                    <p className="specialization">{member.specialization}</p>
                    <p className="experience">{member.experience} Years Experience</p>
                  </div>
                </motion.div>
              ))
            )}
          </motion.div>
        </motion.section>
      </Element>
    </div>
  );
};

export default About;