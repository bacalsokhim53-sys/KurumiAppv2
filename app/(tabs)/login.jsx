
import { router } from "expo-router";
import { useState } from "react";
import {
  ActivityIndicator,
  Image,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { useAuth } from "../../context/AuthContext";

const API_URL = "https://kurumiappv2.onrender.com";

export default function Login() {
  const { setIsLogin } = useAuth();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = async () => {
    const cleanUsername = username.trim();
    const cleanPassword = password.trim();

    setErrorMessage("");

    if (!cleanUsername || !cleanPassword) {
      setErrorMessage("Please enter your username and password.");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(`${API_URL}/api/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_login: cleanUsername,
          user_pass: cleanPassword,
        }),
      });

      const text = await response.text();

      let data;

      try {
        data = JSON.parse(text);
      } catch {
        setErrorMessage("The server returned an invalid response.");
        return;
      }

      if (response.ok && data.success) {
        setIsLogin(true);
        router.replace("/(tabs)/home");
        return;
      }

      setErrorMessage(
        data.message || "Invalid username or password."
      );
    } catch (error) {
      console.log("LOGIN ERROR:", error);

      setErrorMessage(
        `Could not connect to the backend server.\n\nServer: ${API_URL}`
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>

      {/* ==========================================
          BACKGROUND DECORATIONS
      ========================================== */}

      <View style={styles.backgroundDecor}>

        <Text style={[styles.decor, styles.star1]}>
          ✦
        </Text>

        <Text style={[styles.decor, styles.star2]}>
          ★
        </Text>

        <Text style={[styles.decor, styles.star3]}>
          ✧
        </Text>

        <Text style={[styles.decor, styles.heart1]}>
          ♡
        </Text>

        <Text style={[styles.decor, styles.heart2]}>
          ♡
        </Text>

        <Text style={[styles.decor, styles.cross1]}>
          ×
        </Text>

        <Text style={[styles.decor, styles.cross2]}>
          +
        </Text>

        <View style={styles.pinkCircle1} />
        <View style={styles.pinkCircle2} />

      </View>

      {/* ==========================================
          HEADER
      ========================================== */}

      <View style={styles.header}>

        <View style={styles.logoOuter}>

          <View style={styles.logoCircle}>

            <Image
              source={require("../../assets/images/kuromi.jpg")}
              style={styles.kuromiImage}
              resizeMode="contain"
            />

          </View>

        </View>

        <Text style={styles.smallTitle}>
          KUROMIAPP
        </Text>

        <Text style={styles.title}>
          Welcome Back
        </Text>

        <Text style={styles.subtitle}>
          Ready to get mischievous?
        </Text>

      </View>

      {/* ==========================================
          LOGIN FORM
      ========================================== */}

      <KeyboardAvoidingView
        style={styles.wrapper}
        behavior={
          Platform.OS === "ios"
            ? "padding"
            : undefined
        }
      >

        <View style={styles.card}>

          {/* CARD HEADER */}

          <View style={styles.cardTop}>

            <View style={styles.miniBadge}>

              <Image
                source={require("../../assets/images/kuromi.jpg")}
                style={styles.miniKuromi}
                resizeMode="contain"
              />

            </View>

            <Text style={styles.cardTitle}>
              Login
            </Text>

            <Text style={styles.cardSubtitle}>
              Enter your account details
            </Text>

          </View>

          {/* ==========================================
              ERROR MESSAGE
          ========================================== */}

          {errorMessage ? (
            <View style={styles.errorBox}>

              <Text style={styles.errorIcon}>
                !
              </Text>

              <Text style={styles.errorText}>
                {errorMessage}
              </Text>

            </View>
          ) : null}

          {/* ==========================================
              USERNAME
          ========================================== */}

          <Text style={styles.label}>
            Username
          </Text>

          <TextInput
            style={styles.input}
            placeholder="Enter your username"
            placeholderTextColor="#9B8FA8"
            value={username}
            onChangeText={setUsername}
            autoCapitalize="none"
            autoCorrect={false}
            editable={!loading}
          />

          {/* ==========================================
              PASSWORD
          ========================================== */}

          <Text style={styles.label}>
            Password
          </Text>

          <TextInput
            style={styles.input}
            placeholder="Enter your password"
            placeholderTextColor="#9B8FA8"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            autoCapitalize="none"
            autoCorrect={false}
            editable={!loading}
          />

          {/* ==========================================
              LOGIN BUTTON
          ========================================== */}

          <TouchableOpacity
            style={[
              styles.loginButton,
              loading && styles.disabled,
            ]}
            onPress={handleLogin}
            disabled={loading}
            activeOpacity={0.85}
          >

            {loading ? (
              <ActivityIndicator color="#FFFFFF" />
            ) : (
              <>
               

                <Text style={styles.loginText}>
                  LOGIN
                </Text>

                <Text style={styles.loginArrow}>
                  →
                </Text>
              </>
            )}

          </TouchableOpacity>

          {/* ==========================================
              DIVIDER
          ========================================== */}

          <View style={styles.dividerContainer}>

            <View style={styles.divider} />

            <Text style={styles.orText}>
              OR
            </Text>

            <View style={styles.divider} />

          </View>

          {/* ==========================================
              SIGN UP
          ========================================== */}

          <TouchableOpacity
            style={styles.signupButton}
            onPress={() => router.push("/signup")}
            disabled={loading}
            activeOpacity={0.85}
          >

            <Text style={styles.signupText}>
              CREATE AN ACCOUNT
            </Text>

          </TouchableOpacity>

          {/* ==========================================
              FOOTER
          ========================================== */}

          <Text style={styles.bottomText}>
            New to KUROMIApp?
          </Text>

          <Text style={styles.bottomSubText}>
            Join us and make something cute & chaotic ♡
          </Text>

        </View>

      </KeyboardAvoidingView>

    </View>
  );
}

const styles = StyleSheet.create({

  // ==========================================
  // MAIN
  // ==========================================

  container: {
    flex: 1,
    backgroundColor: "#160D1F",
  },

  // ==========================================
  // BACKGROUND
  // ==========================================

  backgroundDecor: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    overflow: "hidden",
  },

  decor: {
    position: "absolute",
    color: "#FF5FA2",
    fontWeight: "900",
  },

  star1: {
    top: 100,
    left: 25,
    fontSize: 28,
  },

  star2: {
    top: 220,
    right: 25,
    fontSize: 20,
    color: "#D9A7FF",
  },

  star3: {
    bottom: 120,
    left: 35,
    fontSize: 25,
    color: "#FFFFFF",
  },

  heart1: {
    top: 170,
    right: 40,
    fontSize: 26,
  },

  heart2: {
    bottom: 190,
    right: 30,
    fontSize: 30,
    color: "#D9A7FF",
  },

  cross1: {
    top: 310,
    left: 35,
    fontSize: 30,
    color: "#FFFFFF",
  },

  cross2: {
    bottom: 250,
    right: 50,
    fontSize: 24,
    color: "#FF5FA2",
  },

  pinkCircle1: {
    position: "absolute",
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: "#6E275A",
    opacity: 0.35,
    top: -70,
    right: -60,
  },

  pinkCircle2: {
    position: "absolute",
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: "#8E3E86",
    opacity: 0.25,
    bottom: -50,
    left: -60,
  },

  // ==========================================
  // HEADER
  // ==========================================

  header: {
    backgroundColor: "#251432",

    alignItems: "center",

    paddingTop: 55,
    paddingBottom: 58,

    borderBottomLeftRadius: 42,
    borderBottomRightRadius: 42,

    borderBottomWidth: 2,
    borderBottomColor: "#FF5FA2",

    elevation: 10,

    shadowColor: "#FF5FA2",
    shadowOpacity: 0.2,
    shadowRadius: 15,

    shadowOffset: {
      width: 0,
      height: 7,
    },
  },

  // ==========================================
  // KUROMI IMAGE
  // ==========================================

  logoOuter: {
    width: 92,
    height: 92,

    borderRadius: 46,

    backgroundColor: "#100912",

    justifyContent: "center",
    alignItems: "center",

    borderWidth: 3,
    borderColor: "#FF5FA2",

    marginBottom: 12,

    elevation: 6,

    shadowColor: "#FF5FA2",
    shadowOpacity: 0.3,
    shadowRadius: 10,

    shadowOffset: {
      width: 0,
      height: 4,
    },
  },

  logoCircle: {
    width: 80,
    height: 80,

    borderRadius: 40,

    backgroundColor: "#351B43",

    justifyContent: "center",
    alignItems: "center",

    overflow: "hidden",
  },

  kuromiImage: {
    width: 72,
    height: 72,
  },

  // ==========================================
  // HEADER TEXT
  // ==========================================

  smallTitle: {
    color: "#FF8FBE",

    fontSize: 11,

    fontWeight: "900",

    letterSpacing: 5,

    marginBottom: 5,
  },

  title: {
    color: "#FFFFFF",

    fontSize: 30,

    fontWeight: "900",

    letterSpacing: 0.5,
  },

  subtitle: {
    color: "#C7B8CE",

    fontSize: 14,

    marginTop: 7,
  },

  // ==========================================
  // FORM
  // ==========================================

  wrapper: {
    flex: 1,

    marginTop: -30,

    paddingHorizontal: 20,
  },

  card: {
    width: "100%",

    maxWidth: 430,

    alignSelf: "center",

    backgroundColor: "#24152F",

    borderRadius: 26,

    padding: 24,

    borderWidth: 1.5,

    borderColor: "#593A68",

    elevation: 12,

    shadowColor: "#000",

    shadowOpacity: 0.45,

    shadowRadius: 15,

    shadowOffset: {
      width: 0,
      height: 8,
    },
  },

  // ==========================================
  // CARD HEADER
  // ==========================================

  cardTop: {
    alignItems: "center",

    marginBottom: 20,
  },

  miniBadge: {
    width: 52,
    height: 52,

    borderRadius: 26,

    backgroundColor: "#381D48",

    justifyContent: "center",
    alignItems: "center",

    borderWidth: 1,

    borderColor: "#FF5FA2",

    marginBottom: 8,

    overflow: "hidden",
  },

  miniKuromi: {
    width: 45,
    height: 45,
  },

  cardTitle: {
    color: "#FFFFFF",

    fontSize: 24,

    fontWeight: "900",
  },

  cardSubtitle: {
    color: "#AFA0B7",

    fontSize: 13,

    marginTop: 4,
  },

  // ==========================================
  // ERROR
  // ==========================================

  errorBox: {
    backgroundColor: "#3B1829",

    borderWidth: 1,

    borderColor: "#FF5C8D",

    borderRadius: 13,

    padding: 11,

    marginBottom: 15,

    flexDirection: "row",

    alignItems: "center",
  },

  errorIcon: {
    width: 22,
    height: 22,

    borderRadius: 11,

    backgroundColor: "#FF5C8D",

    color: "#FFFFFF",

    textAlign: "center",

    lineHeight: 22,

    fontWeight: "900",

    marginRight: 8,
  },

  errorText: {
    flex: 1,

    color: "#FFB2C9",

    fontSize: 13,

    fontWeight: "600",
  },

  // ==========================================
  // INPUTS
  // ==========================================

  label: {
    color: "#E7D9ED",

    fontSize: 14,

    fontWeight: "800",

    marginBottom: 7,
  },

  input: {
    height: 53,

    borderWidth: 1.5,

    borderColor: "#634771",

    borderRadius: 14,

    paddingHorizontal: 16,

    marginBottom: 16,

    backgroundColor: "#180F21",

    color: "#FFFFFF",

    fontSize: 16,
  },

  // ==========================================
  // LOGIN BUTTON
  // ==========================================

  loginButton: {
    height: 54,

    borderRadius: 15,

    backgroundColor: "#FF5FA2",

    justifyContent: "center",

    alignItems: "center",

    flexDirection: "row",

    marginTop: 3,

    elevation: 5,

    shadowColor: "#FF5FA2",

    shadowOpacity: 0.35,

    shadowRadius: 8,

    shadowOffset: {
      width: 0,
      height: 4,
    },
  },

  buttonKuromi: {
    width: 30,
    height: 30,

    marginRight: 8,
  },

  loginText: {
    color: "#251432",

    fontSize: 16,

    fontWeight: "900",

    letterSpacing: 1.5,
  },

  loginArrow: {
    color: "#251432",

    fontSize: 22,

    fontWeight: "900",

    marginLeft: 9,
  },

  disabled: {
    opacity: 0.55,
  },

  // ==========================================
  // DIVIDER
  // ==========================================

  dividerContainer: {
    flexDirection: "row",

    alignItems: "center",

    marginVertical: 22,
  },

  divider: {
    flex: 1,

    height: 1,

    backgroundColor: "#4A3555",
  },

  orText: {
    marginHorizontal: 12,

    color: "#8F7E98",

    fontSize: 11,

    fontWeight: "900",
  },

  // ==========================================
  // SIGN UP
  // ==========================================

  signupButton: {
    height: 52,

    borderRadius: 14,

    borderWidth: 1.5,

    borderColor: "#FF5FA2",

    justifyContent: "center",

    alignItems: "center",

    backgroundColor: "#2D1939",
  },

  signupText: {
    color: "#FF79AE",

    fontSize: 14,

    fontWeight: "900",

    letterSpacing: 1,
  },

  // ==========================================
  // FOOTER
  // ==========================================

  bottomText: {
    color: "#B9A8C1",

    fontSize: 12,

    textAlign: "center",

    marginTop: 13,
  },

  bottomSubText: {
    color: "#75647E",

    fontSize: 11,

    textAlign: "center",

    marginTop: 3,
  },

});

