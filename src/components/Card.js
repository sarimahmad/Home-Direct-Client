import React from "react";
import { View, StyleSheet, TouchableWithoutFeedback, Image } from "react-native";

import Text from "./Text";
import colors from "../config/colors";

function Card({ title, category, imageUrl, onPress, thumbnailUrl }) {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={styles.card}>
        <Image
          style={styles.image}
          loadingIndicatorSource={{ uri: thumbnailUrl }}
          source={{uri: imageUrl}}
        />
        <View style={styles.detailsContainer}>
          <Text style={styles.title} numberOfLines={1}>
            {title}
          </Text>
          <Text style={styles.subTitle} numberOfLines={2}>
            {category}
          </Text>
          <View style={styles.timeWrapper}>
            <Image source={require('../assets/timer.png')} style={styles.Icon} />
            <Text style={styles.time}>
              4d
            </Text>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.white,
    marginBottom: 20,
    overflow: "hidden",
  },
  detailsContainer: {
    padding: 10,
  },
  image: {
    width: "100%",
    height: 100,
  },
  subTitle: {
    color: colors.medium,
    fontSize: 13,
  },
  title: {
    fontWeight: "bold",
    color: colors.dark,
    fontSize: 16,
  },
  timeWrapper: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    flexDirection: 'row',
  },
  Icon: {
    height: 10,
    width: 10,
    resizeMode: 'contain',
    marginRight: 5,
  },
  time: {
    color: colors.medium,
    fontSize: 13,
  },
});

export default Card;
