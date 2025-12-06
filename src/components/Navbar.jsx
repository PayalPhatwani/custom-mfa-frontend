import { Link, useNavigate } from "react-router-dom";

export default function Navbar(){
    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    }

    return(
        <nav style={styles.nav}>
      <h2 style={styles.logo}>My App</h2>

      <div style={styles.links}>
        {!token && (
          <>
            <Link to="/login" style={styles.link}>Login</Link>
            <Link to="/register" style={styles.link}>Register</Link>
          </>
        )}

        {token && (
          <button onClick={handleLogout} style={styles.logoutBtn}>
            Logout
          </button>
        )}
      </div>
    </nav>
    )
}

const styles = {
  nav: {
    width: "100%",
    background: "#282c34",
    color: "white",
  },

  container: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "15px 20px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    overflow: "hidden",       // 👈 IMPORTANT
    boxSizing: "border-box",  // 👈 prevents layout shift
  },

  links: {
    display: "flex",
    gap: "20px",
    alignItems: "center",
    whiteSpace: "nowrap",     // 👈 prevents text from wrapping
    overflow: "hidden",       // 👈 prevents cutting
  },

  link: {
    textDecoration: "none",
    color: "white",
    fontSize: "18px",
  },

  logoutBtn: {
    background: "red",
    color: "white",
    border: "none",
    padding: "8px 12px",
    cursor: "pointer",
    borderRadius: "4px",
    whiteSpace: "nowrap",
  },
};
