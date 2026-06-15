import { useState, useEffect } from "react";
import { contactInfo } from "../config/contactInfo";

export interface SettingsDict {
  coimbatore_address: string;
  coimbatore_phone_display: string;
  coimbatore_phone_raw: string;
  trichy_address: string;
  trichy_phone_display: string;
  trichy_phone_raw: string;
  email: string;
  whatsapp_url: string;
  facebook_url: string;
  twitter_url: string;
  instagram_url: string;
  linkedin_url: string;
  youtube_url: string;
  coimbatore_map_embed: string;
  coimbatore_map_link: string;
  trichy_map_embed: string;
  trichy_map_link: string;
}

const defaultSettings: SettingsDict = {
  coimbatore_address: contactInfo.coimbatoreAddress,
  coimbatore_phone_display: contactInfo.phone1.display,
  coimbatore_phone_raw: contactInfo.phone1.raw,
  trichy_address: contactInfo.trichyAddress,
  trichy_phone_display: contactInfo.phone3.display,
  trichy_phone_raw: contactInfo.phone3.raw,
  email: contactInfo.email,
  whatsapp_url: contactInfo.whatsappUrl,
  facebook_url: "https://www.facebook.com/coworkingspaceincoimbatore/",
  twitter_url: "https://twitter.com/covaitechpark",
  instagram_url: "https://www.instagram.com/covaitechpark/",
  linkedin_url: "https://www.linkedin.com/company/covai-tech-park/",
  youtube_url: "https://youtube.com/covaitechpark",
  coimbatore_map_embed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3916.143641267597!2d77.031952!3d11.027815!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba857a2bd66f649%3A0xc48c0827ea8061e8!2sCovai%20Tech%20Park!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin",
  coimbatore_map_link: "https://maps.app.goo.gl/T4HnE2Wn8nSjLptN8",
  trichy_map_embed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.9172089270634!2d78.6881744!3d10.8176587!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3baaf50ad5c0a373%3A0x63cd735d4fa36829!2sBloom%20Plaza!5e0!3m2!1sen!2sin!4v1718100000000!5m2!1sen!2sin",
  trichy_map_link: "https://maps.google.com/?q=Bloom+Plaza+Trichy",
};

export function useSettings() {
  const [settings, setSettings] = useState<SettingsDict>(defaultSettings);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadSettings() {
      try {
        const res = await fetch("http://localhost:8000/api/settings");
        if (res.ok) {
          const data = await res.json();
          setSettings(prev => ({
            ...prev,
            ...data
          }));
        }
      } catch (err) {
        console.error("Failed to load settings from API", err);
      } finally {
        setLoading(false);
      }
    }
    loadSettings();
  }, []);

  return { settings, loading };
}
