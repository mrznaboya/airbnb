import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { useWamUpBrowser } from "@/hooks/useWarmUpBrowser";

const Page = () => {
  useWamUpBrowser();

  return (
    <View style={styles.container}>
      <Text>Login</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
    padding: 26,
  },
});

export default Page;
