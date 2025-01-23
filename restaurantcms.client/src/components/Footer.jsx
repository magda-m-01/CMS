import React from "react";
import { Box, Typography, Link, Grid, Divider } from "@mui/material";

const Footer = () => {
    return (
        <Box
            component="footer"
            sx={{
                backgroundColor: "#f5f5f5",
                padding: "20px 0",
                mt: 4,
                position: "sticky",
            }}
        >
            <Grid container justifyContent="center" spacing={3}>
                <Grid item xs={12} sm={4} md={3}>
                    <Typography variant="h6" gutterBottom>
                        Company
                    </Typography>
                    <Link href="/about" color="inherit" underline="hover">
                        About Us
                    </Link>
                    <br />
                    <Link href="/careers" color="inherit" underline="hover">
                        Careers
                    </Link>
                    <br />
                    <Link href="/blog" color="inherit" underline="hover">
                        Blog
                    </Link>
                </Grid>

                <Grid item xs={12} sm={4} md={3}>
                    <Typography variant="h6" gutterBottom>
                        Support
                    </Typography>
                    <Link href="/help" color="inherit" underline="hover">
                        Help Center
                    </Link>
                    <br />
                    <Link href="/contact" color="inherit" underline="hover">
                        Contact Us
                    </Link>
                    <br />
                    <Link href="/faq" color="inherit" underline="hover">
                        FAQs
                    </Link>
                </Grid>

                <Grid item xs={12} sm={4} md={3}>
                    <Typography variant="h6" gutterBottom>
                        Social
                    </Typography>
                    <Link
                        href="https://facebook.com"
                        color="inherit"
                        underline="hover"
                        target="_blank"
                    >
                        Facebook
                    </Link>
                    <br />
                    <Link
                        href="https://twitter.com"
                        color="inherit"
                        underline="hover"
                        target="_blank"
                    >
                        Twitter
                    </Link>
                    <br />
                    <Link
                        href="https://linkedin.com"
                        color="inherit"
                        underline="hover"
                        target="_blank"
                    >
                        LinkedIn
                    </Link>
                </Grid>
            </Grid>

            <Divider sx={{ my: 3 }} />

            <Typography variant="body2" color="textSecondary" align="center">
                © {new Date().getFullYear()} Your Company Name. All rights
                reserved.
            </Typography>
        </Box>
    );
};

export default Footer;
