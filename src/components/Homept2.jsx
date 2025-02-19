"use client";

// import Image from "next/image";
import { ArrowRight, User, Activity, Dumbbell, Heart } from "lucide-react";
import "./Home.css"; // ✅ Updated to use standard CSS
import aboutimg from "../assets/about-img.jpg";

export default function Hero() {
  return (
    <div className="physioContainer">
      <div className="physioImageSection">
        <img
          src={aboutimg}
          alt="Physiotherapy session"
          width={600}
          height={400}
          className="physioMainImage"
        />
        <div className="physioExperienceBadge">
          <Activity size={24} />
          <div>
            <strong>15+</strong>
            <div>Years Of Experience</div>
          </div>
        </div>
      </div>

      <div className="physioContentSection">
        <span className="physioAboutUsBadge">About Us</span>

        <h1 className="physioMainTitle">
          We Are The Best For <span className="physioTitleHighlight">Physiotherapy</span>
        </h1>

        <p className="physioDescription">
          We understand that injuries and acute pain can happen unexpectedly. Our emergency physiotherapy services are
          designed to provide prompt and effective care to help you manage pain, prevent further injury, and start your
          recovery process as quickly as possible.
        </p>

        <div className="physioFeaturesGrid">
          <div className="physioFeatureItem">
            <User className="physioFeatureIcon" />
            <span>Nutrition Strategies</span>
          </div>
          <div className="physioFeatureItem">
            <Activity className="physioFeatureIcon" />
            <span>Be Pro Active</span>
          </div>
          <div className="physioFeatureItem">
            <Dumbbell className="physioFeatureIcon" />
            <span>Workout Routines</span>
          </div>
          <div className="physioFeatureItem">
            <Heart className="physioFeatureIcon" />
            <span>Support & Motivation</span>
          </div>
        </div>

        <div className="physioFooterSection">
          <div className="physioDoctorProfile">
            <img
              src="/placeholder.svg?height=50&width=50"
              alt="Dr. Jamie Smith"
              width={50}
              height={50}
              className="physioDoctorImage"
            />
            <div className="physioDoctorInfo">
              <h3 className="physioDoctorName">Dr. Jamie Smith</h3>
              <p className="physioDoctorTitle">Physiotherapy</p>
            </div>
          </div>

          <button className="physioAppointmentButton">
            Make An Appointment
            <ArrowRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}
