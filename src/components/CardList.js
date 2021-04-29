import React from "react";
import { View, StyleSheet, TouchableWithoutFeedback, Image, TouchableOpacity } from "react-native";
import { SimpleLineIcons } from "@expo/vector-icons";

import Text from "./Text";
import colors from "../config/colors";

function CardList({ title, category, imageUrl, onPress, thumbnailUrl, optionSelected }) {
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
        </View>
        <View style={styles.RightView}>
          <TouchableWithoutFeedback underlayColor={'white'} onPress={optionSelected}>
            <SimpleLineIcons name="options" size={20} color={'black'} />
          </TouchableWithoutFeedback>
          </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.white,
    marginBottom: 10,
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 10,
    alignItems: 'center',

  },
  detailsContainer: {
    padding: 10,
    flex: 0.8,
  },
  image: {
    width: 70,
    height: 40,
    resizeMode: 'contain',
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
  RightView: {
    flex: 0.2,
    justifyContent: 'center',
    alignItems: 'flex-end',
    marginRight: 10,
  },
});

export default CardList;
