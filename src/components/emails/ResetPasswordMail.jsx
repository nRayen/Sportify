import React from "react";
import {
	Html,
	Body,
	Container,
	Section,
	Text,
	Link,
	Heading,
	Hr,
} from "@react-email/components";

const ResetPasswordMail = ({ hash }) => {
	return (
		<Html>
			<Body style={styles.body}>
				<Container style={styles.container}>
					{/* Header */}
					<Section style={styles.header}>
						<Heading as="h1" style={styles.logo}>
							Sportify
						</Heading>
						<div style={styles.logoUnderline}></div>
					</Section>

					{/* Content */}
					<Section style={styles.content}>
						<Heading as="h2" style={styles.title}>
							Mot de passe oublié !
						</Heading>

						<Section style={styles.card}>
							<div style={styles.cardHeader}>
								<div style={styles.iconContainer}>
									<img
										src="https://raw.githubusercontent.com/lucide-icons/lucide/main/icons/dumbbell.svg"
										width="24"
										height="24"
										alt="Dumbbell icon"
										style={{
											filter:
												"invert(71%) sepia(93%) saturate(394%) hue-rotate(127deg) brightness(95%) contrast(98%)",
										}}
									/>
								</div>
								<Heading as="h3" style={styles.cardTitle}>
									Message de sécurité
								</Heading>
							</div>

							<Text style={styles.cardText}>
								Vous avez demander un lien pour réinitialiser votre mot de passe.
							</Text>

							<Link href={"https://sportify.com/reset-password/" + hash} style={styles.button}>
								Modifier votre mot de passe →
							</Link>
						</Section>

						<Text style={styles.disclaimer}>
							Si vous n'avez pas fait cette demande, vous pouvez ignorer cet email.
						</Text>
					</Section>

					<Hr style={styles.divider} />

					{/* Footer */}
					<Section style={styles.footer}>
						<Text style={styles.footerText}>
							© {new Date().getFullYear()} Sportify. Tous droits réservés.
						</Text>
					</Section>
				</Container>
			</Body>
		</Html>
	);
};

const styles = {
	body: {
		backgroundColor: "#F5F4F7",
		fontFamily:
			"-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
		margin: "0",
		padding: "0",
	},
	container: {
		maxWidth: "600px",
		margin: "0 auto",
		padding: "40px 20px",
		backgroundColor: "#FFFFFF",
		borderRadius: "12px",
		marginTop: "40px",
	},
	header: {
		textAlign: "center",
		marginBottom: "40px",
	},
	logo: {
		fontSize: "24px",
		fontWeight: "500",
		color: "#161616",
		marginBottom: "12px",
	},
	logoUnderline: {
		width: "48px",
		height: "4px",
		backgroundColor: "#64D8CB",
		margin: "0 auto",
		borderRadius: "999px",
	},
	content: {
		padding: "0 20px",
	},
	title: {
		fontSize: "30px",
		fontWeight: "500",
		color: "#161616",
		marginBottom: "24px",
	},
	text: {
		fontSize: "16px",
		lineHeight: "24px",
		color: "#8996A9",
		marginBottom: "24px",
	},
	card: {
		backgroundColor: "#F5F4F7",
		padding: "24px",
		borderRadius: "12px",
		border: "1px solid rgba(0,0,0,0.1)",
		marginBottom: "24px",
	},
	cardHeader: {
		display: "flex",
		alignItems: "center",
		marginBottom: "16px",
	},
	iconContainer: {
		backgroundColor: "rgba(100, 216, 203, 0.1)",
		padding: "8px",
		borderRadius: "8px",
		marginRight: "16px",
	},
	cardTitle: {
		fontSize: "20px",
		fontWeight: "500",
		color: "#161616",
		margin: "0",
	},
	cardText: {
		fontSize: "16px",
		lineHeight: "24px",
		color: "#8996A9",
		marginBottom: "24px",
	},
	button: {
		backgroundColor: "#64D8CB",
		color: "#FFFFFF",
		padding: "12px 24px",
		borderRadius: "8px",
		textDecoration: "none",
		fontSize: "16px",
		fontWeight: "500",
		display: "inline-block",
	},
	disclaimer: {
		fontSize: "14px",
		color: "#8996A9",
		marginTop: "24px",
	},
	divider: {
		borderTop: "1px solid rgba(0,0,0,0.1)",
		margin: "32px 0",
	},
	footer: {
		textAlign: "center",
	},
	footerText: {
		fontSize: "14px",
		color: "#8996A9",
	},
};

export default ResetPasswordMail;
