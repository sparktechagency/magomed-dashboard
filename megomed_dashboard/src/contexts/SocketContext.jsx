import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import { io } from "socket.io-client";
import useAuth from "../hooks/useAuth";
import { baseURL } from "../utils/BaseURL";

// Socket.IO needs the base server URL without /api/v1
const socketURL = baseURL.replace("/api/v1", "");

const SocketContext = createContext();

export const useSocket = () => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error("useSocket must be used within a SocketProvider");
  }
  return context;
};

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const { token, isAuthenticated } = useAuth();

  useEffect(() => {
    console.log("=== SOCKET EFFECT TRIGGERED ===");
    console.log("isAuthenticated:", isAuthenticated);
    console.log("token:", token ? "Present" : "Missing");
    console.log("token length:", token?.length || 0);
    console.log("===============================");

    if (isAuthenticated && token) {
      // Initialize socket connection
      console.log("=== INITIALIZING SOCKET ===");
      console.log("Base URL:", baseURL);
      console.log("Socket URL:", socketURL);
      console.log("Token:", token ? "Present" : "Missing");
      console.log("Is Authenticated:", isAuthenticated);
      console.log("===========================");

      const newSocket = io(socketURL, {
        auth: {
          token: token,
        },
        transports: ["websocket", "polling"],
        timeout: 20000,
        forceNew: true,
      });

      // Connection event handlers
      newSocket.on("connect", () => {
        console.log("=== SOCKET CONNECTED ===");
        console.log("Socket ID:", newSocket.id);
        console.log("Socket URL:", socketURL);
        console.log("Authentication Token:", token ? "Present" : "Missing");
        console.log("=========================");
        setIsConnected(true);
      });

      newSocket.on("disconnect", (reason) => {
        console.log("=== SOCKET DISCONNECTED ===");
        console.log("Disconnect Reason:", reason);
        console.log("============================");
        setIsConnected(false);
      });

      newSocket.on("connect_error", (error) => {
        console.error("=== SOCKET CONNECTION ERROR ===");
        console.error("Error:", error);
        console.error("Error Message:", error.message);
        console.error("Error Type:", error.type);
        console.error("===============================");
        setIsConnected(false);
      });

      setSocket(newSocket);

      // Cleanup on unmount
      return () => {
        newSocket.close();
        setSocket(null);
        setIsConnected(false);
      };
    } else {
      console.log("=== SOCKET NOT INITIALIZED ===");
      console.log("Reason: Not authenticated or no token");
      console.log("isAuthenticated:", isAuthenticated);
      console.log("token:", token ? "Present" : "Missing");
      console.log("===============================");
    }
  }, [isAuthenticated, token]);

  // Create stable socket helper functions with useCallback
  const emit = useCallback(
    (event, data) => {
      if (socket && isConnected) {
        console.log(`Socket: Emitting event ${event}`);
        socket.emit(event, data);
      } else {
        console.warn("Cannot emit - Socket not connected");
      }
    },
    [socket, isConnected]
  );

  const on = useCallback(
    (event, callback) => {
      if (socket) {
        console.log(`Socket: Listening for event ${event}`);
        socket.on(event, callback);
      } else {
        console.warn("Cannot listen - Socket not available");
      }
    },
    [socket]
  );

  const off = useCallback(
    (event, callback) => {
      if (socket) {
        console.log(`Socket: Removing listener for event ${event}`);
        socket.off(event, callback);
      } else {
        console.warn("Cannot remove listener - Socket not available");
      }
    },
    [socket]
  );

  const value = {
    socket,
    isConnected,
    emit,
    on,
    off,
  };

  return (
    <SocketContext.Provider value={value}>{children}</SocketContext.Provider>
  );
};
