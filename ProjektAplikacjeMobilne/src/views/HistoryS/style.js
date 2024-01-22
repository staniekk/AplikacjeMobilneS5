import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: "#11B5E4",
    marginBottom: 120,
  },
  loginBtn: {
    padding: 5,
    backgroundColor: "#F4F7F8",
    width: 150,
    marginBottom: 30,
    borderRadius: 30,
    marginTop: 30,
    justifyContent: "bottom",
  },

  loginText: {
    color: "#564949",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 25,
  },
  noHistory: {
    backgroundColor: "#11B5E4",
    marginTop: 20,
  },
  logo: {
    marginTop: 50,
    marginBottom: 20,
    width: 55,
    height: 45,
    alignSelf: "center",
  },
  runner: {
    width: 49.48,
    height: 64,
    justifyContent: "center",
    alignItems: "center",
  },

  historyInfo: {
    backgroundColor: "#FFFFFF",
    width: "85%",
    borderRadius: 25,
    marginVertical: 10,
    padding: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  historyInfo2: {
    backgroundColor: "#b1e1f0",
    width: "100%",
    borderRadius: 25,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row", // Dodać tę linię
  },

  historyInfoText: {
    color: "#034748",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 15,
  },

  historyInfoText2: {
    color: "#034748",
    fontSize: 14,
    textAlign: "center",
  },
});
