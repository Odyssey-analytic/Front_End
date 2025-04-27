import { useEffect } from "react";

declare global {
  interface Window{
    google:any;
  }
}

const SignIn: React.FC = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    document.body.appendChild(script);

    script.onload = () => {
      if (window.google && window.google.accounts) {
        window.google.accounts.id.initialize({
          client_id: "23562081971-et56bvsvn60pfca9th7vh3c4h1pot0ob.apps.googleusercontent.com",
          ux_mode: "redirect",
          login_uri: "https://odysseyanalytics.ir/api/api/auth-receiver",
          itp_support: true,
        });

        window.google.accounts.id.renderButton(
          document.getElementById("g_id_signin") as HTMLElement,
          {
            theme: "outline",
            size: "large",
            text: "signin_with",
            shape: "pill",
            logo_alignment: "left",
          }
        );
      }
    };
  }, []);

  return (
    <div style={styles.container}>
      <div style={styles.inner}>
        <p style={styles.text}>Hi there 🙂</p>
        <p style={styles.text}>Click below to sign in with Google</p>
        <div id="g_id_signin"></div>
      </div>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    backgroundColor: "#f4f4f4",
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  inner: {
    backgroundColor: "white",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    textAlign: "center",
  },
  text: {
    color: "#333",
    margin: "10px 0",
  },
};

export default SignIn;