import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { defaultStyles } from "@/constants/Styles";
import { ListingGeo } from "@/interfaces/listingGeo";
import { useRouter } from "expo-router";
import MapView from "react-native-map-clustering";

interface Props {
  listings: any;
}

const INITIAL_REGION = {
  latitude: 22.302711,
  longitude: 114.177216,
  latitudeDelta: 9,
  longitudeDelta: 9,
};

const ListingsMap = ({ listings }: Props) => {
  const router = useRouter();

  const onMarkerSelected = (item: ListingGeo) => {
    router.push(`/listing/${item.properties.id}`);
  };

  const renderCluster = (cluster: any) => {
    const { id, geometry, onPress, properties } = cluster;
    const points = properties.point_count;

    return (
      <Marker
        key={`cluster-${id}`}
        coordinate={{
          latitude: geometry.coordinates[1],
          longitude: geometry.coordinates[0],
        }}
        onPress={onPress}
      >
        <View style={styles.marker}>
          <Text
            style={{
              color: "#000",
              textAlign: "center",
              fontFamily: "mon-sb",
            }}
          >
            {points}
          </Text>
        </View>
      </Marker>
    );
  };
  return (
    <View style={defaultStyles.container}>
      <MapView
        animationEnabled={false}
        style={StyleSheet.absoluteFill}
        showsUserLocation
        showsMyLocationButton
        provider={PROVIDER_GOOGLE}
        initialRegion={INITIAL_REGION}
        clusterColor="#fff"
        clusterTextColor="#000"
        renderCluster={renderCluster}
      >
        {listings.features.map((item: ListingGeo) => (
          <Marker
            key={item.properties.id}
            onPress={() => onMarkerSelected(item)}
            coordinate={{
              latitude: item.properties.latitude,
              longitude: item.properties.longitude,
            }}
          >
            <View style={styles.marker}>
              <Text style={styles.markerText}>
                HKD {item.properties.price}{" "}
              </Text>
            </View>
          </Marker>
        ))}
      </MapView>
    </View>
  );
};

export default ListingsMap;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  marker: {
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 12,
    elevation: 5,
    justifyContent: "center",
    padding: 6,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: {
      width: 1,
      height: 10,
    },
    shadowRadius: 6,
  },
  markerText: {
    fontSize: 14,
    fontFamily: "mon-sb",
  },
});
