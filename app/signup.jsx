
import { router } from "expo-router";
import { useState } from "react";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const API_URL = "http://192.168.1.124:3000";

export default function Signup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleSignup = async () => {
    setErrorMessage("");
    setSuccessMessage("");

    if (
      !username.trim() ||
      !password ||
      !fname.trim() ||
      !lname.trim() ||
      !email.trim()
    ) {
      setErrorMessage("Please complete all fields.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/api/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          user_login: username.trim(),
          user_pass: password,
          fname: fname.trim(),
          lname: lname.trim(),
          email: email.trim(),
          gender: "N/A",
          user_level: 0,
          branch_cd: "MAIN",
          registered: new Date().toISOString(),
          user_activation_key: "",
          isActive: 1,
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

      console.log("SIGNUP RESPONSE:", data);

      if (response.ok && data.success) {
        setSuccessMessage("Account created successfully!");

        setTimeout(() => {
          router.replace("/(tabs)/login");
        }, 1500);

        return;
      }

      setErrorMessage(data.message || "Unable to create account.");
    } catch (error) {
      console.error("SIGNUP ERROR:", error);

      setErrorMessage(
        "Cannot connect to the server.\n\nMake sure your Node.js backend is running."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.screen}>

      {/* BACKGROUND DECORATION */}
      <View style={styles.backgroundDecor}>
        <View style={styles.circlePink} />
        <View style={styles.circleViolet} />
        <View style={styles.circleSmall} />

        <Text style={[styles.star, styles.star1]}>✦</Text>
        <Text style={[styles.star, styles.star2]}>✧</Text>
        <Text style={[styles.star, styles.star3]}>★</Text>

        <Text style={[styles.heart, styles.heart1]}>♡</Text>
        <Text style={[styles.heart, styles.heart2]}>♡</Text>

        <View style={styles.dot1} />
        <View style={styles.dot2} />
        <View style={styles.dot3} />
      </View>

      {/* HEADER */}
      <View style={styles.header}>

        <View style={styles.headerIcon}>
          <Text style={styles.headerIconText}>✦</Text>
        </View>

        <Text style={styles.brand}>
          KUROMIAPP
        </Text>

        <Text style={styles.title}>
          Create Account
        </Text>

        <Text style={styles.subtitle}>
          Welcome to our little world ♡
        </Text>

        <View style={styles.headerLine}>
          <View style={styles.line} />
          <Text style={styles.lineSymbol}>✦</Text>
          <View style={styles.line} />
        </View>

      </View>

      {/* FORM */}
      <KeyboardAvoidingView
        style={styles.keyboardWrapper}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >

          <View style={styles.form}>

            {/* FORM HEADER */}
            <View style={styles.formHeader}>

              <View style={styles.formIcon}>
                <Text style={styles.formIconText}>♡</Text>
              </View>

              <Text style={styles.formTitle}>
                Sign Up
              </Text>

              <Text style={styles.formSubtitle}>
                Create your KUROMIAPP account
              </Text>

            </View>

            {/* SUCCESS */}
            {successMessage ? (
              <View style={styles.successBanner}>
                <View style={styles.messageIconSuccess}>
                  <Text style={styles.messageIconText}>✓</Text>
                </View>

                <Text style={styles.successText}>
                  {successMessage}
                </Text>
              </View>
            ) : null}

            {/* ERROR */}
            {errorMessage ? (
              <View style={styles.errorBanner}>
                <View style={styles.messageIconError}>
                  <Text style={styles.messageIconText}>!</Text>
                </View>

                <Text style={styles.errorText}>
                  {errorMessage}
                </Text>
              </View>
            ) : null}

            {/* FIRST NAME */}
            <Text style={styles.label}>
              First Name
            </Text>

            <TextInput
              style={styles.input}
              placeholder="Enter your first name"
              placeholderTextColor="#A99BB5"
              value={fname}
              onChangeText={setFname}
              editable={!loading}
            />

            {/* LAST NAME */}
            <Text style={styles.label}>
              Last Name
            </Text>

            <TextInput
              style={styles.input}
              placeholder="Enter your last name"
              placeholderTextColor="#A99BB5"
              value={lname}
              onChangeText={setLname}
              editable={!loading}
            />

            {/* USERNAME */}
            <Text style={styles.label}>
              Username
            </Text>

            <TextInput
              style={styles.input}
              placeholder="Choose a username"
              placeholderTextColor="#A99BB5"
              value={username}
              onChangeText={setUsername}
              autoCapitalize="none"
              autoCorrect={false}
              editable={!loading}
            />

            {/* EMAIL */}
            <Text style={styles.label}>
              Email
            </Text>

            <TextInput
              style={styles.input}
              placeholder="Enter your email"
              placeholderTextColor="#A99BB5"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              editable={!loading}
            />

            {/* PASSWORD */}
            <Text style={styles.label}>
              Password
            </Text>

            <TextInput
              style={styles.input}
              placeholder="Create a password"
              placeholderTextColor="#A99BB5"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              autoCapitalize="none"
              editable={!loading}
            />

            {/* CREATE ACCOUNT */}
            <TouchableOpacity
              style={[
                styles.signupButton,
                loading && styles.disabledButton,
              ]}
              onPress={handleSignup}
              disabled={loading}
              activeOpacity={0.85}
            >
              {loading ? (
                <ActivityIndicator color="#FFFFFF" />
              ) : (
                <>
                  <Text style={styles.buttonIcon}>
                    ✦
                  </Text>

                  <Text style={styles.signupText}>
                    CREATE ACCOUNT
                  </Text>

                  <Text style={styles.signupArrow}>
                    →
                  </Text>
                </>
              )}
            </TouchableOpacity>

            {/* DIVIDER */}
            <View style={styles.dividerContainer}>
              <View style={styles.divider} />

              <Text style={styles.dividerText}>
                OR
              </Text>

              <View style={styles.divider} />
            </View>

            {/* LOGIN */}
            <View style={styles.loginContainer}>

              <Text style={styles.loginQuestion}>
                Already have an account?
              </Text>

              <TouchableOpacity
                onPress={() =>
                  router.replace("/(tabs)/login")
                }
                disabled={loading}
              >
                <Text style={styles.loginLink}>
                  Login
                </Text>
              </TouchableOpacity>

            </View>

            {/* BOTTOM */}
            <View style={styles.bottomDecoration}>

              <Text style={styles.bottomSymbol}>
                ✦
              </Text>

              <View style={styles.bottomLine} />

              <Text style={styles.bottomHeart}>
                ♡
              </Text>

              <View style={styles.bottomLine} />

              <Text style={styles.bottomSymbol}>
                ✦
              </Text>

            </View>

            <Text style={styles.bottomText}>
              Made with love for KUROMIAPP ♡
            </Text>

          </View>

        </ScrollView>
      </KeyboardAvoidingView>

    </View>
  );
}

const styles = StyleSheet.create({

  // ==========================================
  // SCREEN
  // ==========================================

  screen: {
    flex: 1,
    backgroundColor: "#12091A",
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

  circlePink: {
    position: "absolute",
    width: 260,
    height: 260,
    borderRadius: 130,
    backgroundColor: "#E84393",
    opacity: 0.12,
    top: -100,
    right: -90,
  },

  circleViolet: {
    position: "absolute",
    width: 280,
    height: 280,
    borderRadius: 140,
    backgroundColor: "#8E44AD",
    opacity: 0.13,
    bottom: -120,
    left: -110,
  },

  circleSmall: {
    position: "absolute",
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#FF69B4",
    opacity: 0.08,
    top: 300,
    right: -30,
  },

  star: {
    position: "absolute",
    color: "#FF69B4",
    fontWeight: "900",
  },

  star1: {
    top: 100,
    left: 25,
    fontSize: 28,
  },

  star2: {
    top: 230,
    right: 25,
    fontSize: 22,
    color: "#C77DFF",
  },

  star3: {
    bottom: 120,
    left: 30,
    fontSize: 25,
    color: "#FFFFFF",
  },

  heart: {
    position: "absolute",
    color: "#FF69B4",
    fontWeight: "900",
  },

  heart1: {
    top: 170,
    right: 35,
    fontSize: 30,
  },

  heart2: {
    bottom: 190,
    right: 30,
    fontSize: 30,
    color: "#C77DFF",
  },

  dot1: {
    position: "absolute",
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#FF69B4",
    top: 350,
    left: 35,
  },

  dot2: {
    position: "absolute",
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#C77DFF",
    top: 420,
    right: 45,
  },

  dot3: {
    position: "absolute",
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: "#FFB3D9",
    bottom: 300,
    left: 50,
  },

  // ==========================================
  // HEADER
  // ==========================================

  header: {
    backgroundColor: "#251331",
    alignItems: "center",

    paddingTop: 42,
    paddingBottom: 48,

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

  headerIcon: {
    width: 70,
    height: 70,
    borderRadius: 35,

    backgroundColor: "#35183F",

    justifyContent: "center",
    alignItems: "center",

    borderWidth: 2,
    borderColor: "#FF5FA2",

    marginBottom: 10,

    elevation: 6,
  },

  headerIconText: {
    color: "#FF69B4",
    fontSize: 34,
    fontWeight: "900",
  },

  brand: {
    color: "#FF8FBE",
    fontSize: 10,
    fontWeight: "900",
    letterSpacing: 5,
    marginBottom: 5,
  },

  title: {
    color: "#FFFFFF",
    fontSize: 29,
    fontWeight: "900",
  },

  subtitle: {
    color: "#C9B7D3",
    fontSize: 14,
    marginTop: 6,
  },

  headerLine: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 17,
    width: "65%",
  },

  line: {
    flex: 1,
    height: 1,
    backgroundColor: "#6E4A7C",
  },

  lineSymbol: {
    color: "#FF69B4",
    fontSize: 18,
    marginHorizontal: 10,
  },

  // ==========================================
  // KEYBOARD
  // ==========================================

  keyboardWrapper: {
    flex: 1,
    marginTop: -24,
  },

  scroll: {
    flex: 1,
  },

  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },

  // ==========================================
  // FORM
  // ==========================================

  form: {
    width: "100%",
    maxWidth: 430,
    alignSelf: "center",

    backgroundColor: "#24142F",

    borderRadius: 27,

    padding: 24,

    borderWidth: 1.5,
    borderColor: "#5B3A69",

    elevation: 12,

    shadowColor: "#000",
    shadowOpacity: 0.45,
    shadowRadius: 15,

    shadowOffset: {
      width: 0,
      height: 8,
    },
  },

  formHeader: {
    alignItems: "center",
    marginBottom: 20,
  },

  formIcon: {
    width: 52,
    height: 52,
    borderRadius: 26,

    backgroundColor: "#381B47",

    justifyContent: "center",
    alignItems: "center",

    borderWidth: 1,
    borderColor: "#FF5FA2",

    marginBottom: 8,
  },

  formIconText: {
    color: "#FF69B4",
    fontSize: 28,
    fontWeight: "900",
  },

  formTitle: {
    color: "#FFFFFF",
    fontSize: 25,
    fontWeight: "900",
  },

  formSubtitle: {
    color: "#AFA0B7",
    fontSize: 13,
    marginTop: 4,
  },

  // ==========================================
  // MESSAGES
  // ==========================================

  successBanner: {
    backgroundColor: "#282044",

    borderWidth: 1,
    borderColor: "#A56BDE",

    borderRadius: 13,

    padding: 11,
    marginBottom: 15,

    flexDirection: "row",
    alignItems: "center",
  },

  messageIconSuccess: {
    width: 22,
    height: 22,
    borderRadius: 11,

    backgroundColor: "#A56BDE",

    justifyContent: "center",
    alignItems: "center",

    marginRight: 8,
  },

  successText: {
    flex: 1,
    color: "#DCCBFF",
    fontSize: 13,
    fontWeight: "700",
  },

  errorBanner: {
    backgroundColor: "#421B31",

    borderWidth: 1,
    borderColor: "#FF5C9A",

    borderRadius: 13,

    padding: 11,
    marginBottom: 15,

    flexDirection: "row",
    alignItems: "center",
  },

  messageIconError: {
    width: 22,
    height: 22,
    borderRadius: 11,

    backgroundColor: "#FF5C9A",

    justifyContent: "center",
    alignItems: "center",

    marginRight: 8,
  },

  messageIconText: {
    color: "#FFFFFF",
    fontWeight: "900",
  },

  errorText: {
    flex: 1,
    color: "#FFB4CE",
    fontSize: 13,
    fontWeight: "600",
  },

  // ==========================================
  // LABELS
  // ==========================================

  label: {
    color: "#E8D9EF",
    fontSize: 14,
    fontWeight: "800",

    marginBottom: 7,
    marginLeft: 2,
  },

  // ==========================================
  // INPUTS
  // ==========================================

  input: {
    height: 53,

    borderWidth: 1.5,
    borderColor: "#654771",

    borderRadius: 14,

    paddingHorizontal: 16,

    marginBottom: 16,

    backgroundColor: "#170D20",

    color: "#FFFFFF",

    fontSize: 16,
  },

  // ==========================================
  // BUTTON
  // ==========================================

  signupButton: {
    height: 55,

    borderRadius: 15,

    backgroundColor: "#FF5FA2",

    justifyContent: "center",
    alignItems: "center",

    flexDirection: "row",

    marginTop: 3,

    elevation: 5,

    shadowColor: "#FF5FA2",
    shadowOpacity: 0.35,
    shadowRadius: 9,

    shadowOffset: {
      width: 0,
      height: 4,
    },
  },

  buttonIcon: {
    color: "#281432",
    fontSize: 18,
    fontWeight: "900",
    marginRight: 8,
  },

  signupText: {
    color: "#281432",

    fontSize: 15,
    fontWeight: "900",

    letterSpacing: 1.2,
  },

  signupArrow: {
    color: "#281432",

    fontSize: 22,
    fontWeight: "900",

    marginLeft: 9,
  },

  disabledButton: {
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

  dividerText: {
    color: "#A18BAE",

    marginHorizontal: 12,

    fontSize: 11,
    fontWeight: "900",
  },

  // ==========================================
  // LOGIN
  // ==========================================

  loginContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },

  loginQuestion: {
    color: "#AFA0B7",
    fontSize: 14,
    marginRight: 5,
  },

  loginLink: {
    color: "#FF79AE",
    fontSize: 14,
    fontWeight: "900",
  },

  // ==========================================
  // BOTTOM
  // ==========================================

  bottomDecoration: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 25,
  },

  bottomLine: {
    flex: 1,
    height: 1,
    backgroundColor: "#4A3555",
  },

  bottomSymbol: {
    color: "#FF5FA2",
    fontSize: 15,
    marginHorizontal: 8,
  },

  bottomHeart: {
    color: "#C77DFF",
    fontSize: 21,
    marginHorizontal: 7,
  },

  bottomText: {
    color: "#75647E",
    fontSize: 11,
    textAlign: "center",
    marginTop: 8,
  },
});

