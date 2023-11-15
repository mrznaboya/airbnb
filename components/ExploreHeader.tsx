import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { Link } from "expo-router";
import Colors from "@/constants/Colors";
import { useRef, useState } from "react";
import * as Haptics from "expo-haptics";

const categories = [
  {
    name: "Home",
    icon: "home",
  },
  {
    name: "Bedrooms",
    icon: "king-bed",
  },
  {
    name: "Bathrooms",
    icon: "bathtub",
  },
  {
    name: "Kitchen",
    icon: "kitchen",
  },
  {
    name: "Parking",
    icon: "local-parking",
  },
  {
    name: "Beach",
    icon: "beach-access",
  },
  {
    name: "City",
    icon: "location-city",
  },
];

const ExploreHeader = () => {
  const scrollRef = useRef<ScrollView>(null);
  const itemsRef = useRef<Array<TouchableOpacity | null>>([]);
  const [activeIndex, setActiveIndex] = useState(0);

  const selectCategory = (index: number) => {
    const selected = itemsRef.current[index];
    setActiveIndex(index);

    selected?.measure((x) => {
      scrollRef.current?.scrollTo({ x: x - 16, y: 0, animated: true });
    });

    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  };
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FFF" }}>
      <View style={styles.container}>
        <View style={styles.actionRow}>
          <Link href={"/(modals)/booking"} asChild>
            <TouchableOpacity style={styles.searchBtn}>
              <Ionicons name="search" size={24} />
              <View>
                <Text style={{ fontFamily: "mon-sb" }}>Where to?</Text>
                <Text style={{ fontFamily: "mon-r", color: Colors.grey }}>
                  Anywhere · Any week
                </Text>
              </View>
            </TouchableOpacity>
          </Link>
          <TouchableOpacity style={styles.filterBtn}>
            <Ionicons name="options-outline" size={24} />
          </TouchableOpacity>
        </View>

        <ScrollView
          ref={scrollRef}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            alignItems: "center",
            gap: 30,
            paddingHorizontal: 16,
          }}
        >
          {categories.map((item, index) => (
            <TouchableOpacity
              key={index}
              ref={(el) => (itemsRef.current[index] = el)}
              style={
                activeIndex === index
                  ? styles.categoriesBtnActive
                  : styles.categoriesBtn
              }
              onPress={() => selectCategory(index)}
            >
              <MaterialIcons
                name={item.icon as any}
                size={24}
                color={activeIndex === index ? "#000" : Colors.grey}
              />
              <Text
                style={
                  activeIndex === index
                    ? styles.categoryTextActive
                    : styles.categoryText
                }
              >
                {item.name}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFF",
    height: 130,
  },
  actionRow: {
    alignItems: "center",
    flexDirection: "row",
    gap: 10,
    justifyContent: "space-between",
    paddingHorizontal: 24,
    paddingBottom: 16,
  },
  filterBtn: {
    borderColor: Colors.grey,
    borderRadius: 24,
    borderWidth: 1,
    padding: 10,
  },
  searchBtn: {
    alignItems: "center",
    backgroundColor: "#FFF",
    borderColor: "#C2C2C2",
    borderRadius: 30,
    borderWidth: StyleSheet.hairlineWidth,
    elevation: 2,
    flex: 1,
    flexDirection: "row",
    gap: 10,
    padding: 14,
    shadowColor: "#000",
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 0.12,
    shadowRadius: 8,
  },
  categoryText: {
    fontFamily: "mon-sb",
    fontSize: 14,
    color: Colors.grey,
  },
  categoryTextActive: {
    fontFamily: "mon-sb",
    fontSize: 14,
    color: "#000",
  },
  categoriesBtn: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
    paddingBottom: 8,
  },
  categoriesBtnActive: {
    alignItems: "center",
    borderBottomColor: "#000",
    borderBottomWidth: 2,
    flex: 1,
    justifyContent: "center",
    paddingBottom: 8,
  },
});

export default ExploreHeader;
