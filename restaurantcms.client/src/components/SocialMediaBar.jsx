import React, { useState, useEffect } from "react";
import { IconButton } from "@mui/material";
import { useSelector } from "react-redux";
import { getSocialMedia } from "../api/pages";
import { useLocation } from "react-router-dom";

const SocialMediaBar = () => {
    const [socialMediaLinks, setSocialMediaLinks] = useState([]);
    const token = useSelector((state) => state.auth.token);
    const isAdmin = useSelector((state) => state.auth.isAdmin);
    const location = useLocation();

    // Fetch social media links
    const fetchSocialMediaLinks = async () => {
        try {
            const response = await getSocialMedia(token);
            setSocialMediaLinks(response.data);
        } catch (error) {
            console.error("Error fetching social media links:", error);
        }
    };

    useEffect(() => {
        fetchSocialMediaLinks();
    }, []);

    return (
        location.pathname !== "/admin_dashboard" && (
            <div
                style={{
                    width: "100%",
                    height: "30px", // Thin bar height
                    backgroundColor: "#D3D3D3", // Grey background
                    display: "flex",
                    alignItems: "center",
                    paddingLeft: "10px", // Space from the left edge
                    justifyContent: "flex-start", // Align content to the left
                }}
            >
                {socialMediaLinks.map((link) => (
                    <a
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        key={link.id}
                    >
                        <IconButton>
                            <img
                                src={link.logoPath}
                                alt={`${link.url} logo`}
                                style={{
                                    width: "18px",
                                    height: "18px",
                                    objectFit: "contain", // Keep aspect ratio intact
                                }}
                            />
                        </IconButton>
                    </a>
                ))}
            </div>
        )
    );
};

export default SocialMediaBar;
