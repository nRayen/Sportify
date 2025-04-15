import React from "react";

const ResetPasswordMail = ({ hash }) => {
	return (
		<html>
			<body style={styles.body}>
				<div style={styles.container}>
					{/* Header */}
					<div style={styles.header}>
						<h1 style={styles.logo}>
							Sportify
						</h1>
						<div style={styles.logoUnderline}></div>
					</div>

					{/* Content */}
					<div style={styles.content}>
						<h2 style={styles.title}>
							Mot de passe oublié !
						</h2>

						<div style={styles.card}>
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
								<h3 style={styles.cardTitle}>
									Message de sécurité
								</h3>
							</div>

							<p style={styles.cardText}>
								Vous avez demander un lien pour réinitialiser votre mot de passe.
							</p>

							<a href={"https://sportify.com/reset-password/" + hash} style={styles.button}>
								Modifier votre mot de passe →
							</a>
						</div>

						<p style={styles.disclaimer}>
							Si vous n'avez pas fait cette demande, vous pouvez ignorer cet email.
						</p>
					</div>

					<hr style={styles.divider} />

					{/* Footer */}
					<div style={styles.footer}>
						<p style={styles.footerText}>
							© {new Date().getFullYear()} Sportify. Tous droits réservés.
						</p>
					</div>
				</div>
			</body>
		</html>
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
