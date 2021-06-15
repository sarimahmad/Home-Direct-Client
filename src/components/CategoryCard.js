import React from "react";
import { View, StyleSheet, TouchableWithoutFeedback, Image } from "react-native";

import Text from "./Text";
import colors from "../config/colors";

function CategoryCard({ title, count, imageUrl, onPress, thumbnailUrl, countValue }) {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={styles.card}>
        <Image
          style={styles.image}
          loadingIndicatorSource={{ uri: 'http://localhost:9000/assets/shoes1_full.jpg' }}
          source={{uri: 'http://localhost:9000/assets/shoes1_full.jpg'}}
        />
          <Text style={styles.title} numberOfLines={1}>
            {title}
          </Text>
          <Text style={styles.subTitle} numberOfLines={2}>
            {count}
          </Text>
          <View style={styles.rightAbsoluteView}>
            <Text style={styles.countText}>{countValue}</Text>
          </View>
        </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: 5,
    justifyContent: 'center',
    height: 100,
  },
  image: {
    width: "100%",
    height: "100%",
    position: 'absolute',
  },
  title: {
    fontWeight: "bold",
    color: colors.white,
    fontSize: 16,
    marginLeft: 20,
  },
  rightAbsoluteView: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    right: 20,
    paddingHorizontal: 15,
    borderRadius:15,
    paddingVertical: 7,
    backgroundColor: 'rgba(226, 226, 226, 1)',
  },
  countText: {
    color: colors.medium,
    fontSize: 13,
  },
});

export default CategoryCard;
