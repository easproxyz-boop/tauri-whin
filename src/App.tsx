import { useState, useRef } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  Snackbar,
  Alert,
} from "@mui/material";

function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [open, setOpen] = useState(false);
  const [alertType, setAlertType] =
    useState<"success" | "error">("success");
  const [message, setMessage] = useState("");

  // CAMERA
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [cameraOpen, setCameraOpen] = useState(false);

  const handleLogin = () => {
    if (email === "admin@gmail.com" && password === "1234") {
      setAlertType("success");
      setMessage("Login successful!");
    } else {
      setAlertType("error");
      setMessage("Invalid credentials!");
    }

    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // OPEN CAMERA
  const openCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: false,
      });

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
      }

      setCameraOpen(true);

      setAlertType("success");
      setMessage("Camera opened!");
      setOpen(true);
    } catch (err) {
      console.error("Camera error:", err);

      setAlertType("error");
      setMessage("Cannot access camera (check OS permission)");
      setOpen(true);
    }
  };

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#f5f5f5",
      }}
    >
      <Paper elevation={4} sx={{ p: 4, width: 360 }}>
        <Typography
          variant="h5"
          sx={{
            mb: 2,
            textAlign: "center",
          }}
        >
          Loginsssfassbbbb
        </Typography>

        <TextField
          fullWidth
          label="Email"
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <TextField
          fullWidth
          label="Password"
          type="password"
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Button
          fullWidth
          variant="contained"
          sx={{ mt: 2 }}
          onClick={handleLogin}
        >
          Login
        </Button>

        <Button
          fullWidth
          variant="outlined"
          sx={{ mt: 2 }}
          onClick={openCamera}
        >
          Open Camera
        </Button>

        {cameraOpen && (
          <Box sx={{ mt: 2 }}>
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              style={{
                width: "100%",
                borderRadius: 10,
              }}
            />
          </Box>
        )}
      </Paper>

      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <Alert
          onClose={handleClose}
          severity={alertType}
          sx={{ width: "100%" }}
        >
          {message}
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default App;